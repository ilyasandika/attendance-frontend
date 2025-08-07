import { useState, useEffect } from "react";
import TextBox from "../../Components/Form/TextBox.jsx";
import { capitalize } from "../../utils/helper.js";
import { useTranslation } from "react-i18next";
import Button from "../../Components/Button/Button.jsx";

const DepartmentForm = ({ mode = "create", initialValues = {}, onSubmit }) => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        default: false,
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

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="bg-white p-12 rounded-xl w-full text-left">
            <h3 className="text-lg text-left font-semibold mb-4">
                {capitalize(t(mode === "edit" ? "departments.edit" : "departments.add"))}
            </h3>
            <hr className="text-primary/20" />
            <form onSubmit={handleSubmit} className="space-y-10 mt-8">
                <div className="flex flex-col gap-4">
                    <TextBox
                        label={capitalize(t("departments.name"))}
                        name="name"
                        value={formData.name}
                        handleChange={handleChange}
                    />
                    <TextBox
                        label={capitalize(t("description"))}
                        name="description"
                        value={formData.description}
                        handleChange={handleChange}
                    />
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="default"
                            checked={formData.default}
                            onChange={handleChange}
                        />
                        <span>{capitalize(t("setAsDefault"), false)}</span>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button
                        type="link"
                        to="/departments-roles"
                        text={capitalize(t("cancel"))}
                        fill={false}
                    />
                    <Button
                        text={
                            mode === "edit"
                                ? capitalize(t("departments.update"))
                                : capitalize(t("departments.create"))
                        }
                    />
                </div>
            </form>
        </div>
    );
};

export default DepartmentForm;
