import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import {useTranslation} from "react-i18next";
import userServices from "../../services/userServices.js";

const UserOverview = () => {
    const {t} = useTranslation();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetchUserStats();
    }, []);

    const fetchUserStats = async () => {
        try {
            const response = await userServices.getTotalUserByDepartment()
            setChartData(response.data.payload);
        } catch (error) {
            console.error("Error fetching user statistics:", error);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl w-full">
        <h3 className="text-md font-semibold mb-3 text-left">{t('user.statisticByDepartment')}</h3>
            <hr className="text-primary/20" />
            <div className="mt-4">
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={chartData} barSize={50}>
                        <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
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
