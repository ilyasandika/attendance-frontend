import api from "../utils/api.js";

const locationService = {
    getLocationList: (page, search) => {
        try {
            return api.get("/schedules/locations", {
                params: {
                    page,
                    search,
                },
            });
        } catch (error) {
            console.error("Error fetching locations".error);
            throw error.response?.data?.message;
        }
    },
    getLocationDropdown: () => {
        try {
            return api.get("/schedules/locations/all");
        } catch (error) {
            console.error("Error fetching locations".error);
            throw error.response?.data?.message;
        }
    },
};

export default locationService;
