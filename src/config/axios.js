import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiClient = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Content-type": "application/json",
    },
    timeout: 10000,
});

export default apiClient;