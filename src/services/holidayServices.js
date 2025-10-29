import api from "../utils/api.js";

const holidayServices = {
    getHolidays: async(page, search, rows) => await api.get(`/schedules/holidays`, {params : {page, search, rows}}),
    getHolidayById: async(id) => await api.get(`/schedules/holidays/${id}`),
    deleteHoliday: async (id) =>  await api.delete(`/schedules/holidays/${id}`),
    createHoliday: async (data) => await api.post("/schedules/holidays", data),
    updateHoliday: async (id, data) => await api.put(`/schedules/holidays/${id}`, data)
};

export default holidayServices;
