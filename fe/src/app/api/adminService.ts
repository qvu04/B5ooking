import { https } from "./configService";

export const getRevenueChartService = (type: "day" | "week" | "month") => {
    const now = new Date();
    const toDate = now.toISOString();
    let fromDate;

    if (type === 'day') {
        // Lấy 7 ngày gần nhất
        const past = new Date();
        past.setDate(now.getDate() - 7);
        fromDate = past.toISOString();
    } else if (type === 'week') {
        // Lấy 4 tuần gần nhất (28 ngày)
        const past = new Date();
        past.setDate(now.getDate() - 28);
        fromDate = past.toISOString();
    } else {
        // Lấy 6 tháng gần nhất
        const past = new Date();
        past.setMonth(now.getMonth() - 6);
        fromDate = past.toISOString();
    }

    return https.get(`/api/dashboard/getGroupedRevenue?type=${type}&fromDate=${fromDate}&toDate=${toDate}`);
};
export const getTotalService = () => {
    return https.get("/api/dashboard/getTotal");
}
