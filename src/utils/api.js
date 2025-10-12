import axios from "axios";
import { getAuthToken } from "./helper.js";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {

        const isLoginPage = window.location.pathname === "/login";

        if (error.response?.status === 401 && !isLoginPage) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }

        const normalizedError = {
            success : false,
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Something went wrong",
            errors: error.response?.data?.errors || { message: "Something went wrong" },
        };

        return Promise.reject(normalizedError);
    }
);

export default api;
