import api from "../utils/api.js";

const shiftServices = {
    getShiftDropdown: () => {
        try {
            return api.get("/shifts/all");
        } catch (error) {
            console.error("error fetching shift".error);
            throw error.response?.data?.errors;
        }
    },

    getShifts: async (page, search) => {
        try {
            return await api.get("/shifts", {
                params: { page, search },
            })
        } catch (error) {
            console.error("Error fetching shifts: ", error);
            throw error.response?.data?.errors || "Something went wrong";
        }
    },

    getShiftById: async (id) => {
        try {
            return await api.get(`/shifts/${id}`)
        } catch (error) {
            console.error("Error fetching shifts: ", error);
            throw error.response?.data?.errors || "Something went wrong";
        }
    },

    createShift: async (data) => {
        try {
            return await api.post("/shifts", data)
        } catch (error) {
            console.error("Error creating shifts: ", error);
            throw error.response?.data?.errors || "Something went wrong";
        }
    },

    updateShift: async (id, data) => {
        try {
            return await api.put(`/shifts/${id}`, data)
        } catch (error) {
            console.error("Error updating shifts: ", error);
            throw error.response?.data?.errors || "Something went wrong";
        }
    },

    deleteShift: async (id) => {
        try {
            return await api.delete(`/shifts/${id}`)
        } catch (error) {
            console.error("Error creating shifts: ", error);
            throw error.response?.data?.errors || "Something went wrong";
        }
    },
};

export default shiftServices;
