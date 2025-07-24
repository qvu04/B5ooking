"use client"
import { getAllUserService } from "@/app/api/adminService"
import { Pagination } from "@/app/types/blogType"
import { useEffect, useState } from "react"
import { UserManger } from '@/app/types/adminType';

export default function UsersManager() {
    const [pagination, setPagination] = useState<Pagination>()
    const [page, setPage] = useState(1)
    const [fullName, setFullName] = useState("");
    const [user, setUser] = useState<UserManger[]>([]);
    const fetchAllUser = async () => {
        try {
            const res = await getAllUserService(page, fullName);
            setUser(res.data.data.users)
            setPagination(res.data.data.pagination)
            console.log('✌️res --->', res);
        } catch (error) {
            console.log('✌️error --->', error);
        }
    }
    useEffect(() => {
        fetchAllUser();
    }, [page, fullName])
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(e.target.value);
        setPage(1);
    }
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Quản lý người dùng</h2>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm người dùng..."
                    value={fullName}
                    onChange={handleSearchChange}
                    className="border border-gray-300 p-2 rounded mb-4 w-full max-w-sm"
                />
                <button className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded">Thêm người dùng</button>
            </div>
            <table className="w-full border border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">#</th>
                        <th className="border p-2">Họ tên</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">SĐT</th>
                        <th className="border p-2">Giới tính</th>
                        <th className="border p-2">Vai trò</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((user, index) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="border p-2">{(page - 1) * 10 + index + 1}</td>
                            <td className="border p-2">{user.fullName}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">{user.phone}</td>
                            <td className="border p-2">{user.gender}</td>
                            <td className="border p-2">{user.role}</td>
                            <td className="border p-2 flex items-center justify-center">
                                <div className="flex gap-5">
                                    <button className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded">
                                        Sửa
                                    </button>
                                    <button className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded">
                                        Xóa
                                    </button>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            {pagination && (
                <div className="flex justify-center items-center gap-4 mt-10">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-[#7f5af0] text-[#fffffe] rounded disabled:opacity-50"
                    >
                        Trang trước
                    </button>
                    <span>
                        Trang {pagination.page} / {pagination.totalPages}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, pagination.totalPages))}
                        disabled={page === pagination.totalPages}
                        className="px-4 py-2 bg-[#7f5af0] text-[#fffffe] rounded disabled:opacity-50"
                    >
                        Trang sau
                    </button>
                </div>
            )}
        </div>
    );
}