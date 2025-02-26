import { useEffect, useState } from "react";
import axios from "axios";
import edit from "../assets/icons/edit.svg";
import trash from "../assets/icons/trash.svg";
import { Link } from "react-router-dom";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers();
    }, [currentPage, search]);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return console.error("No token found");

            const response = await axios.get(`http://localhost:8000/api/users?page=${currentPage}&search=${search}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUsers(response.data.data);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <div className="bg-white p-10 rounded-xl">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">User List</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded-lg px-3 py-1"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Link to="/create-user" className="bg-primary text-white px-4 py-2 rounded-lg">
                        Add User
                    </Link>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full border-y border-primary/40 rounded">
                    <thead className="bg-white text-left">
                        <tr>
                            <th className="py-2 px-4 border-y border-primary/40">ID</th>
                            <th className="py-2 px-4 border-y border-primary/40">Name</th>
                            <th className="py-2 px-4 border-y border-primary/40">
                                Role/
                                <br />
                                Department
                            </th>
                            <th className="py-2 px-4 border-y border-primary/40">Date Created</th>
                            <th className="py-2 px-4 border-y border-primary/40">Email</th>
                            <th className="py-2 px-4 border-y border-primary/40">Account Status</th>
                            <th className="py-2 px-4 border-y border-primary/40">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-left text-sm">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-t border-primary/10">{user.employeeId}</td>
                                <td className="py-2 px-4 border-t border-primary/10">{user.employeeName}</td>
                                <td className="py-2 px-4 border-t border-primary/10 flex flex-col">
                                    <span className="font-semibold">{user.employeeRole}</span>
                                    <span>{user.employeeDepartment}</span>
                                </td>
                                <td className="py-2 px-4 border-t border-primary/10">
                                    {new Date(user.dateCreated * 1000).toLocaleDateString("id-ID")}
                                </td>
                                <td className="py-2 px-4 border-t border-primary/10">{user.employeeEmail}</td>
                                <td className="py-2 px-4 border-t border-primary/10">{user.accountStatus === 1 ? "Active" : "Inactive"}</td>
                                <td className="py-2 px-4 border-t border-primary/10">
                                    <button className="mr-6 cursor-pointer">
                                        <img src={edit} className="w-4" />
                                    </button>
                                    <button className="cursor-pointer">
                                        <img src={trash} className="w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="px-4 py-1 border rounded disabled:opacity-50">
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="px-4 py-1 border rounded disabled:opacity-50">
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserTable;
