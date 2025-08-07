import api from "../utils/api.js";

const roleServices = {
    getRoles: async (page, search) => {
        try {
            return await api.get(`/roles?page=${page}&search=${search}`);
        } catch (error) {
            console.error("Error fetching roles: ", error);
            throw error.response?.data?.errors || "Something went wrong";
        }
    },

    getRoleDropdown: async () => {
        try {
            return await api.get(`/roles/all`);
        } catch (error) {
            console.error("Error fetching roles: ", error);
            throw error.response?.data?.errors || "Something went wrong";
        }
    },

    getRoleById: async (id) => {
        try {
            return await api.get(`/roles/${id}`);
        } catch (error) {
            console.error("Error fetching roles: ", error);
        }
    },

    createRole: async (data) => {
        try {
            return await api.post("/roles", data);
        } catch (error) {
            console.error("Error creating roles: ", error);
        }
    },

    updateRole: async (id, data) => {
        try {
            return await api.put(`/roles/${id}`, data);
        } catch (error) {
            console.error("Error updating roles: ", error);
        }
    },

    deleteRole: async (id) => {
        try {
            return await api.delete(`/roles/${id}`);
        } catch (error) {
            console.error("Error deleting roles: ", error);
        }
    }
};

export default roleServices;
