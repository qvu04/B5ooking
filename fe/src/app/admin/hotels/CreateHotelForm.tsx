"use client"
import { postCreateHotelService } from "@/app/api/adminService";
import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {
    onSuccess: () => void;
};
export default function CreateHotelForm({ onSuccess }: Props) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [locationId, setLocationId] = useState<number>(1)
    const [defaultRating, setDefaultRating] = useState<number>(3);
    const [selectedAmenity, setSelectedAmenity] = useState<number[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null)
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
            alert("Vui lòng chọn ảnh!");
            return
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('description', description);
        formData.append('locationId', locationId.toString());
        formData.append('defaultRating', defaultRating.toString());
        selectedAmenity.forEach(id => {
            formData.append("amenities", id.toString());
        });
        formData.append('imageFile', imageFile);

        try {
            await postCreateHotelService(formData);
            toast.success("Tạo khách sạn thành công");
            setName('');
            setAddress('');
            setDescription('');
            setLocationId(1);
            setDefaultRating(3);
            setSelectedAmenity([]);
            setImageFile(null);
            onSuccess();
        } catch (error) {
            console.log('✌️error --->', error);
            toast.error("Tạo khách sạn thất bại");
        }

    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-2xl mx-auto bg-white p-6 shadow-md rounded-xl"
        >
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Tên khách sạn</label>
                <input
                    type="text"
                    placeholder="Tên khách sạn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
                    required
                />
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                <input
                    type="text"
                    placeholder="Địa chỉ"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                    <label className="block text-sm font-medium text-gray-700">Khu vực (locationId)</label>
                    <input
                        type="number"
                        placeholder="Khu vực"
                        value={locationId}
                        onChange={(e) => setLocationId(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Rating mặc định</label>
                    <input
                        type="number"
                        placeholder="Rating mặc định"
                        value={defaultRating}
                        onChange={(e) => setDefaultRating(Number(e.target.value))}
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
                    Tạo khách sạn
                </button>
            </div>
        </form>

    );
}