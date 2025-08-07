import api from "../utils/api.js";

const utilServices = {
    getServerTime: async () => {
        try {
            return await api.get("/server-time");
        } catch (error) {
            console.error("Error fetching server-time: ", error);
            throw error.response?.data?.errors || "Something went wrong";
        }
    },
    getUserRole:() => {
        return localStorage.getItem("role");
    },

    isAdmin:() => {
        return utilServices.getUserRole() === "admin";
    },

    isEmployee:() => {
        return utilServices.getUserRole() === "employee";
    }
};

export default utilServices;
