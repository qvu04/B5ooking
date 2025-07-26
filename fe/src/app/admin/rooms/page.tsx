"use client"
import { deleteRoomService, getAllRoomService } from "@/app/api/adminService";
import { RoomManager } from "@/app/types/adminType";
import { Pagination } from "@/app/types/blogType";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Modal } from 'antd';
import CreateRoomForm from '@/app/admin/rooms/CreateRoomForm';
import UpdateRoomForm from "./UpdateRoomForm";
import toast from "react-hot-toast";
export default function RoomsManager() {
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState<Pagination>()
    const [room, setRoom] = useState<RoomManager[]>([])
    const [hotelId, setHotelId] = useState<number | null>(null)
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [showFormUpdate, setShowFormUpdate] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<RoomManager | null>(null);
    const [roomName, setRoomName] = useState('');
    const [debouncedRoomName] = useDebounce(roomName, 500);
    const fetchAllRoom = async () => {
        try {
            const res = await getAllRoomService(page, hotelId ?? 0, debouncedRoomName);
            setPagination(res.data.data.pagination);
            setRoom(res.data.data.rooms);
            console.log('✌️res --->', res);
        } catch (error) {
            console.log('✌️error --->', error);
        }
    }
    const handleDeleteRoom = async (id: number) => {
        try {
            await deleteRoomService(id);
            toast.success("Xóa phòng thành công");
            fetchAllRoom();
        } catch (error) {
            console.log('✌️error --->', error);
            toast.error("Xóa phòng thất bại");
        }
    }
    const handleHotelClick = (locId: number) => {
        setHotelId(locId);
        setPage(1); // reset về trang đầu khi lọc
    };
    const handleResetFilter = () => {
        setHotelId(null);
        setPage(1);
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomName(e.target.value);
        setPage(1);
    }
    const toggleFormCreate = () => {
        setShowFormCreate(prev => !prev);
    }
    const toggleFormUpdate = () => {
        setShowFormUpdate(prev => !prev);
    }
    useEffect(() => {
        fetchAllRoom();
    }, [page, hotelId, debouncedRoomName])
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Quản lý phòng ở</h2>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm phòng ở..."
                    value={roomName}
                    onChange={handleSearchChange}
                    className="border border-gray-300 p-2 rounded mb-4 w-full max-w-sm"
                />
                <button onClick={toggleFormCreate} className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded">Tạo phòng ở</button>
            </div>
            <Modal
                title="Tạo phòng"
                open={showFormCreate}
                onCancel={() => setShowFormCreate(false)}
                footer={null}
            >
                <CreateRoomForm
                    onSuccess={() => {
                        setShowFormCreate(false);
                        fetchAllRoom();
                    }}
                />
            </Modal>

            {/* Lọc đang bật */}
            {hotelId !== null && (
                <div className="mb-4">
                    <span className="text-blue-600 font-semibold mr-2">Đang lọc theo khách sạn </span>
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
                        <th className="p-5 border">Tên phòng</th>
                        <th className="p-5 border">Giá</th>
                        <th className="p-5 border">Mô tả</th>
                        <th className="p-5 border">Loại phòng</th>
                        <th className="p-5 border">khách sạn</th>
                        <th className="p-5 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {room.map((room) => (
                        <tr key={room.id} className="hover:bg-gray-50">
                            <td className="p-10 border">
                                <img
                                    src={room.image}
                                    alt={room.name}
                                    className="w-48 h-28 object-cover rounded-md shadow"
                                />
                            </td>
                            <td className="p-5 border">{room.name}</td>
                            <td className="p-5 border">{room.price}</td>
                            <td className="p-5 border truncate max-w-[200px]">{room.description}</td>
                            <td className="p-5 border">{room.type}</td>
                            <td className="p-10 border">
                                <button
                                    className="text-blue-600 underline"
                                    onClick={() => handleHotelClick(room.hotel.id)}
                                >
                                    {room.hotel.name}
                                </button>
                            </td>
                            <td className="border p-2">
                                <div className="flex gap-5">
                                    <button onClick={() => {
                                        setSelectedRoom(room);
                                        toggleFormUpdate();
                                    }} className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded">
                                        Sửa
                                    </button>
                                    <button onClick={() => {
                                        handleDeleteRoom(room.id);
                                    }} className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded">
                                        Xóa
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {selectedRoom && (
                        <Modal
                            title="Cập nhật khách sạn"
                            open={showFormUpdate}
                            onCancel={() => setShowFormUpdate(false)}
                            footer={null}
                        >
                            <UpdateRoomForm
                                onSuccess={() => {
                                    setShowFormUpdate(false);
                                    fetchAllRoom();
                                }}
                                roomId={selectedRoom.id}
                                roomData={selectedRoom}
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
    )
}