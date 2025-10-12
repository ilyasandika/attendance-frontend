import api from "../utils/api.js";
import axios from "axios";

const AuthServices = {

    login : async (data) => await api.post("/login", data, {headers : {'Accept' : 'application/json'}}),

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
