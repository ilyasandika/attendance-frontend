import shiftServices from "../../services/shiftServices";
import ShiftForm from "../forms/ShiftForm.jsx";

const CreateShiftPage = () => {
    const handleSubmit = async (data) => {
        try {
            await shiftServices.createShift(data);
            alert("Shift created successfully!");
            window.location.href = "/shifts-locations";
        } catch (err) {
            console.error("Create Error:", err);
        }
    };

    return <ShiftForm mode="create" onSubmit={handleSubmit} />;
};

export default CreateShiftPage;
