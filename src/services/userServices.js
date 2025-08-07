import api from "../utils/api.js";

const userServices = {
    getCurrent: async () => {
        try {
            return await api.get("/users/current");

        } catch (error) {
            console.error("Error fetching current user: ", error);
            throw error.response?.data?.errors || "Something went wrong";
        }
    },

    getUsers: async (page, search) => {
        try {
            return await api.get("/users", {
                params: { page, search },
            });

        } catch (error) {
            console.error("Error fetching users: ", error);
            throw error.response?.data?.errors || "Something went wrong";
        }
    },

    createUser: async (data) => {
        try {
            return await api.post("/users", data);
        } catch (error) {
            throw error.response || "Something went wrong";
        }
    },

    updateUser: async (data) => {
        try {
            console.log(data)
            return await api.post(`/users/${data.id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

        } catch (error) {
            console.error("Error update user: ", error);
            throw error.response || "Something went wrong";
        }
    },

    getUserById: async (id) => {
        try {
            return await api.get(`/users/${id}`);

        } catch (error) {
            console.error("Error find user: ".Error);
            throw error.response?.data?.errors;
        }
    },

    deleteUser: async (id) => {
        try {
            return await api.delete(`/users/${id}`);

        } catch (error) {
            console.error("Error delete user: ", error);
            throw error.response?.data?.errors || "Something went wrong";
        }
    },


};

export default userServices;
