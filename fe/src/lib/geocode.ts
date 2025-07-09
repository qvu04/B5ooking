/**
 * Chuẩn hóa Unicode địa chỉ, để đảm bảo Nominatim hiểu đúng ký tự tiếng Việt
 */
function normalizeAddress(address: string): string {
    return address.normalize('NFC').trim();
}

/**
 * Lấy toạ độ từ địa chỉ bằng OpenStreetMap Nominatim API
 */
export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
    const normalized = normalizeAddress(address);

    try {
        console.log('🔍 Đang geocode địa chỉ:', normalized);

        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(normalized)}`,
            {
                headers: {
                    'Accept-Language': 'vi',
                    'User-Agent': 'hotel-booking-client',
                },
            }
        );

        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
            const result = {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
            };
            console.log('✅ Geocode thành công:', result);
            return result;
        } else {
            console.warn('⚠️ Không tìm được kết quả geocode cho:', normalized);
        }
    } catch (error) {
        console.error('❌ Lỗi khi gọi geocode API:', error);
    }

    // 👉 Fallback: tọa độ trung tâm TP.HCM
    const fallback = {
        lat: 10.7769,
        lng: 106.7009,
    };

    console.log('📍 Dùng fallback tọa độ:', fallback);
    return fallback;
}
