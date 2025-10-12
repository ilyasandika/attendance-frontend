import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { enUS, id } from "date-fns/locale";
import {useTranslation} from "react-i18next";
import {capitalize} from "../../utils/helper.js";
import userServices from "../../services/userServices.js";

const RecentUserCard = () => {
    const {t} = useTranslation();
    const [recentUsers, setRecentUsers] = useState([]);

    useEffect(() => {
        fetchRecentUsers();
    }, []);

    const fetchRecentUsers = async () => {
        await userServices.getRecentUserRegistered()
            .then(res => {
                setRecentUsers(res.data.payload)
            })
            .catch(err => {
                console.error(err)
            })
    };

    return (
        <div className="bg-white p-8 rounded-xl w-full max-w-md">
            <h3 className="text-md font-semibold mb-3 text-left">{capitalize(t("user.recent"))}</h3>
            <hr className="text-primary/20" />
            <div className="space-y-6 mt-4">
                {recentUsers.map((user) => (
                    <div key={user.id} className="flex justify-between text-sm items-center">
                        <div className="flex flex-col text-left">
                            <span className="font-medium text-base">{user.employeeName}</span>
                            <span className="text-sm">{user.employeeId}</span>
                        </div>
                        <span className="text-gray-500">
                            {formatDistanceToNow(new Date(user.createdAt * 1000), { addSuffix: true, locale: import.meta.env.VITE_LOCALE === "id" ? id : enUS })}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentUserCard;
