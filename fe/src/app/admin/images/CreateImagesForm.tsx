"use client";
import { useState } from "react";
import { Select, Modal } from "antd";
import toast from "react-hot-toast";
import { https } from "@/app/api/configService";
const { Option } = Select;

type Props = {
    open: boolean;
    onClose: () => void;
    activeTab: "hotel" | "room";
    filterOptions: [number, string][];
    onSuccess: () => void;
};

export default function CreateImagesForm({
    open,
    onClose,
    activeTab,
    filterOptions,
    onSuccess,
}: Props) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [imageFiles, setImageFiles] = useState<FileList | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!imageFiles || !selectedId) {
            toast.error("Vui lòng chọn đối tượng và ảnh hợp lệ");
            return;
        }

        const formData = new FormData();
        Array.from(imageFiles).forEach((file) => {
            formData.append("imageFile", file);
        });

        const endpoint =
            activeTab === "hotel"
                ? `/api/admin/addHotelImage/${selectedId}`
                : `/api/admin/addRoomImage/${selectedId}`;

        try {
            await https.post(endpoint, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Thêm ảnh thành công!");
            onClose();
            onSuccess();
            setImageFiles(null);
            setSelectedId(null);
        } catch (error) {
            console.error(error);
            toast.error("Không thể thêm ảnh");
        }
    };

    return (
        <Modal
            title={
                <h2 className="text-lg font-semibold text-gray-800">
                    Thêm ảnh phụ {activeTab === "hotel" ? "khách sạn" : "phòng"}
                </h2>
            }
            open={open}
            onCancel={onClose}
            footer={null}
            className="rounded-xl"
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-6 p-2 bg-white rounded-md"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {activeTab === "hotel" ? "Chọn khách sạn" : "Chọn phòng"}
                    </label>
                    <Select
                        className="w-full"
                        placeholder={`Chọn ${activeTab}`}
                        value={selectedId || undefined}
                        onChange={(value) => setSelectedId(value)}
                    >
                        {filterOptions.map(([id, name]) => (
                            <Option key={id} value={id}>
                                {name}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chọn ảnh
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setImageFiles(e.target.files)}
                        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        {activeTab === "hotel"
                            ? "Tối đa 30 ảnh"
                            : "Tối đa 5 ảnh"}
                    </p>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#7f5af0] hover:bg-[#6f4ae0] transition-colors text-white text-sm font-medium py-2.5 rounded-lg shadow-md"
                >
                    Thêm ảnh
                </button>
            </form>
        </Modal>
    );
}
