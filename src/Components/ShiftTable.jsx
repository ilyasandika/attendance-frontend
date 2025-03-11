import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "./DataTable/DataTable.jsx";
import edit from "../assets/icons/edit.svg";
import trash from "../assets/icons/trash.svg";
import { Link } from "react-router-dom";
import axios from "axios";

const ShiftTable = () => {
    const [shifts, setShifts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getShifts = setTimeout(() => {
            fetchShifts();
        }, 300);
        return () => clearTimeout(getShifts);
    }, [currentPage, search]);

    const fetchShifts = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return console.error("No token found");

            const response = await axios.get(`http://localhost:8000/api/schedules/shifts?page=${currentPage}&search=${search}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setShifts(response.data.data.data);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error("Error fetching shifts:", error);
        }
    }, [currentPage, search]);

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    const columns = useMemo(
        () => [
            {
                key: "shiftName",
                label: "Shift Name",
                render: (val) => <span className="font-bold">{val}</span>,
            },
            ...days.map((day) => ({
                key: day,
                label: day.charAt(0).toUpperCase() + day.slice(1),
                render: (_, row) =>
                    row[day]?.isOff ? (
                        <span className="text-red-700 font-bold">Days Off</span>
                    ) : (
                        <div className="flex flex-col">
                            <span className="font-semibold">
                                {row[day]?.in.substring(0, 5)} - {row[day]?.out.substring(0, 5)}
                            </span>
                            <span className="text-xs text-gray-500">
                                B : {row[day]?.breakStart.substring(0, 5)} - {row[day]?.breakEnd.substring(0, 5)}
                            </span>
                        </div>
                    ),
            })),
        ],
        []
    );

    let header = {
        title: "Shift List",
        button: {
            link: "/",
            text: "Add Shift",
        },
        setSearch,
        setTotalPages,
        setCurrentPage,
        search,
        totalPages,
        currentPage,
    };

    return <>{<DataTable header={header} columns={columns} items={shifts} />}</>;
};

export default ShiftTable;
