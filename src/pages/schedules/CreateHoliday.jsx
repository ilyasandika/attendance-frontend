import DepartmentOrRoleForm from "../forms/DepartmentOrRoleForm.jsx";
import {useErrors} from "../../hooks/useErrors.jsx";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {capitalize} from "../../utils/helper.js";
import holidayServices from "../../services/holidayServices.js";
import HolidayForm from "../forms/HolidayForm.jsx";

const CreateHolidayForm = () => {

    const {fieldErrors, setErrors, removeErrorsByField} = useErrors();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleSubmit = async (data) => {
        await holidayServices.createHoliday(data)
            .then(res => {
                navigate("/holidays", { state: { success: capitalize(t("successCreateHoliday"), false) } });
            })
            .catch(error => {
                setErrors(error);
            })
    };

    return <HolidayForm mode="create"
                                 onSubmit={handleSubmit}
                                 fieldErrors = {fieldErrors}
                                 setErrors = {setErrors}
                                 removeErrorsByField = {removeErrorsByField}
    />;
};

export default CreateHolidayForm;
