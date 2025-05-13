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

    createUser: async (data) => {
        try {
            const response = await api.post("/users", data);
            return response;
        } catch (error) {
            console.error("Error creating user: ", error);
            throw error.response?.data?.message || "Something went wrong";
        }
    },

    updateUser: async (data) => {
        try {
            console.log(data);
            const response = await api.post(`/users/${data.id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response;
        } catch (error) {
            console.error("Error updating user: ", error);
            throw error.response?.data?.message || "Something went wrong";
        }
    },

    getUserById: async (id) => {
        try {
            const response = await api.get(`/users/${id}`);
            return response;
        } catch (error) {
            console.error("Error find user: ".Error);
            throw error.response?.data?.message;
        }
    },

    deleteUser: async (id) => {
        try {
            const response = await api.delete(`/users/${id}`);
            return response;
        } catch (error) {
            console.error("Error delete user: ", error);
            throw error.response?.data?.message || "Something went wrong";
        }
    },
};

export default userService;
