import { useForm } from "react-hook-form";
import { updateUserService } from "../api/userService";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/redux/hook";
import { setUserLoginAction } from "@/redux/features/userSlice";

type FormValues = {
    firstName: string;
    lastName: string;
    phone: string;
    gender: string;
};

export default function EditProfileUser({
    defaultValues,
    onClose,
    isOpen,
}: {
    defaultValues: FormValues;
    onClose: () => void;
    isOpen: boolean;
}) {
    const {
        register,
        handleSubmit,
        formState: { isDirty },
    } = useForm<FormValues>({
        defaultValues,
    });
    const dispatch = useAppDispatch();
    const onSubmit = async (data: FormValues) => {
        try {
            const res = await updateUserService(data);
            console.log('✌️resDataUpdate --->', res);
            const updateUser = res.data.data.updateUser;
            const oldUser = JSON.parse(localStorage.getItem("user") || "{}");
            const token = oldUser?.token_access;
            const userWithToken = {
                ...updateUser,
                token_access: token,
            };
            dispatch(setUserLoginAction(userWithToken));
            localStorage.setItem("user", JSON.stringify(userWithToken));
            toast.success("Cập nhật thành công");
            onClose();
        } catch (error) {
            toast.error("Cập nhật thất bại");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-xl relative space-y-6">
                {/* Nút đóng */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black dark:hover:text-white text-xl"
                >
                    ❌
                </button>

                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                    Chỉnh sửa thông tin cá nhân
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Họ</label>
                            <input
                                {...register("firstName")}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Tên</label>
                            <input
                                {...register("lastName")}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Số điện thoại</label>
                        <input
                            {...register("phone")}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Giới tính</label>
                        <select
                            {...register("gender", { required: "Vui lòng chọn giới tính" })}
                            className="w-full p-3 border rounded-lg dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                        >
                            <option value="" disabled>-- Vui lòng chọn giới tính --</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-lg text-gray-700 dark:text-white dark:border-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={!isDirty}
                            className={`px-5 py-2.5 rounded-lg text-white font-semibold transition ${isDirty
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-blue-300 cursor-not-allowed"
                                }`}
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
