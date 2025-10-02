import { loginGoogleService } from "@/app/api/authService"
import { setUserLoginAction } from "@/redux/features/userSlice";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";

export function LoginWithGoogle() {
    const dispatch = useDispatch();
    const handleGoogleSucess = async (credentialRes: any) => {
        try {
            const res = await loginGoogleService(credentialRes.credential);
            dispatch(setUserLoginAction(res.data));
            localStorage.setItem("user", JSON.stringify(res.data));
        } catch (error) {
            console.log("Google Login Failed!", error)
        }
    }
    return (
        <GoogleLogin
            onSuccess={handleGoogleSucess}
            onError={() => console.log("Google Login Failed")}
        />
    )

}