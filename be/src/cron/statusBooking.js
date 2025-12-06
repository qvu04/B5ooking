import cron from "node-cron";
import { userService } from "../services/userService";

export const startStatusBooking = () => {
   cron.schedule("* * * * *", async () => {
    console.log("⏰ Bắt đầu cron check...");
    await userService.statusBooking();
    console.log("✅ Cron check xong");
  });
}