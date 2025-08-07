import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userServices from "../../services/userServices.js";
import utilServices from "../../services/utilServices.js";
import AuthServices from "../../services/AuthServices.js";
import profilePicturePath from "../../assets/images/default.svg";
import ProfileModal from "../../Modal/ProfileModal.jsx";

const Header = () => {
    const [user, setUser] = useState({});
    const [serverTime, setServerTime] = useState({
        day: "",
        datetime: new Date(),
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const userResponse = await userServices.getCurrent();
                const serverTimeResponse = await utilServices.getServerTime();
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

    const handleLogout = async () => {
        try {
            await AuthServices.logout();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const handleEditProfile = () => {
        navigate("/profile/edit");
        setIsModalOpen(false);
    };

    return (
        <header className="z-50 bg-white px-10 py-10 fixed left-64 top-0 right-0 h-16 flex items-center justify-between">
            <h1 className="font-semibold">
                {serverTime.day ? `${formatDateTime(serverTime.datetime)}` : "Loading data ..."}
            </h1>

            <div className="relative">
                <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => setIsModalOpen((prev) => !prev)}
                >
                    {user ? (
                        <div className="flex flex-col text-right">
                            <span className="font-bold">{user.name}</span>
                            <span>{user.role}</span>
                        </div>
                    ) : (
                        <span>Loading user data...</span>
                    )}
                    <img
                        src={
                            user.photo
                                ? `${import.meta.env.VITE_API_URL}/storage/${user.photo}`
                                : profilePicturePath
                        }
                        className="w-12 h-12 rounded-full object-cover"
                        alt="Profile"
                    />
                </div>

                {isModalOpen && (
                    <ProfileModal
                        onClose={() => setIsModalOpen(false)}
                        onLogout={handleLogout}
                        onEdit={handleEditProfile}
                    />
                )}
            </div>
        </header>
    );
};

export default Header;
