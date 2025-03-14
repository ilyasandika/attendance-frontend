import api from "../utils/api.js";

const departmentService = {
    getDepartments: async () => {
        try {
            return await api.get("/departments");
        } catch (error) {
            console.error("Error fetching departments: ", error);
            throw error.response?.data?.message || "Something went wrong";
        }
    },
};

export default departmentService;
