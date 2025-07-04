import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log('✌️apiUrl --->', apiUrl);
export const https = axios.create({
    baseURL: apiUrl,
})
