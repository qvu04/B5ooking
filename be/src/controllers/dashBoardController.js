import { dashboardService } from "../services/dashboardService.js"
import { responseSuccess } from "../helpers/response.helper.js"

export const dashBoardController = {
    getTotal: async function (req, res, next) {
        try {
            const total = await dashboardService.getTotal()
            const response = responseSuccess(total, "Lấy tổng thống kê thành công")
            res.status(response.status).json(response)
        } catch (err) {
            console.error("Lấy tổng thống kê không thành công", err)
            next(err)
        }
    },

    getGroupedRevenue: async function (req, res, next) {
        try {
            const { type, formDate, toDate } = req.query
            const result = await dashboardService.getGroupedRevenue(type, formDate, toDate)
            const response = responseSuccess(result, "Thống kê doanh thu theo ngày / tuần / tháng thành công")
            res.status(response.status).json(response)
        } catch (err) {
            console.error("Thống kê doanh thu theo ngày / tuần / tháng không thành công", err)
            next(err)
        }
    },
    getHotelRevenuePercentage: async function (req, res, next) {
       try {
         const { formDate, toDate } = req.query
        const result = await dashboardService.getHotelRevenuePercentage(formDate, toDate)
   const response = responseSuccess(result, "Phần trăm doanh thu của từng khách sạn thành công")
            res.status(response.status).json(response)
       } catch (err) {
        console.error("Phần trăm doanh thu của từng khách sạn không thành công", err)
            next(err)
       }
    }
}