'use client';
import { getSomeBlogs } from '@/app/api/blogService';
import { Blogs } from '@/app/types/blogType';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { translateText } from "@/lib/translate";
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const BlogCardSkeleton = () => (
    <div className="min-w-[300px] max-w-sm flex-shrink-0 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 animate-pulse snap-start">
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />
        <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        </div>
    </div>
);

const PopularBlog = () => {
    const [blogs, setBlogs] = useState<Blogs[] | null>(null);
    const [loading, setLoading] = useState(true);
    const { i18n, t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const res = await getSomeBlogs();
                const blogs: Blogs[] = res.data.data.blogs;

                if (i18n.language === "vi") {
                    setBlogs(blogs);
                    return;
                }

                const translatedBlogs = await Promise.all(
                    blogs.map(async (blog) => {
                        const title = await translateText(blog.title, "vi", i18n.language);
                        const summary = await translateText(blog.summary, "vi", i18n.language);
                        return { ...blog, title, summary };
                    })
                );
                setBlogs(translatedBlogs);
            } catch (error) {
                console.log('✌️error --->', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [i18n.language]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-[#2b2c34] dark:text-[#fffffe] font-semibold">{t("home.blog_title")}</h2>
                <Link href="/blog" className="text-sm font-semibold text-[#6246ea] hover:text-[#5135c8] transition-colors duration-200 flex items-center gap-1">
                    {t("home.seeMoreHotels") || "Xem thêm"} →
                </Link>
            </div>

            <div className="flex overflow-x-auto gap-5 scrollbar-hide snap-x snap-mandatory pb-2">
                {loading
                    ? [1, 2, 3].map((i) => <BlogCardSkeleton key={i} />)
                    : blogs?.map((blog) => (
                        <Link
                            href={`/blog/${blog.slug}`}
                            key={blog.id}
                            className="min-w-[300px] max-w-sm flex-shrink-0 snap-start group"
                        >
                            <div className="bg-white dark:bg-[#242629] border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                                <div className="overflow-hidden">
                                    <Image
                                        src={blog.image}
                                        width={500}
                                        height={300}
                                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                        alt={blog.title}
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-base font-semibold text-[#2b2c34] dark:text-[#fffffe] line-clamp-2 group-hover:text-[#6246ea] transition-colors duration-200">
                                        {blog.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-[#94a1b2] mt-2 line-clamp-2">
                                        {blog.summary}
                                    </p>
                                    <span className="inline-block mt-3 text-xs font-semibold text-[#6246ea] group-hover:text-[#5135c8] transition-colors duration-200">
                                        {t("home.readMore") || "Đọc tiếp"} →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default PopularBlog;
