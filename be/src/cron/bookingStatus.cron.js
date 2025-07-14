import cron from "node-cron";
import { userService } from "../services/userService.js";


export const startBookingStatusCron = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("Đang cập nhật trạng thái booking...");
    await userService.updateFinishBooking();
    console.log("✅ Đã cập nhật xong trạng thái booking");
  });
};