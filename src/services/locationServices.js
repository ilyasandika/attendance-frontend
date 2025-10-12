import api from "../utils/api.js";

const locationServices = {
    getLocationList: (page, search) =>api.get("/locations", {
        params: {
            page,
            search,
        },
    }),
    getLocationDropdown: () => api.get("/locations/all"),

    getLocationById: (id) => api.get(`/locations/${id}`),

    createLocation: (data) => api.post("/locations", data),

    deleteLocation: (id) =>  api.delete(`/locations/${id}`),

    updateLocation: (id, data) =>api.put(`/locations/${id}`, data),
};

export default locationServices;
