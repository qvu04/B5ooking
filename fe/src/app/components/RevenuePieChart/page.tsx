'use client'

import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { HotelRevenue } from '@/app/types/adminType'
import { getRevenuePieChart } from '@/app/api/adminService'

// Mở rộng bảng màu để không bị trùng khi có nhiều khách sạn
const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4444', '#8884d8',
    '#A569BD', '#F5B041', '#58D68D', '#5DADE2', '#DC7633', '#7FB3D5', '#AAB7B8',
    '#E74C3C', '#2ECC71', '#F1C40F', '#7D3C98', '#1ABC9C', '#34495E'
];

export default function RevenuePieChart() {
    const [data, setData] = useState<HotelRevenue[]>([])

    const fetchData = async () => {
        try {
            const res = await getRevenuePieChart("month")
            setData(res.data.data)
        } catch (error) {
            console.log('✌️error --->', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Card >
            <CardHeader>
                <CardTitle>Biểu đồ phần trăm doanh thu theo khách sạn</CardTitle>
            </CardHeader>

            {data.length === 0 ? (
                <p className="text-muted-foreground text-center">Không có dữ liệu khách sạn để hiển thị</p>
            ) : (
                <CardContent className="h-[700px]">
                    <ResponsiveContainer width="100%" height="70%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="precent"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={130}
                            // Ẩn label trong biểu đồ cho đỡ rối
                            // label={({ name, precent }) => `${name}: ${precent.toFixed(1)}%`}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="mt-4 max-h-[200px] overflow-y-auto space-y-1 px-4 text-sm">
                        {data.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                <span className="text-muted-foreground">{entry.name}: {entry.precent.toFixed(1)}%</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            )}
        </Card>
    )
}
