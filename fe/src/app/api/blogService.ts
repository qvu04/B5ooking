import { https } from "./configService"

export const getAllBlog = () => {
    https.get("/api/blog/getAllBlogs");
}