import api from "../utils/api.js";

const userService = {
    getUsers: async (page, search) => {
        try {
            const response = await api.get("/users", {
                params: { page, search },
            });
            return response;
        } catch (error) {
            console.error("Error fetching users: ", error);
            throw error.response?.data?.message || "Something went wrong";
        }
    },
};

export default userService;
