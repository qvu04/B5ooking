"use client"
import { putUpdateBlogService } from '@/app/api/adminService';
import { BlogDetailManager } from '@/app/types/adminType';
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
type Props = {
    onSuccess: () => void;
    blogId: number;
    blogData: BlogDetailManager;
}
export default function UpdateBlogForm({ onSuccess, blogId, blogData }: Props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [locationId, setLocationId] = useState<number>(1)
    const [summary, setSummary] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        console.log("blogData: ", blogData);
        if (blogData) {
            setTitle(blogData.title || '');
            setContent(blogData.content || '');
            setAuthor(blogData.author || '');
            setLocationId(blogData.location?.id || 1);
            setSummary(blogData.summary || '');
        }
    }, [blogData]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("author", author);
        formData.append("locationId", locationId.toString());
        formData.append("summary", summary);
        if (imageFile) {
            formData.append("imageFile", imageFile);
        }
        try {
            await putUpdateBlogService(blogId, formData);
            toast.success("Cập nhật bài viết thành công");
            onSuccess();
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            setImageFile(null);
        } catch (error) {
            console.log('✌️error --->', error);
            toast.error("Cập nhật bài viết thất bại");
        }
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-2xl mx-auto bg-white p-6 shadow-md rounded-xl"
        >
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                <input
                    type="text"
                    placeholder="Tiêu đề"
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
                <label className="block text-sm font-medium text-gray-700">Hình ảnh khách sạn</label>
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
                    Cập nhật khách sạn
                </button>
            </div>
        </form>

    );
}