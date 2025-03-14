import { useCallback, useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable.jsx";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { updateSearchParams } from "../../utils/helper.js";
import userService from "../../services/userService.js";

const UserTable = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState(searchParams.get("search") || "");

    const currentPage = Number(searchParams.get("page")) || 1;

    const fetchUsers = useCallback(async () => {
        try {
            const response = await userService.getUsers(currentPage, search);

            setUsers(response.data.payload.users);
            setTotalPages(response.data.payload.meta.lastPage || 1);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, search]);

    //first mount
    useEffect(() => {
        if (!searchParams.get("page")) {
            setSearchParams((prevParams) => {
                prevParams.set("page", 1);
            });
        }
        const getUsers = setTimeout(() => {
            setIsLoading(true);
            fetchUsers();
        }, 500);
        return () => clearTimeout(getUsers);
    }, [currentPage, search]);

    useEffect(() => {
        updateSearchParams(setSearchParams, currentPage, search);
    }, [search]);

    const columns = [
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
            key: "employeeEmail",
            label: "Email",
        },
        {
            key: "dateCreated",
            label: "Date Created",
            render: (val) => new Date(val * 1000).toLocaleString("id-ID"),
        },
        {
            key: "accountStatus",
            label: "Account Status",
            render: (val) =>
                val === 1 ? (
                    <span className="bg-green-400/10 px-4 py-2 rounded-lg text-green-400 font-bold">Active</span>
                ) : (
                    <span className="bg-gray-400/10 px-4 py-2 rounded-lg text-gray-400 font-bold">Inactive</span>
                ),
        },
        {
            key: "id",
            label: "Action",
            render: (_, row) => (
                <div className="flex">
                    <Link to="/users/add" className="mr-6 cursor-pointer">
                        <img src={edit} className="w-4" />
                    </Link>
                    <button className="cursor-pointer">
                        <img src={trash} className="w-4" />
                    </button>
                </div>
            ),
        },
    ];

    const header = {
        title: "User List",
        button: {
            link: "/",
            text: "Add User",
        },
    };

    const pagination = {
        setSearch,
        setSearchParams,
        search,
        searchParams,
        totalPages,
        currentPage,
    };

    return (
        <>
            <DataTable header={header} columns={columns} items={users} pagination={pagination} isLoading={isLoading} />
        </>
    );
};

export default UserTable;
