import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "../DataTable/DataTable.jsx";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const UserTable = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || null;

    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setSearchParams({ page: newPage.toString() });
        }
    };

    const fetchUsers = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return console.error("No token found");

            const response = await axios.get(`http://localhost:8000/api/users?page=${currentPage}&search=${search}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUsers(response.data.payload.users);
            setTotalPages(response.data.payload.meta.lastPage || 1);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }, [currentPage, search]);

    //first mount
    useEffect(() => {
        if (!currentPage) {
            navigate("/users?page=1", { replace: true });
        }

        if (search) {
            navigate(`/users?page=${currentPage}&search=${search}`, { replace: true });
        }

        const getUsers = setTimeout(() => {
            fetchUsers();
        }, 300);
        return () => clearTimeout(getUsers);
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
                key: "dateCreated",
                label: "Date Created",
                render: (val) => new Date(val * 1000).toLocaleString("id-ID"),
            },
            {
                key: "accountStatus",
                label: "Account Status",
                render: (val) => (val === 1 ? "Active" : "Inactive"),
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

    const header = {
        title: "User List",
        button: {
            link: "/",
            text: "Add User",
        },
    };

    const pagination = {
        setSearch,
        setTotalPages,
        handlePageChange,
        search,
        totalPages,
        currentPage,
    };

    return (
        <>
            <DataTable header={header} columns={columns} items={users} pagination={pagination} />
        </>
    );
};

export default UserTable;
