'use client';
import { DatePicker, Modal } from 'antd';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { CalendarDays, Users, BedDouble, Wallet } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation()
    const [mounted, setMounted] = useState(false);

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
    useEffect(() => {
        setMounted(true);
    }, [])
    if (!mounted) return null;
    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            onOk={handleConfirm}
            okText={t("hotelId.text_77")}
            cancelText={t("hotelId.text_78")}
            width={600} // tăng chiều rộng modal
            className="rounded-xl"
        >
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 text-center">{t("hotelId.text_70")}</h3>

                <div>
                    <label className="block mb-1 text-gray-700 font-semibold">{t("hotelId.text_71")}</label>
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
                        <span><strong>{t("hotelId.text_72")}</strong> {guests}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BedDouble className="text-purple-500" size={20} />
                        <span><strong>{t("hotelId.text_73")}</strong> {nights}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarDays className="text-green-600" size={20} />
                        <span><strong>{t("hotelId.text_74")}</strong> {pricePerNight.toLocaleString()} VND</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarDays className="text-green-600" size={20} />
                        <span><strong>{t("hotelId.text_75")}</strong> {discountedPrice.toLocaleString()} VND</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Wallet className="text-red-500" size={20} />
                        <span className="font-bold text-lg"><strong>{t("hotelId.text_76")}</strong> {total.toLocaleString()} VND</span>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
