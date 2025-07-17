'use client';

import { DatePicker, Modal } from 'antd';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { CalendarDays, Users, BedDouble, Wallet } from 'lucide-react';

type ConfirmModalProps = {
    visible: boolean;
    onCancel: () => void;
    onConfirm: (nights: number, checkIn: string, checkOut: string) => void;
    guests: number;
    pricePerNight: number;
    checkIn?: string;
    discount?: number;
    checkOut?: string;
};

export default function ShowConfirm({
    visible,
    onCancel,
    onConfirm,
    guests,
    pricePerNight,
    checkIn,
    checkOut,
    discount,
}: ConfirmModalProps) {
    const [selectedDates, setSelectedDates] = useState<[Dayjs, Dayjs] | null>(
        checkIn && checkOut ? [dayjs(checkIn), dayjs(checkOut)] : null
    );

    const nights =
        selectedDates && selectedDates[0] && selectedDates[1]
            ? selectedDates[1].diff(selectedDates[0], 'day')
            : 0;

    const discountedPrice = discount && discount > 0
        ? pricePerNight * (1 - discount / 100)
        : pricePerNight;

    const total = nights * discountedPrice;

    const handleConfirm = () => {
        if (selectedDates) {
            onConfirm(
                nights,
                selectedDates[0].format('YYYY-MM-DD'),
                selectedDates[1].format('YYYY-MM-DD')
            );
        }
    };

    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            onOk={handleConfirm}
            okText="Xác nhận đặt phòng"
            cancelText="Hủy"
            width={600} // tăng chiều rộng modal
            className="rounded-xl"
        >
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 text-center">Xác nhận đặt phòng</h3>

                <div>
                    <label className="block mb-1 text-gray-700 font-semibold">Chọn ngày nhận và trả phòng</label>
                    <DatePicker.RangePicker
                        className="w-full"
                        format="YYYY-MM-DD"
                        value={selectedDates}
                        onChange={(dates) => setSelectedDates(dates as [Dayjs, Dayjs])}
                        disabledDate={(current) => current && current < dayjs().startOf('day')}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
                    <div className="flex items-center gap-2">
                        <Users className="text-blue-500" size={20} />
                        <span><strong>Số khách:</strong> {guests}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BedDouble className="text-purple-500" size={20} />
                        <span><strong>Số đêm:</strong> {nights}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarDays className="text-green-600" size={20} />
                        <span><strong>Giá mỗi đêm:</strong> {pricePerNight.toLocaleString()} VND</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <CalendarDays className="text-green-600" size={20} />
                        <span><strong>Giá mỗi đêm sau khi giảm:</strong> {discountedPrice.toLocaleString()} VND</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Wallet className="text-red-500" size={20} />
                        <span className="font-bold text-lg"><strong>Tổng:</strong> {total.toLocaleString()} VND</span>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
