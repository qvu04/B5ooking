'use client';
import { getSomeBlogs } from '@/app/api/blogService';
import { Blogs } from '@/app/types/blogType';
import React, { useEffect, useState } from 'react';

const PopularBlog = () => {
    const [blogs, setBlogs] = useState<Blogs[] | null>(null);

    const fetchBlogs = async () => {
        try {
            const res = await getSomeBlogs();
            setBlogs(res.data.data.blogs);
        } catch (error) {
            console.log('✌️error --->', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-2xl text-[#2b2c34] dark:text-[#fffffe] font-semibold mb-6">Bài viết nổi bật bạn nên xem</h2>

            <div className="flex overflow-x-auto gap-6 scrollbar-hide snap-x snap-mandatory">
                {blogs?.map((blog) => (
                    <div
                        key={blog.id}
                        className="min-w-[300px] max-w-sm flex-shrink-0 bg-white dark:bg-[#242629] border dark:border-gray-300 rounded-xl shadow-md snap-start"
                    >
                        <img
                            src={blog.image}
                            className="w-full h-48 object-cover rounded-t-xl"
                            alt={blog.title}
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-[#2b2c34] dark:text-[#fffffe] line-clamp-2">
                                {blog.title}
                            </h3>
                            <p className="text-sm text-[#2b2c34] dark:text-[#94a1b2] mt-2 line-clamp-2">
                                {blog.summary}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularBlog;
