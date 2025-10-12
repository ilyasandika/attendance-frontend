import api from "../utils/api.js";

const userServices = {
    getCurrent: async () => await api.get("/users/current"),
    getUsers: async (page, search, all = "") => api.get("/users",{ params: { page, search, all }}),
    createUser: async (data) => await api.post("/users", data),
    updateUser: async (data) => await api.post(`/users/${data.id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }),
    getUserById: async (id) => api.get(`/users/${id}`),
    deleteUser: async (id) =>  await api.delete(`/users/${id}`),
    getTotalUserByDepartment : async () => await api.get(`/users/department`),
    getRecentUserRegistered : async () => await api.get(`/users/recent`),



};

export default userServices;
