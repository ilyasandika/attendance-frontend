import AttendanceTable from "../Components/Tables/AttendanceTable.jsx";
import DashboardInfo from "./dashboard/DashboardInfo.jsx";
import utilServices from "../services/utilServices.js";
import {useState} from "react";

const Dashboard = () => {
    const isAdmin = utilServices.isAdmin();


    return (
        <>


            {isAdmin && <DashboardInfo />}
            <AttendanceTable />
        </>
    );
};

export default Dashboard;
