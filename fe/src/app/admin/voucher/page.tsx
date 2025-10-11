"use client";

import { useEffect, useState } from "react";
import { Modal, Input } from "antd";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";

import { getAllVoucher, getAllUserUseVoucher } from "@/app/api/adminService";
import { Voucher } from "@/app/types/voucherType";
import { Pagination } from "@/app/types/blogType";

import CreateVoucherForm from "./CreateVoucherForm";
import UpdateVoucherForm from "./UpdateVoucherForm";

export default function VoucherManager() {
    const [activeTab, setActiveTab] = useState<'voucher' | 'user'>('voucher');
    const [page, setPage] = useState(1);

    // Voucher tab
    const [voucher, setVoucher] = useState<Voucher[]>([]);
    const [voucherSearch, setVoucherSearch] = useState("");
    const [deboundedVoucher] = useDebounce(voucherSearch, 500);
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [showFormUpdate, setShowFormUpdate] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

    // User tab
    const [userVoucher, setUserVoucher] = useState<any[]>([]);

    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        totalPages: 1,
        limit: 5, // số item mặc định
    });

    // -------------------- Fetch API --------------------
    const fetchAllVoucher = async () => {
        try {
            const res = await getAllVoucher(page, deboundedVoucher);
            setVoucher(res.data.data.vouchers);
            setPagination(res.data.data.pagination);
        } catch (error) {
            console.log(error);
            toast.error("Lấy danh sách voucher thất bại");
        }
    };

    const fetchAllVoucherUserUse = async (pageParam: number = 1) => {
        try {
            const res = await getAllUserUseVoucher(pageParam);
            setUserVoucher(res.data.data.userVoucher);
            setPagination(res.data.data.pagination);
        } catch (error) {
            console.log(error);
            toast.error("Lấy danh sách người dùng voucher thất bại");
        }
    };

    // -------------------- Effects --------------------
    useEffect(() => {
        if (activeTab === 'voucher') {
            fetchAllVoucher();
        } else {
            fetchAllVoucherUserUse(page);
        }
    }, [activeTab, page, deboundedVoucher]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVoucherSearch(e.target.value.trim());
        setPage(1);
    };

    const toggleFormCreate = () => setShowFormCreate(prev => !prev);
    const toggleFormUpdate = () => setShowFormUpdate(prev => !prev);

    // -------------------- Render --------------------
    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Quản lý Voucher</h2>

            {/* Tabs */}
            <div className="mb-6 flex gap-6 border-b pb-2">
                <button
                    className={`font-semibold ${activeTab === 'voucher' ? 'border-b-2 border-[#7f5af0]' : ''}`}
                    onClick={() => { setActiveTab('voucher'); setPage(1); }}
                >
                    Quản lý Voucher
                </button>
                <button
                    className={`font-semibold ${activeTab === 'user' ? 'border-b-2 border-[#7f5af0]' : ''}`}
                    onClick={() => { setActiveTab('user'); setPage(1); }}
                >
                    Người dùng đã sử dụng voucher
                </button>
            </div>

            {/* Voucher Tab */}
            {activeTab === 'voucher' && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <Input
                            placeholder="Tìm kiếm vouchers..."
                            value={voucherSearch}
                            onChange={handleSearchChange}
                            className="max-w-sm"
                        />
                        <button
                            onClick={toggleFormCreate}
                            className="bg-[#7f5af0] text-white px-4 py-2 rounded"
                        >
                            Tạo voucher mới
                        </button>
                    </div>

                    {/* Table voucher */}
                    <table className="w-full border border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">#</th>
                                <th className="border p-2">Code</th>
                                <th className="border p-2">Giảm giá (%)</th>
                                <th className="border p-2">Số lần người dùng</th>
                                <th className="border p-2">Số lần hệ thống cấp</th>
                                <th className="border p-2">Ngày hết hạn</th>
                                <th className="border p-2">Hiệu lực</th>
                                <th className="border p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {voucher.map((v, idx) => (
                                <tr key={v.id} className="hover:bg-gray-50">
                                    <td className="border p-2">
                                        {(page - 1) * (pagination?.limit ?? 5) + idx + 1}
                                    </td>
                                    <td className="border p-2">{v.code}</td>
                                    <td className="border p-2">{v.discount}</td>
                                    <td className="border p-2">{v.perUserLimit}</td>
                                    <td className="border p-2">{v.usageLimit}</td>
                                    <td className="border p-2">{new Date(v.expiresAt).toLocaleDateString("vi-VN")}</td>
                                    <td className="border p-2">
                                        {v.isActive
                                            ? <span className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full">Còn hiệu lực</span>
                                            : <span className="text-red-600 font-semibold bg-red-100 px-3 py-1 rounded-full">Hết hiệu lực</span>
                                        }
                                    </td>
                                    <td className="border p-2">
                                        <button
                                            className="bg-[#7f5af0] text-white px-3 py-1 rounded"
                                            onClick={() => { setSelectedVoucher(v); toggleFormUpdate(); }}
                                        >
                                            Sửa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Modal create/update */}
                    <Modal
                        title="Tạo voucher mới"
                        open={showFormCreate}
                        onCancel={() => setShowFormCreate(false)}
                        footer={null}
                    >
                        <CreateVoucherForm
                            onSuccess={() => { setShowFormCreate(false); fetchAllVoucher(); }}
                        />
                    </Modal>

                    <Modal
                        title="Cập nhật voucher"
                        open={showFormUpdate}
                        onCancel={() => setShowFormUpdate(false)}
                        footer={null}
                    >
                        {selectedVoucher && (
                            <UpdateVoucherForm
                                voucher={selectedVoucher}
                                onSuccess={() => { setShowFormUpdate(false); fetchAllVoucher(); }}
                            />
                        )}
                    </Modal>
                </div>
            )}

            {/* User tab */}
            {activeTab === 'user' && (
                <table className="w-full border border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">#</th>
                            <th className="border p-2">Tên người dùng</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Role</th>
                            <th className="border p-2">Voucher đã dùng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userVoucher.map((user, idx) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="border p-2">
                                    {(page - 1) * (pagination?.limit ?? 5) + idx + 1}
                                </td>
                                <td className="border p-2">{user.fullName}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">{user.role}</td>
                                <td className="border p-2">
                                    {user.bookings.map((b: any) => (
                                        <div key={b.Voucher.id}>
                                            {b.Voucher.code} ({b.Voucher.discount}%)
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Pagination */}
            {pagination && (
                <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => Math.max(p - 1, 1))}
                        className="px-4 py-2 bg-[#7f5af0] text-white rounded disabled:opacity-50"
                    >
                        Trang trước
                    </button>
                    <span>Trang {pagination.page} / {pagination.totalPages}</span>
                    <button
                        disabled={page === pagination.totalPages}
                        onClick={() => setPage(p => Math.min(p + 1, pagination.totalPages))}
                        className="px-4 py-2 bg-[#7f5af0] text-white rounded disabled:opacity-50"
                    >
                        Trang sau
                    </button>
                </div>
            )}
        </div>
    );
}
