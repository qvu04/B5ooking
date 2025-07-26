'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { getRevenueChartService } from '@/app/api/adminService';
import { PaymentRevenue } from '@/app/types/adminType';


export default function RevenueBarChart() {
    const [type, setType] = useState<'day' | 'week' | 'month'>('month');
    const [data, setData] = useState<PaymentRevenue[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getRevenueChartService(type);
                setData(res.data.data || []);
            } catch (err) {
                console.error(err);
                setData([]);
            }
        };
        fetchData();
    }, [type]);

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex items-center justify-between">
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

            <CardContent className="h-[700px]">
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="label" />
                            <YAxis
                                tickFormatter={(value) => `${(value / 1_000_000).toFixed(1)}tr`}
                            />
                            <Tooltip
                                formatter={(value: number) =>
                                    `${value.toLocaleString('vi-VN')} VND`
                                }
                            />
                            <Bar dataKey="revenue" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-center text-muted-foreground py-10">Không có dữ liệu doanh thu</p>
                )}
            </CardContent>
        </Card>
    );
}
