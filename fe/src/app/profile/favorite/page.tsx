"use client";

import { getFavoriteList, removeFavorite } from "@/app/api/favoriteService";
import { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { FavoriteItem } from "@/app/types/favoriteType";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogTitle,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

export default function Favorite() {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const fetchFavoriteList = async () => {
        try {
            const res = await getFavoriteList();
            setFavorites(res?.data?.data.favorites || []);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách yêu thích:", error);
        }
    };

    const handleDeleteFavorite = async () => {
        if (!selectedId) return;
        try {
            await removeFavorite(selectedId);
            toast.success("Đã xoá khỏi danh sách yêu thích");
            fetchFavoriteList();
            setSelectedId(null);
        } catch (err) {
            console.error("Lỗi xoá yêu thích:", err);
            toast.error("Xoá thất bại");
        }
    };

    useEffect(() => {
        fetchFavoriteList();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6 text-center dark:text-black">
                Khách sạn yêu thích của bạn
            </h1>

            {favorites.length === 0 ? (
                <p className="text-center text-gray-500">
                    Bạn chưa có khách sạn nào trong danh sách yêu thích.
                </p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {favorites.map((item) => {
                        const hotel = item.hotel;
                        return (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="relative w-full h-48">
                                    <img
                                        src={hotel.image}
                                        alt={hotel.name}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <button
                                                onClick={() => setSelectedId(item.hotelId)}
                                                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                                            >
                                                <FaHeart className="text-red-500" />
                                            </button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Xoá khỏi danh sách yêu thích?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Hành động này sẽ xoá khách sạn khỏi danh sách yêu
                                                    thích của bạn và không thể hoàn tác.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Huỷ</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleDeleteFavorite}>
                                                    Đồng ý
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                                <div className="p-4 space-y-1">
                                    <h2 className="text-lg font-semibold truncate dark:text-black">
                                        {hotel.name}
                                    </h2>
                                    <p className="text-gray-600 text-sm">{hotel.address}</p>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <FaStar /> {hotel.averageRating ?? 5}/5
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
