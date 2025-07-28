"use client";
import { useState } from "react";
import { Modal, Select } from "antd";
import toast from "react-hot-toast";
import { putUpdateImagesHotel, putUpdateImagesRoom } from "@/app/api/adminService";

const { Option } = Select;

type Props = {
    open: boolean;
    onClose: () => void;
    activeTab: "hotel" | "room";
    filterOptions: [number, string][];
    onSuccess: () => void;
};

export default function UpdateImagesForm({
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

        if (!selectedId || !imageFiles) {
            toast.error("Vui lòng chọn đối tượng và ảnh cần cập nhật");
            return;
        }

        const formData = new FormData();
        Array.from(imageFiles).forEach((file) => {
            formData.append("imageFile", file);
        });

        try {
            if (activeTab === "hotel") {
                await putUpdateImagesHotel(selectedId, formData);
            } else {
                await putUpdateImagesRoom(selectedId, formData);
            }

            toast.success("Cập nhật ảnh thành công!");
            onClose();
            onSuccess();
            setSelectedId(null);
            setImageFiles(null);
        } catch (error) {
            console.error(error);
            toast.error("Không thể cập nhật ảnh");
        }
    };

    return (
        <Modal
            title={`Cập nhật ảnh ${activeTab === "hotel" ? "khách sạn" : "phòng"}`}
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">
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
                    <label className="block font-medium mb-1">Chọn ảnh mới</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setImageFiles(e.target.files)}
                        required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Ảnh mới sẽ thay thế ảnh cũ. {activeTab === "hotel" ? "Tối đa 30 ảnh." : "Tối đa 5 ảnh."}
                    </p>
                </div>

                <button
                    type="submit"
                    className="bg-[#f5a623] hover:bg-[#e89513] text-white px-4 py-2 rounded w-full"
                >
                    Cập nhật ảnh
                </button>
            </form>
        </Modal>
    );
}
