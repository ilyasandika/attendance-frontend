import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import attendanceServices from "../../services/attendanceServices.js";
import TextBox from "../../Components/Form/TextBox.jsx";
import Button from "../../Components/Button/Button.jsx";
import {capitalize, getStatusColor, timestampToObject} from "../../utils/helper.js";
import {useTranslation} from "react-i18next";

const AttendanceDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const {t} = useTranslation();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await attendanceServices.getAttendanceById(id);
                setData(response.data.payload);
            } catch (error) {
                console.error("Error fetching attendance detail:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);



    if (loading) return <div className="text-center mt-8">Loading attendance detail...</div>;
    if (!data) return <div className="text-center mt-8 text-red-600">Data not found.</div>;

    return (
        <div className="bg-white px-10 py-8 rounded-xl w-full max-w-6xl mx-auto">
            <h3 className="text-lg text-left font-semibold mb-4">{capitalize(t("attendanceDetail"))}</h3>
            <div className="grid grid-cols-2 space-x-8 text-left mt-5 border-t-2 border-gray-300 pt-5">
                <RenderSection
                    label="Check In"
                    time={data.checkInTime}
                    status={data.checkInStatus}
                    comment={data.checkInComment}
                    photoUrl={data.checkInPhoto}
                    address={data.checkInAddress}
                    outsideLocation={data.checkInOutsideLocation}
                />
                <RenderSection
                    label="Check Out"
                    time={data.checkOutTime}
                    status={data.checkOutStatus}
                    comment={data.checkOutComment}
                    photoUrl={data.checkOutPhoto}
                    address={data.checkOutAddress}
                    outsideLocation={data.checkOutOutsideLocation}
                />
            </div>

            <div className="flex justify-end mt-8">
                <Button text="Back" type="button" onClick={() => navigate(-1)} fill={false} />
            </div>
        </div>
    );
};

const formatDateTime = (timestamp, language = 'en-EN') => {
    if (!timestamp) return "-";
    const date = new Date(timestamp * 1000);
    return date.toLocaleString(language, {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
};

const RenderSection = ({ label, time, status, comment, photoUrl, address, outsideLocation }) => {

    const {t, i18n} = useTranslation();
    const timeData = time ? timestampToObject(time, i18n.language === "en-US" ? "en-EN" : "id-ID") : "-";
    return (
        <div className="flex flex-col gap-6 items-start">
            <h3 className="text-lg font-semibold">{label}</h3>
            <div className="flex flex-col gap-10 w-full items-center">
                <div className="flex flex-row w-full justify-between gap-8">
                    <img
                        src={
                            status === "Absent"
                                ? "https://placehold.co/400x300?text=Absent"
                                : photoUrl
                                    ? `${import.meta.env.VITE_API_URL}/storage/${photoUrl}`
                                    : "https://placehold.co/400x300?text=Not+Check+Yet"
                        }
                        alt={`${label} Photo`}
                        className="rounded-xl aspect-3/4 object-cover h-40"
                    />
                    <div className="w-full flex flex-col justify-between">
                        <TextBox label={capitalize(t("time"))} value={timeData.day ? `${timeData.day}, ${timeData.date} ${timeData.month} ${timeData.year}, ${timeData.time} ` : "-"} readOnly onlyBottom />
                        <TextBox label={capitalize(t("status"))} readOnly onlyBottom> {time ? (<p className={`inline-block font-bold px-4 py-2 rounded-lg ${getStatusColor(status, true)}`}>{capitalize(t(status))}</p> || "-") : "-"} </TextBox>
                    </div>
                   </div>

                <div className="flex flex-col gap-6 w-full text-sm">
                    <TextBox label={capitalize(t("comment"))} value={time ? (comment || "-") : "-"} readOnly onlyBottom />
                    <TextBox label={capitalize(t("address"))} value={time ? (address || "-") : "-"} readOnly onlyBottom />
                    <div className="flex gap-4 items-center w-full">
                        <span className="font-semibold"> {capitalize(t("validLocation"))}</span>
                        <p className={`inline-block font-bold px-4 py-2 rounded-lg ${getStatusColor(String(time ? !outsideLocation : "-"), true)}`}>
                            {time ? (!outsideLocation ? capitalize(t("yes")) : capitalize(t("no"))) : "-"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AttendanceDetailPage;
