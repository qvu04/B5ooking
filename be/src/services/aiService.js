import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

const SYSTEM_PROMPT = `
Bạn là trợ lý ảo chuyên về khách sạn, du lịch và đặt phòng.
- Trả lời thân thiện, tự nhiên.
- Luôn trả JSON duy nhất, KHÔNG có text ngoài JSON.
- Nếu người dùng chưa đăng nhập:
  - Vẫn được xem khách sạn, phòng, blog.
  - Nếu muốn đặt phòng hoặc hỏi về booking → báo cần đăng nhập.
- Nếu người dùng đã đăng nhập:
  - Có thể xem và đặt phòng, xem booking, blog, hoặc khách sạn yêu thích.

Trả đúng format JSON:
{
  "text": "<Câu trả lời tự nhiên>",
  "object": {
    "type": "hotel" | "room" | "booking" | "blog" | "favoriteHotel" | "general",
    "filters": {
      "city": string?,
      "hotelName": string?,
      "roomName": string?,
      "amenity": string | string[]?,
      "descriptionKeyword": string?,
      "checkAvailability": boolean?,
      "ratingStars": number?,
      "detail": boolean? // true nếu người dùng muốn xem chi tiết
    }
  }
}

Hướng dẫn nhận diện:
- “Tôi muốn xem khách sạn ở Đà Nẵng” → type = "hotel", filters.city = "Đà Nẵng"
- “Khách sạn Crab Bui Vien Homestay còn phòng trống không?” → type = "room", filters.hotelName = "Crab Bui Vien Homestay", filters.checkAvailability = true
- “Có những loại phòng nào ở Crab Bui Vien Homestay?” → type = "room", filters.hotelName = "Crab Bui Vien Homestay"
- “Chi tiết về Phòng Sang Trọng Giường Đôi Có Bồn Tắm ở Crab Bui Vien Homestay” → type = "room", filters.hotelName = "Crab Bui Vien Homestay", filters.roomName = "Phòng Sang Trọng Giường Đôi Có Bồn Tắm", filters.detail = true
- “Đặt phòng tại khách sạn ABC” → type = "booking"
- “Blog về du lịch Nha Trang” → type = "blog"
- “Khách sạn yêu thích của tôi” → type = "favoriteHotel"
- “Xin chào”, “Cảm ơn” → type = "general"
`;



export const aiService = {
    aiMessage: async function (userId, data) {
        const { ask } = data;
        const isLoggedIn = !!userId;

        const authStatus = isLoggedIn
            ? `Người dùng ${userId.fullName} (id: ${userId.id}) đã đăng nhập.`
            : "Người dùng chưa đăng nhập.";

        // 🔮 Gọi OpenRouter AI để phân tích câu hỏi
        const completion = await openai.chat.completions.create({
            model: "meta-llama/llama-3.1-8b-instruct",
            temperature: 0.3,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                {
                    role: "user",
                    content: `${authStatus} Phân tích câu hỏi và trả về JSON đúng format: "${ask}"`,
                },
            ],
        });


        let responseData;
        try {
            responseData = JSON.parse(completion.choices[0].message.content.trim());
        } catch (err) {
            console.error("Lỗi parse JSON:", err);
            responseData = {
                text: "Xin lỗi, tôi chưa hiểu rõ câu hỏi của bạn.",
                object: { type: "general", filters: {} },
            };
        }

        const { object } = responseData;
        const filters = object?.filters || {};
        const type = object?.type || "general";
        let dataResult = null;



        if (type === "hotel") {
            const { city, hotelName, amenity, descriptionKeyword, ratingStars } = filters;
            const where = {};

            if (city) where.location = { city: { contains: city } };
            if (hotelName) where.name = { contains: hotelName.replace(/^khách sạn\s*/i, "") };
            if (descriptionKeyword) where.description = { contains: descriptionKeyword };
            if (amenity)
                where.amenities = {
                    some: { amenity: { name: { in: Array.isArray(amenity) ? amenity : [amenity] } } },
                };
            if (ratingStars) where.averageRating = { gte: ratingStars };

            dataResult = await prisma.hotel.findMany({
                where,
                include: { location: { select: { city: true } } },
            });
        }

        else if (type === "room") {
            const { hotelName, roomName, checkAvailability, city } = filters;
            const where = {};

            // Nếu user muốn chi tiết một phòng cụ thể (roomName)
            if (roomName) {
                // Tìm theo tên phòng hoặc theo loại phòng (type)
                where.OR = [
                    { name: { contains: roomName.trim() } },
                    { type: { contains: roomName.trim() } }
                ];
            }

            // Lọc theo khách sạn (nếu có)
            if (hotelName) {
                where.hotel = {
                    name: { contains: hotelName.replace(/^khách sạn\s*/i, "") },
                };
            }

            // Lọc theo thành phố (nếu có)
            if (city) {
                where.hotel = {
                    ...where.hotel,
                    location: { city: { contains: city } },
                };
            }

            const rooms = await prisma.room.findMany({
                where,
                include: {
                    bookings: true,
                    hotel: {
                        include: { location: true },
                    },
                },
            });

            // Nếu cần kiểm tra phòng trống theo thời điểm hiện tại
            let availableRooms = rooms;
            if (checkAvailability) {
                const now = new Date();
                availableRooms = rooms.filter(r =>
                    !r.bookings.some(b => new Date(b.startDate) <= now && new Date(b.endDate) >= now)
                );
            }

            dataResult = availableRooms;

            if (!isLoggedIn && checkAvailability) {
                responseData.text += " (Bạn cần đăng nhập để đặt phòng)";
            }
        }



        else if (type === "booking") {
            if (!isLoggedIn) {
                responseData.text = "Bạn cần đăng nhập để xem hoặc đặt phòng.";
                dataResult = [];
            } else {
                const { satusFilter, paymentStatus } = object.filters || {}
                const where = { userId: userId.id }
                if (satusFilter) where.satusFilter = satusFilter
                if (paymentStatus) where.paymentStatus = paymentStatus

                const bookings = await prisma.booking.findMany({
                    where,
                    include: {
                        room: {
                            include: {
                                hotel: true
                            }
                        }
                    },
                    Voucher: true,
                    user: true
                })
                const totalAmount = bookings.reduce((sum, b) => (sum + b.totalPrice), 0)
                dataResult = {
                    bookings: bookings,
                    totalAmount: totalAmount
                }

                if (satusFilter === "FINISHED") {
                    responseData.text = bookings.length
                        ? `Bạn đã hoàn thành ${bookings.length} đơn đặt phòng, tổng cộng ${totalAmount.toLocaleString()} VND.`
                        : "Bạn chưa có đơn đặt phòng nào hoàn thành"
                } else if (paymentStatus === "PAID") {
                    responseData.text = bookings.length
                        ? `Bạn có ${bookings.length} đơn đặt phòng đã thanh toán, tổng cộng ${totalAmount.toLocaleString()} VND.`
                        : "Bạn chưa có đơn đặt phòng nào đã thanh toán.";
                } else {
                    responseData.text = `Bạn có ${bookings.length} đơn đặt phòng, tổng cộng ${totalAmount.toLocaleString()} VND.`;
                }

            }

        }

        else if (type === "favoriteHotel") {
            if (!isLoggedIn) {
                responseData.text = "Vui lòng đăng nhập để xem danh hoặc đặt phòng.";
                dataResult = [];
            } else {
                dataResult = await prisma.favoriteHotel.findMany({
                    where: { userId: userId.id },
                    include: { hotel: true },
                });
            }
        }

        else if (type === "blog") {
            const { descriptionKeyword } = filters;
            const where = descriptionKeyword
                ? { title: { contains: descriptionKeyword } }
                : {};
            dataResult = await prisma.blogPost.findMany({ where });
        }

        else {
            responseData.text = responseData.text || "Xin chào! Tôi có thể giúp gì cho bạn?";
            dataResult = [];
        }


        return {
            data: {
                text: responseData.text,
                object: responseData.object,
                data: dataResult,
            },

        };
    },
};

export default aiService;
