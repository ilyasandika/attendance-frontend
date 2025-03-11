import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "../DataTable/DataTable.jsx";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import { Link } from "react-router-dom";
import axios from "axios";

const LocationTable = () => {
    const [locations, setLocations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getLocations = setTimeout(() => {
            fetchLocations();
        }, 300);
        return () => clearTimeout(getLocations);
    }, [currentPage, search]);

    const fetchLocations = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return console.error("No token found");

            const response = await axios.get(`http://localhost:8000/api/schedules/locations?page=${currentPage}&search=${search}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setLocations(response.data.data);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    }, [currentPage, search]);

    const columns = useMemo(
        () => [
            {
                key: "name",
                label: "Location Name",
                render: (val) => <span className="font-bold">{val}</span>,
            },
            {
                key: "latitude",
                label: "Office Latitude",
            },
            {
                key: "longitude",
                label: "Office Longitude",
            },
            {
                key: "radius",
                label: "Radius",
                render: (val) => `${val} meter`,
            },
            {
                key: "address",
                label: "Address",
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
        title: "Location List",
        button: {
            link: "/",
            text: "Add Location",
        },
        setSearch,
        setTotalPages,
        setCurrentPage,
        search,
        totalPages,
        currentPage,
    };

    return <>{<DataTable header={header} columns={columns} items={locations} />}</>;
};

export default LocationTable;
