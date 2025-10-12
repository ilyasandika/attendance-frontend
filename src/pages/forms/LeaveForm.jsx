import {useEffect, useState} from "react";
import { addDays, format } from 'date-fns';
import {capitalize} from "../../utils/helper.js";
import TextBox from "../../Components/Form/TextBox.jsx";
import Button from "../../Components/Button/Button.jsx";
import {useTranslation} from "react-i18next";
import {DateRange} from "react-date-range";
import Dropdown from "../../Components/Form/Dropdown.jsx";
import FileInput from "../../Components/Form/FileInput.jsx";


const LeaveForm = ({ mode = "create", initialValues = {}, onSubmit, fieldErrors, setErrors, removeErrorsByField }) => {
    const [formData, setFormData] = useState({
        type: initialValues.type || "annual",
        startDate: initialValues.startDate ? new Date(initialValues.startDate * 1000).toISOString().split("T")[0] : "",
        endDate: initialValues.endDate ? new Date(initialValues.endDate * 1000).toISOString().split("T")[0] : "",
        reason: initialValues.reason || "",
        attachment: null,
        attachmentUrl: initialValues.attachmentUrl || "",
    });
    


    const [file, setFile] = useState(null);

    const [date, setDate] = useState([
        {
            startDate: initialValues.startDate
                ? new Date(initialValues.startDate * 1000)
                : new Date(),
            endDate: initialValues.endDate
                ? new Date(initialValues.endDate * 1000)
                : addDays(new Date(), 7),
            key: 'selection'
        }
    ]);

    const {t} = useTranslation();

    const leaveTypes = [
        {
            id : "annual",
            name : capitalize(t("annual"))
        },
        {
            id : "sick",
            name : capitalize(t("sick"))
        },
        {
            id : "unpaid",
            name : capitalize(t("unpaid"))
        },
        {
            id : "maternity",
            name : capitalize(t("maternity"))
        },
        {
            id : "emergency",
            name : capitalize(t("emergency"))
        },
        {
            id : "other",
            name : capitalize(t("other"))
        },
    ];


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));

        if (fieldErrors[name]) {
            removeErrorsByField(name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(date)
        const submitData = new FormData();
        submitData.append("type", formData.type);
        submitData.append("startDate", format(date[0].startDate, "yyyy-MM-dd"))
        submitData.append("endDate", format(date[0].endDate, "yyyy-MM-dd"))
        submitData.append("reason", formData.reason);
        if (file) {
            submitData.append("attachment", file);
        }
        onSubmit(submitData);
    };

    return (
        <div className="bg-white p-12 rounded-xl w-full text-left">
            <h3 className="text-lg text-left font-semibold mb-4">
                {capitalize(t(mode === "edit" ? "leaves.edit" : "leaves.add"))}
            </h3>
            <hr className="text-primary/20" />
            <form onSubmit={handleSubmit} className="space-y-10 mt-8">
                <div className="flex gap-4">
                    <div className="space-y-4">
                        <p className="font-semibold">{capitalize(t("selectDateRange"))}</p>
                        <DateRange
                            editableDateInputs={false}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                        />
                    </div>
                    <div className="flex flex-col gap-6 w-full">
                        <div>
                            <Dropdown
                                id="type"
                                label={`${capitalize(t("leaveType"))}`}
                                name="type"
                                defaultValue={formData.type}
                                items={leaveTypes}
                                value={formData.type}
                                handleChange={handleChange}
                                error={fieldErrors?.type}
                            />
                        </div>
                        <div>
                            <FileInput
                                label={capitalize(t("attachment"))}
                                accept="application/pdf, .pdf"
                                setFile={setFile}
                                link={formData.attachmentUrl ? formData.attachmentUrl : ""}
                                error={fieldErrors?.attachment}
                                handleChange={handleChange}
                            />

                        </div>
                        <div className="flex-1">
                            <TextBox
                                id="reason"
                                type="textarea"
                                label={`${capitalize(t("reason"))}`}
                                name="reason"
                                items={leaveTypes}
                                value={formData.reason}
                                handleChange={handleChange}
                                className={"h-40"}
                                error={fieldErrors?.reason}
                            />
                        </div>

                    </div>

                </div>



                <div className="flex justify-end gap-2">
                    <Button type="link" to="/leaves" text="Cancel" fill={false} />
                    <Button text={capitalize(t(mode === "edit" ? "leaves.update" : "leaves.create"))} />
                </div>
            </form>
        </div>
    );
};

export default LeaveForm;
