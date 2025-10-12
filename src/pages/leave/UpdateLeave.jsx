import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import leaveServices from "../../services/leaveServices";
import LeaveForm from "../forms/LeaveForm.jsx";

const UpdateLeavePage = () => {
    const { id } = useParams();
    const [leave, setLeave] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleSubmit = async (data) => {
        try {
            await leaveServices.updateLeave(id, data);
            alert("Leave updated successfully!");
            window.location.href = "/leaves";
        } catch (err) {
            console.error("Update Error:", err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await leaveServices.getLeaveById(id);
                setLeave(res.data.payload);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return <LeaveForm mode="edit" initialValues={leave} onSubmit={handleSubmit} />;
};

export default UpdateLeavePage;
