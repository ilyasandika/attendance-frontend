import axios from "axios";
import { useEffect, useState } from "react";

const Header = () => {
    const [user, setUser] = useState(null);
    const [serverTime, setServerTime] = useState({
        day: "",
        datetime: new Date(),
    });

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return console.error("No token found");

                const [userResponse, serverTimeResponse] = await Promise.all([
                    axios.get("http://localhost:8000/api/users/current", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://localhost:8000/api/server-time"),
                ]);

                setUser(userResponse.data.payload);
                setServerTime({
                    day: serverTimeResponse.data.day,
                    datetime: new Date(serverTimeResponse.data.datetime),
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllData();

        // Update waktu di frontend setiap detik tanpa nge-hit API terus
        const interval = setInterval(() => {
            setServerTime((prevTime) => ({
                ...prevTime,
                datetime: new Date(prevTime.datetime.getTime() + 1000),
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatDateTime = (date) => {
        const options = {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        };
        return date.toLocaleDateString("en-UK", options).replace(",", "");
    };

    return (
        <header className="z-50 bg-white px-10 py-10 fixed left-64 top-0 right-0 h-16 flex items-center justify-between">
            <h1 className="font-semibold">{serverTime.day ? `${formatDateTime(serverTime.datetime)}` : "Loading data ..."}</h1>

            <div className="flex items-center gap-6">
                {user ? (
                    <div className="flex flex-col text-right">
                        <span className="font-bold">{user.employeeName}</span>
                        <span>{user.employeeRole}</span>
                    </div>
                ) : (
                    <span>Loading user data...</span>
                )}
                {user ? (
                    <img src={`${import.meta.env.VITE_API_URL}/storage/${user.profilePicturePath}`} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                    <img src="/images/default.svg" className="w-10 rounded-full" />
                )}
            </div>
        </header>
    );
};

export default Header;
