import profilePicturePath from "../assets/images/default.svg";
import Button from "../Components/Button/Button.jsx";
import {useTranslation} from "react-i18next";
import {capitalize} from "../utils/helper.js";
import {useEffect, useState} from "react";
import userService from "../services/userServices.js";
import {useParams} from "react-router-dom";
import dayjs from "dayjs";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import reportServices from "../services/ReportServices.js";
import {UserGroupIcon} from "@heroicons/react/24/solid/index.js";
import utilServices from "../services/utilServices.js";


const UserDetail = () => {

    const [data, setData] = useState({});
    const {t} = useTranslation();
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [pieData, setPieData] = useState([])
    const [reportData, setReportData] = useState({})

    const isAdmin = utilServices.isAdmin();

    const getUserById = async (id) => {
        userService.getUserById(id).then((response) => {
            setData(response.data.payload);
        })
    }

    const getAttendanceReport = async (id) => {
        reportServices.getUserReport(id).then((response) => {
            const data = response.data.payload;
            setReportData(data);
            setPieData([
                { name: "On Time", value: data.onTime.value, color: "#4ADE80" },
                { name: "Late", value: data.late.value, color: "#FACC15" },
                { name: "Absent", value: data.absent.value, color: "#F87171" },
                { name: "Leave", value: data.leave.value, color: "#94A3B8" },
                { name: "Early Leave", value: data.earlyLeave.value, color: "#fa8b15" },
            ])
        })
    }

    useEffect(() => {

        try {
            getUserById(id);
            getAttendanceReport(id);
        } finally {
            setLoading(false);
        }
    }, [])

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-8">
                <div className="flex gap-6 items-center">
                    <img src={data.photo} className={"w-20 rounded-full"}/>
                    <div className="flex flex-col text-left gap-1">
                        <span className="font-bold text-xl">{data.name}</span>
                        <span className="text-lg">{data.role}</span>
                    </div>
                </div>
                <div>
                    {isAdmin && <Button text="Edit Profile" type={"link"} to={`/users/edit/${data.id}`}/>}
                </div>
            </div>

           <Wrapper header={capitalize(t("user.profileInformation"))}>
               <Item header={capitalize(t('user.employeeId'))} value={data.employeeId  || "-" } />
               <Item header={capitalize(t('user.fullName'))} value={data.name  || "-" } />
               <Item header={capitalize(t('user.birthDate'))} value={dayjs(data.birthDate*1000).format('DD-MM-YYYY')  || "-" } />
               <Item header={capitalize(t('user.gender'))} value={capitalize(t(data.gender))  || "-" } />
           </Wrapper>

            <Wrapper header={capitalize(t("user.workInformation"))}>
                <Item header={capitalize(t('user.department'))} value={data.department  || "-" } />
                <Item header={capitalize(t('user.role'))} value={data.role  || "-" } />
                <Item header={capitalize(t('shifts'))} value={data.shift  || "-" } />
                <Item header={capitalize(t('user.workLocation'))} value={data.location  || "-" } />
            </Wrapper>

            <Wrapper header={capitalize(t("user.contactInformation"))}>
                <Item header={capitalize(t('email'))} value={data.email  || "-" } />
                <Item header={capitalize(t('user.phoneNumber'))} value={data.phoneNumber  || "-" } />
                <Item header={capitalize(t('WhatsApp'))} value={data.whatsapp || "-" } />
                <Item header={capitalize(t('LinkedIn'))} value={data.linkedin || "-" }  />
                <Item header={capitalize(t('Telegram'))} value={data.telegram || "-" }  />
            </Wrapper>

            {/* data*/}

            {/*<div className="flex gap-4">*/}
            {/*    <div className="flex flex-col items-center p-4 bg-white justify-center rounded-xl w-[30%]">*/}
            {/*        <span className="font-semibold">Overview Chart</span>*/}
            {/*        <div className="h-[220px] w-full">*/}
            {/*            {pieData &&*/}
            {/*                <ResponsiveContainer>*/}
            {/*                    <PieChart>*/}
            {/*                        <Pie*/}
            {/*                            data={pieData}*/}
            {/*                            dataKey="value"*/}
            {/*                            cx="50%"*/}
            {/*                            cy="50%"*/}
            {/*                            outerRadius={80}*/}
            {/*                        >*/}
            {/*                            {pieData.map((entry, index) => (*/}
            {/*                                <Cell key={`cell-${index}`} fill={entry.color} />*/}
            {/*                            ))}*/}
            {/*                        </Pie>*/}
            {/*                        <Tooltip />*/}
            {/*                        <Legend iconSize={8} formatter={renderColorfulLegendText} />*/}
            {/*                    </PieChart>*/}
            {/*                </ResponsiveContainer>*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div className="grid grid-cols-3 gap-4 w-[80%] grid-rows-2">*/}
            {/*        <CardItems header={"On Time"} value={`${reportData?.onTime?.value} (${reportData?.onTime?.percentage}%)` || 0} color={"success"} className="col-span-2" />*/}
            {/*        <CardItems header={"Late"} value={`${reportData?.late?.value} (${reportData?.late?.percentage}%)` || 0} color={"success"} />*/}
            {/*        <CardItems header={"Absent"} value={`${reportData?.absent?.value} (${reportData?.absent?.percentage}%)` || 0} color={"success"} />*/}
            {/*        <CardItems header={"Leave"} value={`${reportData?.leave?.value} (${reportData?.leave?.percentage}%)` || 0} color={"success"} />*/}
            {/*        <CardItems header={"Early Leave"} value={`${reportData?.earlyLeave?.value} (${reportData?.earlyLeave?.percentage}%)` || 0} color={"success"}  />*/}

            {/*    </div>*/}

            {/*</div>*/}

        </div>
    )
}


const Wrapper = ({header, children}) => {
    return (
        <div className="w-full bg-white rounded-xl text-left p-4">
            <div className="border  border-primary/20 py-4 px-6 rounded-lg ">
                <h2 className="font-semibold mb-4 text-lg">{header}</h2>
                <div className="flex gap-10">
                    {children}
                </div>
            </div>
        </div>
    )
}


const Item = ({header, value}) => {
    return (
        <div className="space-y-1">
            <h3 className="text-sm">{header}</h3>
            <span className="font-semibold">{value}</span>
        </div>
    )
}



const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;
    return <span style={{ color }} className="text-xs mt-4">{value}</span>;
};



const CardItems = ({header, value, color = "white", className}) => {
    return (
        <div className={`px-5 py-5 bg-white rounded-xl flex flex-col border-l-3 border-${color} justify-evenly  ${className}`}>
            <p className={`text-left font-medium`}>{header}</p>
            <span className="text-left font-medium text-4xl">{value}</span>
        </div>
    )
}
export default UserDetail;