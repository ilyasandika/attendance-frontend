import { useState, useEffect } from "react";
import TextBox from "../../Components/Form/TextBox.jsx";
import Button from "../../Components/Button/Button.jsx";
import { capitalize } from "../../utils/helper.js";
import { useTranslation } from "react-i18next";

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const defaultIn = "08:00";
const defaultOut = "17:00";
const defaultBreakStart = "12:00";
const defaultBreakEnd = "13:00";

const generateDefaultDays = () => {
    return days.reduce((acc, day) => {
        acc[day] = {
            in: defaultIn,
            out: defaultOut,
            breakStart: defaultBreakStart,
            breakEnd: defaultBreakEnd,
            isOn: true,
        };
        return acc;
    }, {});
};

const ShiftForm = ({ mode = "create", initialValues = {}, onSubmit }) => {
    const { t } = useTranslation();

    const [shiftData, setShiftData] = useState({
        name: "",
        default: false,
        description: "",
        allowOutsideLocation: false,
        ...generateDefaultDays(),
        ...initialValues,
    });

    useEffect(() => {
        if (initialValues && Object.keys(initialValues).length > 0) {
            setShiftData((prev) => ({
                ...prev,
                ...initialValues,
            }));
        }
    }, [initialValues]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setShiftData({
            ...shiftData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleDayChange = (day, field, value) => {
        setShiftData((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                [field]: field === "isOn" ? value === "on" : value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(shiftData);
    };

    return (
        <div className="bg-white p-12 rounded-xl w-full text-left">
            <h3 className="text-lg text-left font-semibold mb-4">
                {capitalize(t(mode === "edit" ? "shift.edit" : "shift.create"))}
            </h3>
            <hr className="text-primary/20" />
            <form onSubmit={handleSubmit} className="space-y-10 mt-8">
                <div className="flex items-end gap-4  justify-between">
                    <div className="">
                        <TextBox
                            id="name"
                            label={capitalize(t("shift.name"))}
                            name="name"
                            value={shiftData.name}
                            handleChange={handleInputChange}
                        />
                    </div>
                    <div className="flex-1">
                        <TextBox
                            id="description"
                            label={capitalize(t("description"))}
                            name="description"
                            value={shiftData.description}
                            handleChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 pb-2">
                            <input
                                type="checkbox"
                                name="default"
                                checked={shiftData.default}
                                onChange={handleInputChange}
                            />
                            <span>{capitalize(t("setAsDefault"), false)}</span>
                        </div>
                        <div className="flex items-center gap-2 ">
                            <input
                                type="checkbox"
                                name="allowOutsideLocation"
                                checked={shiftData.allowOutsideLocation}
                                onChange={handleInputChange}
                            />
                            <span>{capitalize(t("allowOutsideLocation"), false)}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 w-full">
                    <h4 className="text-md font-semibold">{capitalize(t("dailySettings"))}</h4>
                    <div className="space-y-2 grid grid-cols-2 gap-8 w-full">
                        {days.map((day) => (
                            <div key={day} className="space-y-2 w-full border border-primary/20 p-4 rounded-md">
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="checkbox"
                                        checked={shiftData[day]?.isOn}
                                        onChange={(e) =>
                                            handleDayChange(day, "isOn", e.target.checked ? "on" : "off")
                                        }
                                    />
                                    <h5 className="capitalize font-medium">{t(day)}</h5>
                                </div>
                                <div className="grid grid-cols-4 gap-3">
                                    {["in", "out", "breakStart", "breakEnd"].map((field) => (
                                        <TextBox
                                            key={field}
                                            type="time"
                                            label={capitalize(field)}
                                            value={shiftData[day][field]}
                                            handleChange={(e) =>
                                                handleDayChange(day, field, e.target.value)
                                            }
                                            disabled={!shiftData[day].isOn}
                                            disabledDisplay={!shiftData[day].isOn}
                                            toolTipMessage={capitalize(t("shift.timeDisabled"), false)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button type="link" to="/shifts-locations" text="Cancel" fill={false} />
                    <Button text={capitalize(t(mode === "edit" ? "shift.update" : "shift.create"))} />
                </div>
            </form>
        </div>
    );
};

export default ShiftForm;
