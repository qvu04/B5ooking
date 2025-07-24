"use client"
import { getAllBookingService } from "@/app/api/adminService";
import { useEffect } from "react";

export default function BookingsManager() {
    const fetchAllBooking = async () => {
        try {
            const res = await getAllBookingService();
            console.log('✌️res --->', res);
        } catch (error) {
            console.log('✌️error --->', error);

        }
    }
    useEffect(() => {
        fetchAllBooking()
    }, [])
    return (
        <>
            <h2>Quản lý booking</h2>
        </>
    )
}