import api from "../utils/api.js";

const departmentServices = {
    getDepartments: async (page, search) => {
        try {
            return await api.get(`/departments?page=${page}&search=${search}`);
        } catch (error) {
            console.error("Error fetching departments: ", error);
            throw error.response?.data?.errors || "Something went wrong";
        }
    },

    getDepartmentsDropdown: async () => {
        try {
            return await api.get(`/departments/all`);
        } catch (error) {
            console.error("Error fetching departments: ", error);
            throw error.response?.data?.errors || "Something went wrong";
        }
    },

    getDepartmentById: async (id) => {
        try {
            return await api.get(`/departments/${id}`);
        } catch (error) {
            console.error("Error fetching departments: ", error);
        }
    },

    createDepartment: async (data) => {
        try {
            return await api.post("/departments", data);
        } catch (error) {
            console.error("Error creating departments: ", error);
        }
    },

    updateDepartment: async (id, data) => {
        try {
            return await api.put(`/departments/${id}`, data);
        } catch (error) {
            console.error("Error updating departments: ", error);
        }
    },

    deleteDepartment: async (id) => {
        try {
            return await api.delete(`/departments/${id}`);
        } catch (error) {
            console.error("Error deleting departments: ", error);
        }
    }


};

export default departmentServices;
