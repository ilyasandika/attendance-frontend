import api from "../utils/api.js";
import dayjs from "dayjs";


const reportServices = {
    getUserReport : (id, month = dayjs().month + 1, year = dayjs().year()) => {
        const startDate = dayjs(`${year}-${month}-01`).startOf("month").unix();
        const endDate = dayjs(`${year}-${month}-01`).endOf("month").unix();

        return api.get(`/reports/${id}`, {
            params : {
                startDate,
                endDate
            }
        })
    },

    getUserReportByYear : (id, year = dayjs().year()) =>  api.get(`/reports/${id}/${year}`),
    getAvailableReportYear : (id = null)  =>  api.get(`/reports/years`, {
        params : {
            id
        }
    }),

    getUserReportExcel: async (id, month = dayjs().month() + 1, year = dayjs().year()) => {
        const paddedMonth = month.toString().padStart(2, "0");
        const startDate = dayjs(`${year}-${paddedMonth}-01`).startOf("month").format("DD-MM-YYYY");
        const endDate = dayjs(`${year}-${paddedMonth}-01`).endOf("month").format("DD-MM-YYYY");

        const response = await api.get(`reports/attendance/user/${id}/download`, {
            params: { start_date: startDate, end_date: endDate },
            responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `attendance_${id}_${month}_${year}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(url);
    },



}


export default reportServices;