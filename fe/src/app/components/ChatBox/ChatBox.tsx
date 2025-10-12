"use client";
import { useState } from "react";
import { BotIcon } from "lucide-react"; // icon từ lucide-react
import ChatModal from "./ChatBoxModal";

export default function ChatBubble() {
    const [open, setOpen] = useState(false);
    return (
        <>
            {/* Nút bong bóng nổi */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-20 right-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg z-[9998] 
             animate-pulse ring-2 ring-blue-400/40 hover:ring-blue-300 transition-all"
            >
                <BotIcon className="w-6 h-6" />
            </button>

            {/* Modal chat */}
            <ChatModal isOpen={open} onClose={() => setOpen(false)} />
        </>
    );
}
