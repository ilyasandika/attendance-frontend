import api from "../utils/api.js";

const locationServices = {
    getLocationList: (page, search) => {
        try {
            return api.get("/locations", {
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
    getLocationDropdown: () => {
        try {
            return api.get("/locations/all");
        } catch (error) {
            console.error("Error fetching locations".error);
            throw error.response?.data?.errors;
        }
    },

    getLocationById: (id) => {
        try {
            return api.get(`/locations/${id}`);
        } catch (error) {
            console.error("Error fetching locations".error);
            throw error.response?.data?.errors;
        }
    },

    createLocation: (data) => {
        try {
            return api.post("/locations", data);
        } catch (error) {
            console.error("Error creating locations".error);
            throw error.response?.data?.errors;
        }
    },

    deleteLocation: (id) => {
        try {
            return api.delete(`/locations/${id}`);
        } catch (error) {
            console.error("Error delete locations".error);
            throw error.response?.data?.errors;
        }
    },

    updateLocation: (id, data) => {
        try {
            return api.put(`/locations/${id}`, data);
        } catch (error) {
            console.error("Error update locations".error);
            throw error.response?.data?.errors;
        }
    },
};

export default locationServices;
