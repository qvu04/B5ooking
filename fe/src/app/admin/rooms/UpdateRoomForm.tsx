"use client"

import { RoomDetailManager } from "@/app/types/adminType"
import { useState, useRef, useEffect } from 'react';
import { AmenityType } from '@/app/types/amenityType';
import { getAllAmenitiesService, putUpdateRoomService } from "@/app/api/adminService";
import toast from "react-hot-toast";

type Props = {
    roomData: RoomDetailManager;
    roomId: number;
    onSuccess: () => void
}
export default function UpdateRoomForm({ roomData, roomId, onSuccess }: Props) {
    const [name, setName] = useState('');
    const [hotelId, setHotelId] = useState<number>(1);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState<number>(0);
    const [maxGuests, setMaxGuests] = useState<number>(0);
    const [selectedAmenity, setSelectedAmenity] = useState<number[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [allAmenities, setAllAmenities] = useState<AmenityType[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const fetchAmenities = async () => {
            try {
                const res = await getAllAmenitiesService();
                setAllAmenities(res.data.data.amenities);
            } catch (error) {
                console.log('✌️error --->', error);
            }
        }
        fetchAmenities();
    }, [])
    useEffect(() => {
        if (roomData) {
            setName(roomData.name || '');
            setType(roomData.type || '');
            setDescription(roomData.description || '');
            setPrice(roomData.price || 0);
            setDiscount(roomData.discount || 0);
            setMaxGuests(roomData.maxGuests || 0);
            setSelectedAmenity(roomData.amenities?.map(a => a.amenityId) || []);
            setHotelId(roomData.hotelId || 3);
        }
    }, [roomData]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
        if (imageFile) {
            formData.append("imageFile", imageFile);
        }
        try {
            await putUpdateRoomService(roomId, formData);
            toast.success("Cập nhật phòng thành công");
            onSuccess();
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            setImageFile(null);
        } catch (error) {
            console.log('✌️error --->', error);
            toast.error("Cập nhật phòng thất bại")
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
                    placeholder="Địa chỉ"
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
                        value={hotelId}
                        onChange={(e) => setHotelId(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Giá phòng</label>
                    <input
                        type="number"
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
                <label className="block text-sm font-medium text-gray-700">Hình ảnh của phòng</label>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setImageFile(e.target.files[0]);
                        }
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                />
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    className="bg-[#7f5af0] hover:bg-[#684de0] text-white font-semibold px-6 py-2 rounded-lg transition duration-200 w-full"
                >
                    Cập nhật phòng
                </button>
            </div>
        </form>

    );
}