import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

const RecentUserCard = () => {
    const [recentUsers, setRecentUsers] = useState([]);

    useEffect(() => {
        fetchRecentUsers();
    }, []);

    const fetchRecentUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return console.error("No token found");

            const response = await axios.get("http://localhost:8000/api/users/recent", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRecentUsers(response.data.payload);
        } catch (error) {
            console.error("Error fetching recent users:", error);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl w-full max-w-md">
            <h3 className="text-md font-semibold mb-3 text-left">Recent User Registration</h3>
            <hr className="text-primary/20" />
            <div className="space-y-6 mt-4">
                {recentUsers.map((user) => (
                    <div key={user.id} className="flex justify-between text-sm items-center">
                        <div className="flex flex-col text-left">
                            <span className="font-medium text-base">{user.employeeName}</span>
                            <span className="text-sm">{user.employeeId}</span>
                        </div>
                        <span className="text-gray-500">
                            {formatDistanceToNow(new Date(user.createdAt * 1000), { addSuffix: true, locale: enUS })}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentUserCard;
