"use client"
import { postCreateRoomService } from "@/app/api/adminService";
import React, { useState } from "react"
import toast from "react-hot-toast";
type Props = {
    onSuccess: () => void
}
export default function CreateRoomForm({ onSuccess }: Props) {
    const [name, setName] = useState('');
    const [hotelId, setHotelId] = useState<number>(1);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState<number>(0);
    const [maxGuests, setMaxGuests] = useState<number>(0);
    const [selectedAmenity, setSelectedAmenity] = useState<number[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const allAmenities = [
        { id: 1, name: "Wifi miễn phí" },
        { id: 2, name: "Máy lạnh" },
        { id: 3, name: "TV màn hình phẳng" },
        { id: 4, name: "Hồ bơi" },
        { id: 5, name: "Lò nướng BBQ" },
        { id: 6, name: "Bàn đánh bóng chuyền" },
        { id: 7, name: "Dán sóng karaoke" },
    ];
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageFile) {
            alert("Vui lòng thêm ảnh");
            return
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("hotelId", hotelId.toString());
        formData.append("type", type);
        formData.append("description", description);
        formData.append("price", price.toString());
        formData.append("discount", discount.toString());
        formData.append("maxGuests", maxGuests.toString());
        selectedAmenity.forEach(id => {
            formData.append("amenities", id.toString());
        });
        formData.append('imageFile', imageFile);
        try {
            await postCreateRoomService(formData);
            toast.success("Tạo phòng thành công");
            setName('');
            setHotelId(1);
            setType('');
            setDescription('');
            setPrice(0);
            setDiscount(0);
            setMaxGuests(1);
            setSelectedAmenity([]);
            setImageFile(null);
            onSuccess();
        } catch (error) {
            console.log('✌️error --->', error);
            toast.error("Tạo phòng thất bại");
        }

    }
    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-2xl mx-auto bg-white p-6 shadow-md rounded-xl"
        >
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Tên phòng</label>
                <input
                    type="text"
                    placeholder="Tên phòng"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
                    required
                />
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Loại phòng</label>
                <input
                    type="text"
                    placeholder="Loại phòng"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
                    required
                />
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                    placeholder="Mô tả"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
                    rows={4}
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">hotelId</label>
                    <input
                        type="number"
                        placeholder="hotelId"
                        value={hotelId}
                        onChange={(e) => setHotelId(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Giá phòng</label>
                    <input
                        type="number"
                        placeholder="Giá phòng"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
                    />
                </div>
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Giảm giá</label>
                    <input
                        type="number"
                        placeholder="Discount"
                        value={discount}
                        onChange={(e) => setDiscount(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
                    />
                </div>
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Số lượng khách tối đa</label>
                    <input
                        type="number"
                        placeholder="Khách tối đa"
                        value={maxGuests}
                        onChange={(e) => setMaxGuests(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Tiện nghi</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {allAmenities.map((amenity) => (
                        <div key={amenity.id} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="amenity"
                                value={amenity.id}
                                checked={selectedAmenity.includes(amenity.id)}
                                onChange={() => {
                                    if (selectedAmenity.includes(amenity.id)) {
                                        setSelectedAmenity(
                                            selectedAmenity.filter(id => id !== amenity.id)
                                        );
                                    } else {
                                        setSelectedAmenity([...selectedAmenity, amenity.id]);
                                    }
                                }}
                                id={`amenity-${amenity.id}`}
                                className="accent-[#7f5af0]"
                            />
                            <label htmlFor={`amenity-${amenity.id}`} className="text-sm text-gray-700">
                                {amenity.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Hình ảnh khách sạn</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setImageFile(e.target.files[0]);
                        }
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                    required
                />
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    className="bg-[#7f5af0] hover:bg-[#684de0] text-white font-semibold px-6 py-2 rounded-lg transition duration-200 w-full"
                >
                    Tạo phòng
                </button>
            </div>
        </form>

    );
}