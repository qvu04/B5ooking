"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { loginGoogleService } from "@/app/api/authService";
import { setUserLoginAction } from "@/redux/features/userSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function LoginWithGoogle() {
    const dispatch = useDispatch();
    const router = useRouter();
    const handleGoogleSuccess = async (credentialRes: any) => {
        const credential = credentialRes?.credential;
        if (!credential) return;

        try {
            const res = await loginGoogleService(credential);
            const userData = res.data.data;
            dispatch(setUserLoginAction(userData));
            localStorage.setItem("user", JSON.stringify(userData));
            toast.success("Đăng nhập thành công");
            // Chuyển hướng
            router.push("/"); // hoặc trang dashboard của bạn
        } catch (error) {
            toast.error("Đăng nhập thất bại");
            console.error("Google Login Failed!", error);
        }
    };

    return (
        <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Google Login Failed!")}
        />
    );
}
