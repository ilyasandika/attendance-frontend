import api from "../utils/api.js";

const roleService = {
    getRoles: async () => {
        try {
            return api.get("/roles");
        } catch (error) {
            console.error("Error fetching departments: ", error);
            throw error.response?.data?.message || "Something went wrong";
        }
    },
};

export default roleService;
