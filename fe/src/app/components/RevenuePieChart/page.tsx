'use client'
import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { HotelRevenue } from '@/app/types/adminType'
import { getRevenuePieChart } from '@/app/api/adminService'
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4444', '#8884d8']
export default function RevenuePieChart() {
    const [data, setData] = useState<HotelRevenue[]>([])
    const fetchData = async () => {
        try {
            const res = await getRevenuePieChart("month");
            console.log('✌️res --->', res);
            setData(res.data.data);
        } catch (error) {
            console.log('✌️error --->', error);

        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <Card>
            <CardHeader>
                <CardTitle>Biểu đồ phần trăm doanh thu theo khách sạn</CardTitle>
            </CardHeader>
            {data.length === 0 ? (
                <p className="text-muted-foreground text-center">Không có dữ liệu khách sạn để hiển thị</p>
            ) : (
                <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="precent"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={130}
                                label={({ name, precent }) => `${name}: ${precent.toFixed(1)}%`}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            )}
        </Card>
    );
}