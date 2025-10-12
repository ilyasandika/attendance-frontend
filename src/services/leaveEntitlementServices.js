import api from "../utils/api.js";

const leaveEntitlementServices = {
    getLeaveEntitlements: (page, search) => api.get("/leave-entitlements", {params: {page: page, search: search}})
}

export default leaveEntitlementServices;