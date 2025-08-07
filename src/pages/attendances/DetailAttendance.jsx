import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import attendanceServices from "../../services/attendanceServices.js";
import TextBox from "../../Components/Form/TextBox.jsx";
import Button from "../../Components/Button/Button.jsx";
import {getStatusColor} from "../../utils/helper.js";

const AttendanceDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

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
            <h3 className="text-lg text-left font-semibold mb-4">Attendance Detail</h3>
            <div className="space-y-10 text-left mt-5 border-t-2 border-gray-300 pt-5">
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

const formatDateTime = (timestamp) => {
    if (!timestamp) return "-";
    const date = new Date(timestamp * 1000);
    return date.toLocaleString("en-EN", {
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

const RenderSection = ({ label, time, status, comment, photoUrl, address, outsideLocation }) => (
    <div className="flex flex-col gap-6 items-start">
        <h3 className="text-lg font-semibold">{label}</h3>
        <div className="flex gap-10 w-full items-center">
            <div className="w-full h-full md:w-1/2">
                <img
                    src={
                        status === "Absent"
                            ? "https://placehold.co/600x400?text=Absent"
                            : photoUrl
                                ? `${import.meta.env.VITE_API_URL}/storage/${photoUrl}`
                                : "https://placehold.co/600x500?text=Not+Check+Yet"
                    }
                    alt={`${label} Photo`}
                    className="rounded-xl w-full h-full object-cover"
                />
            </div>

            <div className="flex flex-col gap-6 w-full md:w-1/2 text-sm">
                <TextBox label="Time" value={time ? formatDateTime(time) : "-"} readOnly onlyBottom />
                <TextBox label="Status" readOnly onlyBottom> {time ? (<p className={`inline-block font-bold px-4 py-2 rounded-lg ${getStatusColor(status, true)}`}>{status}</p> || "-") : "-"} </TextBox>
                <TextBox label="Comment" value={time ? (comment || "-") : "-"} readOnly onlyBottom />
                <TextBox label="Address" value={time ? (address || "-") : "-"} readOnly onlyBottom />
                <TextBox
                    label="Valid Location"
                    readOnly
                    onlyBottom
                >
                    {time ? (
                        <p className={`inline-block font-bold px-4 py-2 rounded-lg ${getStatusColor(String(!outsideLocation), true)}`}>
                            {!outsideLocation ? "Yes" : "No"}
                        </p>
                    ) : (
                        "-"
                    )}

                </TextBox>

            </div>
        </div>
    </div>
);

export default AttendanceDetailPage;
