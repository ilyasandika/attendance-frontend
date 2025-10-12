import api from "../utils/api.js";

const leaveServices = {
    getLeaves: (page, search, status) => api.get("/leaves", { params: { page, search, status } }),
    getLeaveById: (id) => api.get(`/leaves/${id}`),
    getLeavesByUserId: (page, search, status, userId) => api.get(`/leaves/user/${userId}`, { params: { page, search, status } }),
    createLeave: (data) => api.post("/leaves", data),
    updateLeave: (id, data) => api.post(`/leaves/${id}`, data),
    deleteLeave: (id) => api.delete(`/leaves/${id}`),
    approveLeave: (id) => api.post(`/leaves/${id}/approve`),
    rejectLeave: (id, comment) => api.post(`/leaves/${id}/reject`, { comment }),
};


export default leaveServices;
