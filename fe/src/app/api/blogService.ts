import { https } from "./configService"

export const getSomeBlogs = () => {
    return https.get("/api/blog/getSomeBlogs");
}