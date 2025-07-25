"use client"
import { postCreateUserService } from "@/app/api/adminService";
import { useState } from "react"
import toast from "react-hot-toast";

type Props = {
    onSuccess: () => void;
};
export default function CreateUserForm({ onSuccess }: Props) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "USER",
        gender: "MALE",
    })
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await postCreateUserService(formData);
            toast.success("Tạo người dùng thành công");
            onSuccess();
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                role: "USER",
                gender: "MALE",
            })
        } catch (error) {
            console.log('✌️error --->', error);
            toast.error("Tạo người dùng thất bại")
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md p-4 border rounded-xl shadow-md">
            <h2 className="text-xl font-bold">Tạo người dùng mới</h2>
            <input
                type="text"
                name="firstName"
                placeholder="Họ"
                className="w-full border px-3 py-2 rounded"
                value={formData.firstName}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="lastName"
                placeholder="Tên"
                className="w-full border px-3 py-2 rounded"
                value={formData.lastName}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border px-3 py-2 rounded"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                className="w-full border px-3 py-2 rounded"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <select name="role" value={formData.role} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                <option value="USER">Người dùng</option>
                <option value="ADMIN">Quản trị viên</option>
            </select>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
                <option value="OTHER">Khác</option>
            </select>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Tạo người dùng
            </button>
        </form>
    );
}