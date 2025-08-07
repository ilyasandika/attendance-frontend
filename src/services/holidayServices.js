import api from "../utils/api.js";

const holidayServices = {
    getHolidays: async (page, search) => {
        try {
            return await api.get(`/schedules/holidays?page=${page}&search=${search}`);
        } catch (error) {
            console.error("Error fetching holidays: ", error);
            throw error.response?.data?.errors || "Something went wrong";
        }
    },

    getHolidayById: async (id) => {
        try {
            return await api.get(`/schedules/holidays/${id}`);
        } catch (error) {
            console.error("Error fetching holidays: ", error);
        }
    },

    deleteHoliday: async (id) => {
        try {
            return await api.delete(`/schedules/holidays/${id}`);
        } catch (error) {
            console.error("Error fetching holidays: ", error);
            throw error.response?.data?.errors || "Something went wrong";
        }
    },

    createHoliday: async (data) => {
        try {
            return await api.post("/schedules/holidays", data);
        } catch (error) {
            console.error("Error creating holidays: ", error);
            throw error.response?.data?.errors || "Something went wrong";
        }
    },

    updateHoliday: async (id, data) => {
        try {
            return await api.put(`/schedules/holidays/${id}`, data);
        } catch (error) {
            console.error("Error updating holidays: ", error);
            throw error.response?.data?.errors || "Something went wrong";
        }
    }
};

export default holidayServices;
