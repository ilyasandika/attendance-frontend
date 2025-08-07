import api from "../utils/api.js";

const attendanceServices = {
    getAttendances: async (page, search) => {
        try {
            return await api.get(`/attendances?page=${page}&search=${search}`);
        } catch (error) {
            console.error("Error fetching attendances: ", error);
            throw error.response?.data?.errors || "Something went wrong";
        }
    },

    checkInOut: async (data) => {
        try {
            console.log(data);
            return await api.post("/attendances/check", data);
        } catch (error) {
            console.error("Error checking in/out: ", error);
            throw error.response?.data?.errors || "Something went wrong";
        }
    },

    getAttendanceByLogin: async (page, search) => {
        try {
            return await api.get(`/attendances/users?page=${page}&search=${search}`);
        } catch (error) {
            console.error("Error fetching attendances: ", error);
        }
    },


    getAttendanceById: async (id) => {
        try {
            return await api.get(`/attendances/${id}`);
        } catch (error) {
            console.error("Error fetching attendances: ", error);
        }
    }


};

export default attendanceServices;
