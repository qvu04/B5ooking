"use client"
import { getAllHotelService, deleteHotelService } from '@/app/api/adminService';
import { HotelManager } from "@/app/types/adminType";
import { Pagination } from "@/app/types/blogType";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Modal } from 'antd';
import CreateHotelForm from "./CreateHotelForm";
import UpdateHotelForm from './UpdateHotelForm';
import toast from "react-hot-toast";
export default function HotelsManger() {
    const [page, setPage] = useState(1);
    const [locationId, setLocationId] = useState<number | null>(null)
    const [hotel, setHotel] = useState<HotelManager[]>([]);
    const [pagination, setPagination] = useState<Pagination>()
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [showFormUpdate, setShowFormUpdate] = useState(false);
    const [hotelName, setHotelName] = useState('');
    const [selectedHotel, setSelectedHotel] = useState<HotelManager | null>(null);
    const [debouncedHotelName] = useDebounce(hotelName, 500);
    const fetchAllHotel = async () => {
        try {
            const res = await getAllHotelService(page, locationId ?? 0, debouncedHotelName)
            setHotel(res.data.data.hotels);
            setPagination(res.data.data.pagination)
            console.log('✌️res --->', res);
        } catch (error) {
            console.log('✌️error --->', error);
        }
    }
    const handleDeleteHotel = async (id: number) => {
        try {
            await deleteHotelService(id);
            toast.success("Xóa khách sạn thành công")
            fetchAllHotel()
        } catch (error) {
            console.log('✌️error --->', error);
            toast.error("Xóa khách sạn thất bại");
        }
    }
    useEffect(() => {
        fetchAllHotel()
    }, [page, locationId, debouncedHotelName])
    const handleCityClick = (locId: number) => {
        setLocationId(locId);
        setPage(1); // reset về trang đầu khi lọc
    };

    const handleResetFilter = () => {
        setLocationId(null);
        setPage(1);
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHotelName(e.target.value);
        setPage(1);
    }
    const toggleFormCreate = () => {
        setShowFormCreate(prev => !prev);
    };
    const toggleFormUpdate = () => {
        setShowFormUpdate(prev => !prev);
    };
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Quản lý khách sạn</h2>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm khách sạn..."
                    value={hotelName}
                    onChange={handleSearchChange}
                    className="border border-gray-300 p-2 rounded mb-4 w-full max-w-sm"
                />
                <button onClick={toggleFormCreate} className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded">Tạo khách sạn mới</button>
            </div>
            <Modal
                title="Tạo khách sạn"
                open={showFormCreate}
                onCancel={() => setShowFormCreate(false)}
                footer={null}
            >
                <CreateHotelForm
                    onSuccess={() => {
                        setShowFormCreate(false);
                        fetchAllHotel();
                    }}
                />
            </Modal>

            {/* Lọc đang bật */}
            {locationId !== null && (
                <div className="mb-4">
                    <span className="text-blue-600 font-semibold mr-2">Đang lọc theo khu vực </span>
                    <button
                        className="text-red-600 underline"
                        onClick={handleResetFilter}
                    >
                        Bỏ lọc
                    </button>
                </div>
            )}

            {/* Table danh sách khách sạn */}
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100 text-center">
                        <th className="p-5 border">Ảnh</th>
                        <th className="p-5 border">Tên khách sạn</th>
                        <th className="p-5 border">Địa chỉ</th>
                        <th className="p-5 border">Mô tả</th>
                        <th className="p-5 border">Khu vực</th>
                        <th className="p-5 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {hotel.map((hotel) => (
                        <tr key={hotel.id} className="hover:bg-gray-50">
                            <td className="p-10 border">
                                <img
                                    src={hotel.image}
                                    alt={hotel.name}
                                    className="w-48 h-28 object-cover rounded-md shadow"
                                />
                            </td>
                            <td className="p-5 border">{hotel.name}</td>
                            <td className="p-5 border">{hotel.address}</td>
                            <td className="p-5 border truncate max-w-[200px]">{hotel.description}</td>
                            <td className="p-10 border">
                                <button
                                    className="text-blue-600 underline"
                                    onClick={() => handleCityClick(hotel.location.id)}
                                >
                                    {hotel.location.city}
                                </button>
                            </td>
                            <td className="border p-2">
                                <div className="flex gap-5">
                                    <button onClick={() => {
                                        setSelectedHotel(hotel); // gán khách sạn đang click vào
                                        toggleFormUpdate();
                                    }} className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded">
                                        Sửa
                                    </button>
                                    <button onClick={() => {
                                        handleDeleteHotel(hotel.id)
                                    }} className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded">
                                        Xóa
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {selectedHotel && (
                        <Modal
                            title="Cập nhật khách sạn"
                            open={showFormUpdate}
                            onCancel={() => setShowFormUpdate(false)}
                            footer={null}
                        >
                            <UpdateHotelForm
                                onSuccess={() => {
                                    setShowFormUpdate(false);
                                    fetchAllHotel();
                                }}
                                hotelId={selectedHotel.id}
                                hotelData={selectedHotel}
                            />
                        </Modal>
                    )}

                </tbody>
            </table>

            {/* Pagination */}
            {pagination && (
                <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        className="px-4 py-2 bg-[#7f5af0] text-[#fffffe] rounded disabled:opacity-50"
                    >
                        Trang trước
                    </button>
                    <span>
                        Trang {pagination.page} / {pagination.totalPages}
                    </span>
                    <button
                        disabled={page === pagination.totalPages}
                        onClick={() => setPage((p) => Math.min(p + 1, pagination.totalPages))}
                        className="px-4 py-2 bg-[#7f5af0] text-[#fffffe] rounded disabled:opacity-50"
                    >
                        Trang sau
                    </button>
                </div>
            )}
        </div>
    );
}