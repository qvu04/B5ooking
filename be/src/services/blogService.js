import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const blogService = {

    getAllBlogs: async function () {
        const blogs = await prisma.blogPost.findMany({
            select: {
                id: true,
                title: true,
                summary: true,
                image: true,
                create_At: true,
                update_At: true,
            }
        })
        return blogs;
    },

    getBlogBySlug : async function (slug) {
        const blog = await prisma.blogPost.findUnique({
            where: { slug: slug },
            select: {
                id: true,
                title: true,
                content: true,
                author : true,
                summary: true,
                image: true,
                create_At: true,
                update_At: true,
            }
        });
        return blog;
    },

    getAllBlogsByLocationId: async function (locationId) {
        const blogs = await prisma.blogPost.findMany({
            where: { locationId: locationId },
            select: {
                id: true,
                title: true,
                summary: true,
                image: true,
                create_At: true,
                update_At: true,
            }
        });
        return blogs;
    }
}