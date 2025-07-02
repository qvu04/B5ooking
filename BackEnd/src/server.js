import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/",(req,res) =>{
    res.send("hello")
})
app.use(router)
 app.use(errorHandler)
app.listen(PORT, ()=>{
    console.log(`Máy chủ được chạy ở http://localhost:${PORT}`)
})