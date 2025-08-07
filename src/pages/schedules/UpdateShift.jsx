import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import shiftServices from "../../services/shiftServices";
import ShiftForm from "../forms/ShiftForm.jsx";

const UpdateShiftPage = () => {
    const { id } = useParams();
    const [shift, setShift] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleSubmit = async (data) => {
        try {
            await shiftServices.updateShift(id, data);
            alert("Shift updated successfully!");
            window.location.href = "/shifts-locations";
        } catch (err) {
            console.error("Update Error:", err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await shiftServices.getShiftById(id);
                setShift(res.data.payload);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return <ShiftForm mode="edit" initialValues={shift} onSubmit={handleSubmit} />;
};

export default UpdateShiftPage;
