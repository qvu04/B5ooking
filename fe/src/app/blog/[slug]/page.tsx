'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBlogsBySlug } from '@/app/api/blogService';
import { Blogs } from '@/app/types/blogType';

export default function BlogDetail() {
    const { slug } = useParams();
    const [blog, setBlog] = useState<Blogs | null>(null);

    useEffect(() => {
        const fetchBlogBySlug = async () => {
            try {
                if (typeof slug === 'string') {
                    const res = await getBlogsBySlug(slug);
                    setBlog(res.data.data.blog); // 👈 lấy đúng path từ API
                }
            } catch (err) {
                console.error('Lỗi khi fetch blog:', err);
            }
        };

        fetchBlogBySlug();
    }, [slug]);

    if (!blog) return <p className="text-center py-10">Đang tải blog...</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-600 mb-2">Tác giả: {blog.author}</p>
            <p className="text-sm text-gray-400 mb-4">
                Ngày đăng: {new Date(blog.create_At).toLocaleDateString()}
            </p>
            <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto mb-6 rounded shadow"
            />
            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />
        </div>
    );
}
