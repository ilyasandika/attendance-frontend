import api from "../utils/api.js";

const shiftServices = {
    getShiftDropdown: () => api.get("/shifts/all"),

    getShifts: async (page, search, rows) =>  await api.get("/shifts", {
        params: { page, search, rows },
    }),

    getShiftById: async (id) => await api.get(`/shifts/${id}`),

    createShift: async (data) => await api.post("/shifts", data),

    updateShift: async (id, data) =>  await api.put(`/shifts/${id}`, data),

    deleteShift: async (id) => await api.delete(`/shifts/${id}`),
};

export default shiftServices;
