import RevenueChart from "@/app/components/RevenueChart/page";
import RevenuePieChart from "@/app/components/RevenuePieChart/page";
import TotalBill from "@/app/components/TotalBill/page";

export default function DashboardAdmin() {
    return (
        <>
            <div className="p-6 space-y-6">
                {/* Tổng doanh thu */}
                <TotalBill />

                {/* Biểu đồ chính */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <RevenueChart />
                    <RevenuePieChart />
                </div>
            </div>
        </>
    )
}