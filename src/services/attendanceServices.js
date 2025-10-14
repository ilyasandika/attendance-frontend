import api from "../utils/api.js";

const attendanceServices = {
    getAttendances: (page, search, date) => api.get("/attendances", { params: { page, search, date } }),
    checkInOut: (data) => api.post("/attendances/check", data),
    getAttendanceByLogin: (page, search) => api.get("/attendances/users", { params: { page, search } }),
    getAttendanceById: (id) => api.get(`/attendances/${id}`),
    getAttendanceSummary: (date) => api.get("/attendances/summary", { params: { date } }),
    getAttendanceTimeLine: (date, option) => api.get("/attendances/timeline", { params: { date, option } })
};

export default attendanceServices;