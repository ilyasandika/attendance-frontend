import AttendanceTable from "../Components/Tables/AttendanceTable.jsx";
import DashboardInfo from "./dashboard/DashboardInfo.jsx";
import utilServices from "../services/utilServices.js";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import dayjs from "dayjs";

const Dashboard = () => {
    const isAdmin = utilServices.isAdmin();
    const [searchParams, setSearchParams] = useSearchParams();
    const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
    useEffect(() => {
        setSearchParams({date: date});
    }, [date]);

    return (
        <>
            <div className="flex justify-end mb-4">
            <input
                type="date"
                defaultValue={date}
                className="p-2 text-right bg-white rounded-xl"
                onChange={(e) => setDate(e.target.value)}
            />
            </div>
            {isAdmin && <DashboardInfo />}
            <AttendanceTable />
        </>
    );
};

export default Dashboard;
