"use client";

import {
    deleteImagesHotel,
    deleteImagesRoom,
    getAllImagesHotel,
    getAllImagesRoom,
    getAllHotelNames,
    getAllRoomNames
} from "@/app/api/adminService";

import { useEffect, useState } from "react";
import { Modal, Select, Image } from "antd";
import toast from "react-hot-toast";
import { ImageItem, HotelOption, RoomOption } from '@/app/types/adminType';
import { Pagination } from "@/app/types/blogType";
import CreateImagesForm from "./CreateImagesForm";
import UpdateImagesForm from "./UpdateImagesForm";

const { Option } = Select;

export default function ImageManager() {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [filteredImages, setFilteredImages] = useState<ImageItem[]>([]);
    const [selectedHotelId, setSelectedHotelId] = useState<number | "all">("all");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState<Pagination>();
    const [activeTab, setActiveTab] = useState<'hotel' | 'room'>('hotel');

    const [hotelOptions, setHotelOptions] = useState<HotelOption[]>([]);
    const [roomOptions, setRoomOptions] = useState<RoomOption[]>([]);

    const fetchImages = async (filterId: number | null = null, pageParam: number = 1) => {
        try {
            let res;
            if (activeTab === 'hotel') {
                res = await getAllImagesHotel(filterId, pageParam);
            } else {
                res = await getAllImagesRoom(filterId, pageParam);
            }
            const imageData = res.data.data;
            setImages(imageData.hotelImages || imageData.roomImages || []);
            setFilteredImages(imageData.hotelImages || imageData.roomImages || []);
            setPagination(imageData.pagination);
        } catch (err) {
            console.error("Lỗi khi lấy ảnh", err);
            toast.error("Không thể lấy ảnh");
        }
    };

    const fetchOptions = async () => {
        try {
            if (activeTab === 'hotel') {
                const res = await getAllHotelNames();
                console.log('✌️res --->', res);
                setHotelOptions(res.data.data.hotelNames
                    || []);
            } else {
                const res = await getAllRoomNames();
                console.log('✌️res --->', res);
                setRoomOptions(res.data.data.roomName || []);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách filter:", error);
        }
    };

    useEffect(() => {
        fetchOptions();
    }, [activeTab]);

    const handleDelete = async (img: ImageItem) => {
        try {
            if (!img.id) return;

            if (activeTab === 'hotel') {
                await deleteImagesHotel(img.id);
            } else {
                await deleteImagesRoom(img.id);
            }

            toast.success("Xóa ảnh thành công!");
            fetchImages(selectedHotelId === "all" ? null : selectedHotelId);
        } catch (error) {
            console.error("Lỗi khi xóa ảnh:", error);
            toast.error("Xóa ảnh thất bại!");
        }
    };

    const handleFilterChange = (value: number | "all") => {
        setSelectedHotelId(value);
        fetchImages(value === "all" ? null : value);
    };

    const filterOptions: [number, string][] = activeTab === 'hotel'
        ? hotelOptions.map(h => [h.id, h.name] as [number, string])
        : roomOptions.map(r => [r.id, `${r.name} (${r.hotel.name})`] as [number, string]);

    useEffect(() => {
        fetchImages(selectedHotelId === "all" ? null : selectedHotelId, page);
    }, [activeTab, page, selectedHotelId]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Quản lý ảnh phụ</h2>

            <div className="mb-6 flex gap-6 border-b pb-2">
                <button
                    className={`font-semibold ${activeTab === 'hotel' ? 'border-b-2 border-[#7f5af0]' : ''}`}
                    onClick={() => {
                        setActiveTab('hotel');
                        setSelectedHotelId("all");
                        setPage(1);
                    }}
                >
                    Ảnh phụ khách sạn
                </button>
                <button
                    className={`font-semibold ${activeTab === 'room' ? 'border-b-2 border-[#7f5af0]' : ''}`}
                    onClick={() => {
                        setActiveTab('room');
                        setSelectedHotelId("all");
                        setPage(1);
                    }}
                >
                    Ảnh phụ phòng
                </button>
            </div>

            <div className="mb-4 flex justify-between items-center">
                <Select
                    style={{ width: 350 }}
                    value={selectedHotelId}
                    onChange={handleFilterChange}
                >
                    <Option value="all">Tất cả {activeTab === 'hotel' ? 'khách sạn' : 'phòng'}</Option>
                    {filterOptions.map(([id, label]) => (
                        <Option key={id} value={id}>{label}</Option>
                    ))}
                </Select>

                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-[#7f5af0] text-white px-4 py-2 rounded"
                >
                    Thêm ảnh mới
                </button>

                <CreateImagesForm
                    open={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    activeTab={activeTab}
                    filterOptions={filterOptions}
                    onSuccess={() => {
                        fetchImages(selectedHotelId === "all" ? null : selectedHotelId);
                    }}
                />
            </div>

            <table className="w-full border text-center">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 border">ID</th>
                        <th className="p-3 border">{activeTab === 'hotel' ? 'Tên khách sạn' : 'Tên phòng'}</th>
                        <th className="p-3 border">Ảnh</th>
                        <th className="p-3 border">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredImages.map((img) => (
                        <tr key={img.id}>
                            <td className="p-3 border">{img.id}</td>
                            <td className="p-3 border">{activeTab === 'hotel' ? img.hotel?.name : img.room?.name}</td>
                            <td className="p-3 border">
                                <Image
                                    src={img.imageUrl}
                                    width={100}
                                    fallback="/fallback.png"
                                    alt="image"
                                />
                            </td>
                            <td className="p-3 border space-x-2">
                                <button
                                    onClick={() => {
                                        setSelectedImage(img);
                                        setShowUpdateModal(true);
                                    }}
                                    className="bg-[#7f5af0] text-white px-3 py-1 rounded"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(img)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                    <UpdateImagesForm
                        open={showUpdateModal}
                        onClose={() => setShowUpdateModal(false)}
                        activeTab={activeTab}
                        filterOptions={filterOptions}
                        onSuccess={() => {
                            fetchImages(selectedHotelId === "all" ? null : selectedHotelId);
                        }}
                    />
                </tbody>
            </table>

            {pagination && (
                <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        className="px-4 py-2 bg-[#7f5af0] text-white rounded disabled:opacity-50"
                    >
                        Trang trước
                    </button>
                    <span>Trang {pagination.page} / {pagination.totalPages}</span>
                    <button
                        disabled={page === pagination.totalPages}
                        onClick={() => setPage((p) => Math.min(p + 1, pagination.totalPages))}
                        className="px-4 py-2 bg-[#7f5af0] text-white rounded disabled:opacity-50"
                    >
                        Trang sau
                    </button>
                </div>
            )}
        </div>
    );
}
