import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import TextBox from "../../Components/Form/TextBox.jsx";
import holidayServices from "../../services/holidayServices.js";

const UpdateHolidayForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [holidayData, setHolidayData] = useState({
        name: "",
        date: "",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHoliday = async () => {
            try {
                const res = await holidayServices.getHolidayById(id);
                setHolidayData(res.data.payload);
            } catch (error) {
                console.error("Failed to fetch holiday:", error);
                alert("Failed to load holiday data.");
            } finally {
                setLoading(false);
            }
        };

        fetchHoliday();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHolidayData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await holidayServices.updateHoliday(id, holidayData);
            alert("Holiday updated successfully!");
            navigate("/holidays");
        } catch (error) {
            console.error("Error updating holiday:", error);
            alert("Failed to update holiday.");
        }
    };

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="bg-white p-12 rounded-xl w-full text-left">
            <h3 className="text-lg text-left font-semibold mb-4">Edit Holiday</h3>
            <hr className="text-primary/20" />

            <form onSubmit={handleSubmit} className="space-y-10 mt-8">
                <div className="grid grid-cols-2 gap-8">
                    <TextBox
                        label="Holiday Name"
                        name="name"
                        handleChange={handleChange}
                        value={holidayData.name}
                        required
                    />
                    <TextBox
                        label="Holiday Date"
                        name="date"
                        type="date"
                        handleChange={handleChange}
                        value={holidayData.date}
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <Link to="/holidays" className="cursor-pointer border border-primary text-primary px-4 py-2 rounded-md">
                        Cancel
                    </Link>
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md ml-2">
                        Update Holiday
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateHolidayForm;
