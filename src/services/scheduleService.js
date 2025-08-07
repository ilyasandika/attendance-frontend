import api from "../utils/api.js";

const scheduleServices = {
    getSchedules: (page, search) => {
        try {
            return api.get("/schedules", {
                params: {
                    page,
                    search,
                },
            });
        } catch (error) {   
            console.error("Error fetching locations".error);
            throw error.response?.data?.errors;
        }
    },
};

export default scheduleServices;
