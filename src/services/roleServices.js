import api from "../utils/api.js";

const roleServices = {
    getRoles: async (page, search, rows) => await api.get(`/roles`, { params : { page, search, rows } }),

    getRoleDropdown: async () => await api.get(`/roles/all`),

    getRoleById: async (id) => await api.get(`/roles/${id}`),

    createRole: async (data) => await api.post("/roles", data),

    updateRole: async (id, data) => await api.put(`/roles/${id}`, data),

    deleteRole: async (id) => await api.delete(`/roles/${id}`),
};

export default roleServices;
