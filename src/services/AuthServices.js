import api from "../utils/api.js";
import axios from "axios";

const AuthServices = {
    login: async (data) => {
        try {
           return await api.post("/login", data,{
               headers: {
                   'Accept': 'application/json'
               }
           } );
        } catch (error) {
            throw error.response || "Something went wrong";
        }
    },

    logout: async () => {
        const response = await api.get("/logout");
        localStorage.removeItem("token");
        localStorage.removeItem("employeeId");
        localStorage.removeItem("role")
        localStorage.removeItem("name");
        return response;
    }
};

export default AuthServices;
