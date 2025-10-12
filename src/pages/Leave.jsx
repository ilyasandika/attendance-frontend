import LeaveTable from "../Components/Tables/LeaveTable.jsx";
import LeaveEntitlementTable from "../Components/Tables/LeaveEntitlementTable.jsx";
import utilServices from "../services/utilServices.js";

const Leave = () => {
    const isAdmin = utilServices.isAdmin();
    return (
        <div className={ "flex flex-col gap-6"}>
            <LeaveTable />
            {isAdmin && <LeaveEntitlementTable/>}
        </div>
    )
}

export default Leave;