import { useState } from "react";
import TextBox from "../../Components/Form/TextBox.jsx";
import holidayServices from "../../services/holidayServices.js";
import {Link} from "react-router-dom";

const CreateHolidayForm = () => {
    const [holidayData, setHolidayData] = useState({
        name: "",
        date: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHolidayData({
            ...holidayData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await holidayServices.createHoliday(holidayData);
            alert("Holiday created successfully!");
            window.location.href = "/schedules";
        } catch (error) {
            console.error("Error creating holiday:", error);
            alert("Failed to create holiday.");
        }
    };

    return (
        <div className="bg-white p-12 rounded-xl w-full text-left">
            <h3 className="text-lg text-left font-semibold mb-4">Create New Holiday</h3>
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
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">
                        Create Holiday
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateHolidayForm;
