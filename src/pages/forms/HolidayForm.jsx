import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import TextBox from "../../Components/Form/TextBox.jsx";
import holidayServices from "../../services/holidayServices.js";
import {useTranslation} from "react-i18next";
import Button from "../../Components/Button/Button.jsx";
import {capitalize} from "../../utils/helper.js";

const UpdateHolidayForm = ({mode = "create", initialValues = {}, onSubmit, fieldErrors, setErrors, removeErrorsByField}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [formData, setFormData] = useState({
        name: "",
        date: "",
        ...initialValues,
    });

    useEffect(() => {
        if (initialValues && Object.keys(initialValues).length > 0) {
            setFormData((prev) => ({
                ...prev,
                ...initialValues,
            }));
        }
    }, [initialValues]);

    // const [loading, setLoading] = useState(true);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if(fieldErrors[name]) {
            removeErrorsByField(name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    //
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await holidayServices.updateHoliday(id, holidayData);
    //         alert("Holiday updated successfully!");
    //         navigate("/holidays");
    //     } catch (error) {
    //         console.error("Error updating holiday:", error);
    //         alert("Failed to update holiday.");
    //     }
    // };

    // if (loading) {
    //     return <div className="p-6">Loading...</div>;
    // }

    return (
        <div className="bg-white p-12 rounded-xl w-full text-left">
            <h3 className="text-lg text-left font-semibold mb-4">{capitalize(t(mode === "create" ? "create holiday" : "update holiday"))} </h3>
            <hr className="text-primary/20" />

            <form onSubmit={handleSubmit} className="space-y-10 mt-8">
                <div className="grid grid-cols-2 gap-8">
                    <TextBox
                        label={capitalize(t("holiday name"))}
                        name="name"
                        handleChange={handleChange}
                        value={formData.name}
                        error={fieldErrors?.name}
                        required
                    />
                    <TextBox
                        label={capitalize(t("date"))}
                        name="date"
                        type="date"
                        handleChange={handleChange}
                        value={formData.date}
                        error={fieldErrors?.date}
                        required
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <Button type="link" to="/holidays" text={capitalize(t("cancel"))} fill={false} />
                    <Button
                        text={
                            mode === "edit"
                                ? capitalize(t( "update holiday"))
                                : capitalize(t( "create holiday"))
                        }
                    />
                </div>
            </form>
        </div>
    );
};

export default UpdateHolidayForm;
