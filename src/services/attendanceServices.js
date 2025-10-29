import api from "../utils/api.js";

const attendanceServices = {
    getAttendances: (page, search, date, rows) => api.get("/attendances", { params: { page, search, date, rows } }),
    checkInOut: (data) => api.post("/attendances/check", data),
    getAttendanceByLogin: (page, search, rows) => api.get("/attendances/users", { params: { page, search, rows } }),
    getAttendanceById: (id) => api.get(`/attendances/${id}`),
    getAttendanceSummary: (date) => api.get("/attendances/summary", { params: { date } }),
    getAttendanceTimeLine: (date, option) => api.get("/attendances/timeline", { params: { date, option } })
};

export default attendanceServices;