import api from "../utils/api.js";

const leaveEntitlementServices = {
    getLeaveEntitlements: (page, search, rows) => api.get("/leave-entitlements", {params: {page, search, rows}})
}

export default leaveEntitlementServices;