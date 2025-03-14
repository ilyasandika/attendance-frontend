import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const UserOverview = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetchUserStats();
    }, []);

    const fetchUserStats = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return console.error("No token found");

            const response = await axios.get("http://localhost:8000/api/users/overview", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setChartData(response.data.payload);
        } catch (error) {
            console.error("Error fetching user statistics:", error);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl w-full">
            <h3 className="text-md font-semibold mb-3 text-left">User Statistics by Department</h3>
            <hr className="text-primary/20" />
            <div className="mt-4">
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={chartData} barSize={50}>
                        <XAxis dataKey="departmentName" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="totalUser" fill="#273240" radius={[5, 5, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default UserOverview;
