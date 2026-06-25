import { z } from "zod";
export const registerSchema = z.object({
    firstName: z.string().min(1, "Vui lòng nhập họ"),
    lastName: z.string().min(1, "Vui lòng nhập tên"),
    email: z.email("Email không hợp lệ"),
    gender: z.enum(["male", "female"], "Vui lòng chọn giới tính"),
    password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
    confirmPassword: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"]
});
export type RegisterPayload = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự")
});
export type LoginPayload = z.infer<typeof loginSchema>;