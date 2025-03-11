import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "../DataTable/DataTable.jsx";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import { Link } from "react-router-dom";
import axios from "axios";

const ScheduleTable = () => {
    const [schedules, setSchedules] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getSchedules = setTimeout(() => {
            fetchSchedules();
        }, 300);
        return () => clearTimeout(getSchedules);
    }, [currentPage, search]);

    const fetchSchedules = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return console.error("No token found");

            const response = await axios.get(`http://localhost:8000/api/schedules?page=${currentPage}&search=${search}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setSchedules(response.data.data.data);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error("Error fetching schedules:", error);
        }
    }, [currentPage, search]);

    const columns = useMemo(
        () => [
            {
                key: "employeeId",
                label: "ID",
            },
            {
                key: "employeeName",
                label: "Name",
            },
            {
                key: "employeeRole",
                label: (
                    <>
                        Role/ <br />
                        Department
                    </>
                ),
                render: (_, row) => (
                    <div className="flex flex-col">
                        <span className="font-semibold">{row.employeeRole}</span>
                        <span className="text-sm text-gray-500">{row.employeeDepartment}</span>
                    </div>
                ),
            },
            {
                key: "employeeShift",
                label: "Shift",
            },
            {
                key: "employeeWorkLocation",
                label: "Location",
            },
            {
                key: "action",
                label: "Action",
                render: (_, row) => (
                    <div className="flex">
                        <button className="mr-6 cursor-pointer">
                            <img src={edit} className="w-4" />
                        </button>
                        <button className="cursor-pointer">
                            <img src={trash} className="w-4" />
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    let header = {
        title: "Schedule List",
        button: {
            link: "/",
            text: "Add User",
        },
        setSearch,
        setTotalPages,
        setCurrentPage,
        search,
        totalPages,
        currentPage,
    };

    return (
        <>
            <DataTable header={header} columns={columns} items={schedules} />
        </>
    );
};

export default ScheduleTable;
