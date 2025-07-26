"use client"
import { useEffect, useState } from "react"
import { Pagination } from "@/app/types/blogType";
import { deleteBlogService, getAllBlogService } from "@/app/api/adminService";
import { BlogManager } from "@/app/types/adminType";
import { Modal } from 'antd';
import CreateBlogForm from "./CreateBlogForm";
import UpdateBlogForm from "./UpdateBlogForm";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";
export default function Blogs() {
    const [page, setPage] = useState(1);
    const [locationId, setLocationId] = useState<number | null>(null);
    const [pagination, setPagination] = useState<Pagination>()
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [blogTitle, setBlogTitle] = useState('')
    const [showFormUpdate, setShowFormUpdate] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<BlogManager | null>(null);
    const [blog, setBlog] = useState<BlogManager[]>([]);
    const [debouncedBlogTitle] = useDebounce(blogTitle, 500);
    const fetchAllBlog = async () => {
        try {
            const res = await getAllBlogService(page, locationId ?? 0, debouncedBlogTitle);
            console.log('✌️res --->', res);
            setBlog(res.data.data.blogs);
            setPagination(res.data.data.pagination);
            console.log('✌️res --->', res);
        } catch (error) {
            console.log('✌️error --->', error);
        }
    }
    const handleDeleteBlog = async (id: number) => {
        try {
            await deleteBlogService(id);
            toast.success("Xóa bài viết thành công");
            fetchAllBlog();
        } catch (error) {
            console.log('✌️error --->', error);
            toast.error("Xóa bài viết thất bại");
        }

    }
    const handleCityClick = (locId: number) => {
        setLocationId(locId);
        setPage(1); // reset về trang đầu khi lọc
    };

    const handleResetFilter = () => {
        setLocationId(null);
        setPage(1);
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBlogTitle(e.target.value);
        setPage(1);
    }
    const toggleFormCreate = () => {
        setShowFormCreate(prev => !prev);
    };
    const toggleFormUpdate = () => {
        setShowFormUpdate(prev => !prev);
    };
    useEffect(() => {
        fetchAllBlog();
    }, [page, locationId, debouncedBlogTitle])
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Quản lý bài viết</h2>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm bài viết"
                    value={blogTitle}
                    onChange={handleSearchChange}
                    className="border border-gray-300 p-2 rounded mb-4 w-full max-w-sm"
                />
                <button onClick={toggleFormCreate} className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded">Tạo bài viết mới</button>
            </div>
            <Modal
                title="Tạo bài viết"
                open={showFormCreate}
                onCancel={() => setShowFormCreate(false)}
                footer={null}
            >
                <CreateBlogForm
                    onSuccess={() => {
                        setShowFormCreate(false);
                        fetchAllBlog();
                    }}
                />
            </Modal>

            {/* Lọc đang bật */}
            {locationId !== null && (
                <div className="mb-4">
                    <span className="text-blue-600 font-semibold mr-2">Đang lọc theo khu vực</span>
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
                        <th className="p-5 border">Tiêu đề</th>
                        <th className="p-5 border">Mô tả</th>
                        <th className="p-5 border">Khu vực</th>
                        <th className="p-5 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blog.map((blog) => (
                        <tr key={blog.id} className="hover:bg-gray-50">
                            <td className="p-10 border">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-48 h-28 object-cover rounded-md shadow"
                                />
                            </td>
                            <td className="p-5 border">{blog.title}</td>
                            <td className="p-5 border truncate max-w-[200px]">{blog.summary}</td>
                            <td className="p-10 border">
                                <button
                                    className="text-blue-600 underline"
                                    onClick={() => handleCityClick(blog.location.id)}
                                >
                                    {blog.location.city}
                                </button>
                            </td>
                            <td className="border p-2">
                                <div className="flex gap-5">
                                    <button onClick={() => {
                                        setSelectedBlog(blog);
                                        toggleFormUpdate();
                                    }} className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded">
                                        Sửa
                                    </button>
                                    <button onClick={() => {
                                        handleDeleteBlog(blog.id);
                                    }} className="bg-[#7f5af0] text-[#fffffe] px-4 py-2 rounded">
                                        Xóa
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {selectedBlog && (
                        <Modal
                            title="Cập nhật bài viết"
                            open={showFormUpdate}
                            onCancel={() => setShowFormUpdate(false)}
                            footer={null}
                        >
                            <UpdateBlogForm
                                onSuccess={() => {
                                    setShowFormUpdate(false);
                                    fetchAllBlog();
                                }}
                                blogId={selectedBlog.id}
                                blogData={selectedBlog}
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