import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:3000",
    timeout: 10000000,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosInstance;