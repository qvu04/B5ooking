'use client';

import { useEffect, useState } from 'react';
import {
    Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card';
import {
    Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from '@/components/ui/select';
import { getRevenueChartService } from '@/app/api/adminService';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS, LineElement, CategoryScale, LinearScale,
    PointElement, Tooltip, Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

type RevenueData = {
    label: string;
    total: number;
};

export default function RevenueChart() {
    const [type, setType] = useState<'day' | 'week' | 'month'>('month');
    const [dataAPI, setDataAPI] = useState<RevenueData[]>([]);

    useEffect(() => {
        getRevenueChartService(type)
            .then((res) => {
                if (res.data && Array.isArray(res.data.data)) {
                    setDataAPI(res.data.data);
                } else {
                    setDataAPI([]);
                }
            })
            .catch((err) => {
                console.error(err);
                setDataAPI([]);
            });
    }, [type]);

    const chartData = {
        labels: dataAPI?.map((item) => item.label) || [],
        datasets: [
            {
                label: 'Doanh thu',
                data: dataAPI?.map((item) => item.total) || [],
                fill: false,
                borderColor: '#4f46e5',
                tension: 0.3,
                pointBackgroundColor: '#4f46e5',
                pointBorderColor: '#fff',
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) =>
                        `Doanh thu: ${context.raw.toLocaleString('vi-VN')} VND`,
                },
            },
        },
        scales: {
            y: {
                type: 'linear' as const,
                beginAtZero: true,
                ticks: {
                    callback: function (value: string | number) {
                        if (typeof value === 'number') {
                            return `${value.toLocaleString('vi-VN')} VND`;
                        }
                        return value;
                    },
                },
            },
            x: {
                type: 'category' as const,
            },
        },
    };



    return (
        <Card className="w-full mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Thống kê doanh thu</CardTitle>
                <Select value={type} onValueChange={(value: 'day' | 'week' | 'month') => setType(value)}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="day">Theo ngày</SelectItem>
                        <SelectItem value="week">Theo tuần</SelectItem>
                        <SelectItem value="month">Theo tháng</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                {dataAPI.length > 0 ? (
                    <Line data={chartData} options={chartOptions} />
                ) : (
                    <p className="text-center text-muted-foreground py-10">Không có dữ liệu doanh thu</p>
                )}
            </CardContent>
        </Card>
    );
}
