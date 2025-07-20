"use client"
import { getBlogsbyPage, getBlogsByLocationId } from '@/app/api/blogService';
import { BlogsByPage, Pagination } from '@/app/types/blogType';
import { useEffect, useState } from 'react';
import { getAllLocation } from '@/app/api/locationService';
import { Locations } from '@/app/types/locationTypes';
import Link from 'next/link';
export default function Article() {
    const [page, setPage] = useState(1);
    const [blogs, setBlogs] = useState<BlogsByPage[]>([]);
    const [pagination, setPagination] = useState<Pagination>();
    const [locations, setLocations] = useState<Locations[]>([]);
    const [selectedLocationId, setSelectedLocationId] = useState<number | 'all'>('all');

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await getAllLocation();
                setLocations(res.data.data.locations);
            } catch (error) {
                console.log('Lỗi lấy khu vực:', error);
            }
        };
        fetchLocations();
    }, []);
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                let res;
                if (selectedLocationId === 'all') {
                    res = await getBlogsbyPage(page);
                } else {
                    res = await getBlogsByLocationId(selectedLocationId, page);
                }

                setBlogs(res.data.data.blogs);
                setPagination(res.data.data.pagination);
            } catch (error) {
                console.log('Lỗi lấy blog:', error);
            }
        };
        fetchBlogs();
    }, [selectedLocationId, page]);
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Giới thiệu trang Booking */}
            <div className="text-center mb-12">
                <h1 className="text-4xl text-[#fffffe] font-bold mb-4"><span>B5ooking: </span>Khám phá Sự đặc sắc
                    và Cập nhật tin tức mới nhất</h1>
                <p className="text-gray-600 dark:text-[#94a1b2] text-lg">
                    Cập nhật những kinh nghiệm, mẹo hay và địa điểm du lịch thú vị dành cho bạn.
                </p>
            </div>

            {/* Filter Location */}
            <div className="flex gap-4 mb-6 overflow-x-auto">
                <button
                    className={`px-4 py-2 rounded ${selectedLocationId === 'all' ? 'bg-white dark:bg-[#7f5af0] dark:text-[#fffffe] shadow font-semibold' : 'dark:text-[#94a1b2]'}`}
                    onClick={() => {
                        setSelectedLocationId('all');
                        setPage(1);
                    }}
                >
                    Tất cả
                </button>
                {locations.map((loc) => (
                    <button
                        key={loc.id}
                        onClick={() => {
                            setSelectedLocationId(loc.id);
                            setPage(1);
                        }}
                        className={`px-4 py-2 rounded ${selectedLocationId === loc.id ? 'bg-white dark:bg-[#7f5af0] dark:text-[#fffffe] shadow font-semibold' : 'dark:text-[#94a1b2]'}`}
                    >
                        {loc.city}
                    </button>
                ))}
            </div>

            {/* Blog Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <Link href={`/blog/${blog.slug}`} key={blog.id} className="border rounded p-4 shadow">
                        <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded" />
                        <h2 className="text-xl font-semibold dark:text-[#fffffe] mt-2">{blog.title}</h2>
                        <p className="text-gray-600 dark:text-[#94a1b2] text-sm mt-1">{blog.summary}</p>
                        <p className="text-gray-400 dark:text-[#94a1b2] text-xs mt-1">
                            {new Date(blog.create_At).toLocaleDateString()}
                        </p>
                    </Link>
                ))}
            </div>

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