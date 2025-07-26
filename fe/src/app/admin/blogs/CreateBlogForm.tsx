"use client"

import { postCreateBlogService } from "@/app/api/adminService";
import { Content } from "next/font/google";
import { useState } from "react";
import { set } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
    onSuccess: () => void
}
export default function CreateBlogForm({ onSuccess }: Props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [locationId, setLocationId] = useState<number>(1)
    const [summary, setSummary] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageFile) {
            alert("Vui lòng thêm ảnh");
            return
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("author", author);
        formData.append("locationId", locationId.toString());
        formData.append("summary", summary);
        formData.append("imageFile", imageFile);
        try {
            await postCreateBlogService(formData);
            toast.success("Tạo bài viết thành công");
            setTitle('');
            setContent('');
            setAuthor('');
            setLocationId(1);
            setSummary('');
            setImageFile(null);
            onSuccess();
        } catch (error) {
            console.log('✌️error --->', error);
            toast.error("Tạo bài viết thất bại");
        }
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-2xl mx-auto bg-white p-6 shadow-md rounded-xl"
        >
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Tiêu đề bài viết</label>
                <input
                    type="text"
                    placeholder="Tiêu đề bài viết"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
                    required
                />
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <input
                    type="text"
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
                    required
                />
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Tác giả</label>
                <textarea
                    placeholder="Tác giả"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
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
            </div>
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                    placeholder="Mô tả"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
                    rows={4}
                    required
                />
            </div>
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Hình ảnh bài viết</label>
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
                    Tạo bài viết
                </button>
            </div>
        </form>

    );
}