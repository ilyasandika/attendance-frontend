import api from "../utils/api.js";

const shiftService = {
    getShiftDropdown: () => {
        try {
            return api.get("/schedules/shifts/all");
        } catch (error) {
            console.error("error fetching shift".error);
            throw error.response?.data?.message;
        }
    },
};

export default shiftService;
