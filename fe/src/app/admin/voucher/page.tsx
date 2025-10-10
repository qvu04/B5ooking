"use client"

import { getAllVoucher } from "@/app/api/adminService";
import { Pagination } from "@/app/types/blogType";
import { Voucher } from "@/app/types/voucherType";
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce";
import { Modal } from 'antd';
import CreateVoucherForm from "./CreateVoucherForm";
import UpdateVoucherForm from '@/app/admin/voucher/UpdateVoucherForm';

export default function VoucherManager() {
    const [page, setPage] = useState(1);
    const [voucher, setVoucher] = useState<Voucher[]>([]);
    const [voucherSearch, setVoucherSearch] = useState("")
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [showFormUpdate, setShowFormUpdate] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
    const [deboundedVoucher] = useDebounce(voucherSearch, 500);
    const [pagination, setPagination] = useState<Pagination>();
    const fetchAllVoucher = async () => {
        try {
            const res = await getAllVoucher(page, deboundedVoucher);
            setVoucher(res.data.data.vouchers);
            setPagination(res.data.data.pagination);
            console.log("res: ", res);
        } catch (error) {
            console.log('✌️error --->', error);
        }
    }
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setVoucherSearch(value.trim());
        setPage(1);
    }
    const toggleFormCreate = () => {
        setShowFormCreate(prev => !prev);
    };
    const toggleFormUpdate = () => {
        setShowFormUpdate(prev => !prev);
    }
    useEffect(() => {
        fetchAllVoucher()
    }, [page, deboundedVoucher]);
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Quản lý Vouchers</h2>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm vouchers..."
                    value={voucherSearch}
                    onChange={handleSearchChange}
                    className="border border-gray-300 p-2 rounded mb-4 w-full max-w-sm"
                />
                <button
                    onClick={toggleFormCreate}
                    className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded"
                >
                    Tạo voucher mới
                </button>
                <Modal
                    title="Tạo voucher mới"
                    open={showFormCreate}
                    onCancel={() => setShowFormCreate(false)}
                    footer={null}
                >
                    <CreateVoucherForm
                        onSuccess={() => {
                            setShowFormCreate(false);
                            fetchAllVoucher();
                        }}
                    />
                </Modal>
            </div>
            <table className="w-full border border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">#</th>
                        <th className="border p-2">Code</th>
                        <th className="border p-2">Giảm giá (%)</th>
                        <th className="border p-2">Số lần người dùng sử dụng</th>
                        <th className="border p-2">Số lần hệ thống cấp</th>
                        <th className="border p-2">Ngày hết hạn</th>
                        <th className="border p-2">Hiệu lực</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {voucher.map((voucher, index) => (
                        <tr key={voucher.id} className="hover:bg-gray-50">
                            <td className="border p-2">{(page - 1) * 10 + index + 1}</td>
                            <td className="border p-2">{voucher.code}</td>
                            <td className="border p-2">{voucher.discount}</td>
                            <td className="border p-2">{voucher.perUserLimit}</td>
                            <td className="border p-2">{voucher.usageLimit}</td>
                            <td className="border p-2">{new Date(voucher.expiresAt).toLocaleDateString("vi-VN", {
                                timeZone: "Asia/Ho_Chi_Minh",
                            })}</td>
                            <td className="border p-2 text-center">
                                {voucher.isActive ? (
                                    <span className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full">
                                        Còn hiệu lực
                                    </span>
                                ) : (
                                    <span className="text-red-600 font-semibold bg-red-100 px-3 py-1 rounded-full">
                                        Hết hiệu lực
                                    </span>
                                )}
                            </td>
                            <td className="border p-2 text-center">
                                <button
                                    onClick={() => {
                                        setSelectedVoucher(voucher);
                                        toggleFormUpdate();
                                    }}
                                    className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded"
                                >
                                    Sửa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <Modal
                    title="Cập nhật voucher"
                    open={showFormUpdate}
                    onCancel={() => setShowFormUpdate(false)}
                    footer={null}
                >
                    {selectedVoucher && (
                        <UpdateVoucherForm
                            voucher={selectedVoucher}
                            onSuccess={() => {
                                setShowFormUpdate(false);
                                fetchAllVoucher();
                            }}
                        />
                    )}
                </Modal>
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
    )
}