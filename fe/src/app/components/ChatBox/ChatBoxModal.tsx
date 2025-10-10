"use client";
import { chatBoxService } from "@/app/api/chatboxService";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import AiResponseHotel from "./AiResponeHotel";

export default function ChatBoxModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [ask, setAsk] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const { user } = useSelector((state: RootState) => state.userSlice);
    const handleSend = async () => {
        if (!ask.trim()) return;

        const userMsg = { sender: "user", text: ask };
        setMessages((prev) => [...prev, userMsg]);
        setAsk("");
        setLoading(true);

        try {
            const currentUser = user ? { id: user.id, fullname: user.fullName } : undefined;
            const res = await chatBoxService({ ask }, currentUser);
            console.log(res);
            const aiData = res.data.data.data;
            const aiMsg = {
                sender: "ai",
                text: aiData.text,
                type: aiData.object.type,
                data: aiData.data,
            };
            console.log("AI Hotel Data:", aiData.data);
            setMessages((prev) => [...prev, aiMsg]);
        } catch (err) {
            console.error("AI Error:", err);
            const errMsg = { sender: "ai", text: "Có lỗi xảy ra, vui lòng thử lại." };
            setMessages((prev) => [...prev, errMsg]);
        } finally {
            setLoading(false);
        }
    };

    // Scroll xuống cuối chat khi có tin nhắn mới
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/40 flex justify-end z-[9999]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="w-[400px] h-[600px] bg-white dark:bg-gray-900 rounded-l-2xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700"
                >
                    {/* Header */}
                    <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-tl-2xl flex justify-between items-center shadow-md">
                        <h3 className="font-semibold text-lg">Trợ lý ảo khách sạn 🏨</h3>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 transition"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Chat content */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                        {messages.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-line break-words ${m.sender === "user"
                                    ? "bg-blue-600 text-white self-end ml-auto"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                    }`}
                            >
                                <p>{m.text}</p>

                                {/* Nếu AI trả về danh sách khách sạn */}
                                {m.type === "hotel" && <AiResponseHotel data={m.data} />}

                            </motion.div>
                        ))}
                        {loading && (
                            <div className="italic text-gray-500 text-sm">AI đang trả lời...</div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input */}
                    <div className="border-t dark:border-gray-700 p-3 flex items-center gap-2 bg-gray-50 dark:bg-gray-800">
                        <input
                            value={ask}
                            onChange={(e) => setAsk(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Nhập câu hỏi..."
                            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition disabled:opacity-50"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
