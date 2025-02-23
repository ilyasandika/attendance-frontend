import { useEffect, useState } from "react";
import axios from "axios";

const AttendanceTable = () => {
    const [attendances, setAttendances] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return console.error("No token found");

            const response = await axios.get(`http://localhost:8000/api/attendances?page=${currentPage}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = response.data.data[0];
            setAttendances(data.data);
            setTotalPages(data.last_page);
        } catch (error) {
            console.error("Error fetching attendance data:", error);
        }
    };

    return (
        <div className="bg-white p-10 rounded-xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Attendance Overview</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded-lg px-3 py-1"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="bg-primary text-white px-4 py-2 rounded-lg">View Attendance</button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-y border-primary/40 rounded">
                    <thead className="bg-white text-left">
                        <tr>
                            <th className="py-2 px-4 border-y border-primary/40">ID</th>
                            <th className="py-2 px-4 border-y border-primary/40">Name</th>
                            <th className="py-2 px-4 border-y border-primary/40">
                                Role/<br></br>Department
                            </th>
                            <th className="py-2 px-4 border-y border-primary/40">Date</th>
                            <th className="py-2 px-4 border-y border-primary/40">Status</th>
                            <th className="py-2 px-4 border-y border-primary/40">Check-in</th>
                            <th className="py-2 px-4 border-y border-primary/40">Check-out</th>
                            <th className="py-2 px-4 border-y border-primary/40">Work Hours</th>
                        </tr>
                    </thead>
                    <tbody className="text-left text-sm">
                        {attendances.map((record) => (
                            <tr key={record.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-t border-primary/10">{record.user.employee_id}</td>
                                <td className="py-2 px-4 border-t border-primary/10">{record.user.profile.name}</td>
                                <td className="py-2 px-4 border-t border-primary/10 flex flex-col">
                                    <span className="font-semibold">{record.user.profile.role.name}</span>
                                    <span>{record.user.profile.department.name}</span>
                                </td>
                                <td className="py-2 px-4 border-t border-primary/10">
                                    {new Date(record.date * 1000).toLocaleDateString("id-ID", { hours12: false })}
                                </td>
                                <td className="py-2 px-4 border-t border-primary/10">
                                    {record.check_out_time ? record.check_out_status : record.check_in_status}
                                </td>
                                <td className="py-2 px-4 border-t border-primary/10">
                                    {new Date(record.check_in_time * 1000).toLocaleTimeString("id-ID", { hours12: false })}
                                </td>
                                <td className="py-2 px-4 border-t border-primary/10">
                                    {record.check_out_time
                                        ? new Date(record.check_out_time * 1000).toLocaleTimeString("id-ID", { hours12: false })
                                        : "-"}
                                </td>
                                <td className="py-2 px-4 border-t border-primary/10">
                                    {record.check_out_time ? ((record.check_out_time - record.check_in_time) / 3600).toFixed(2) + " hrs" : "-"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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

export default AttendanceTable;
