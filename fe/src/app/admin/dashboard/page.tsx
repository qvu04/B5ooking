import RevenueChart from "@/app/components/RevenueChart/page";
import RevenuePieChart from "@/app/components/RevenuePieChart/page";
import TotalBill from "@/app/components/TotalBill/page";

export default function DashboardAdmin() {
    return (
        <>
            <TotalBill />
            <div className="flex gap-6">
                <RevenueChart />
                <RevenuePieChart />
            </div>
        </>
    )
}