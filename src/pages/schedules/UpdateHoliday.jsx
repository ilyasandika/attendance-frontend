import DepartmentOrRoleForm from "../forms/DepartmentOrRoleForm.jsx";
import {useErrors} from "../../hooks/useErrors.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {capitalize} from "../../utils/helper.js";
import holidayServices from "../../services/holidayServices.js";
import HolidayForm from "../forms/HolidayForm.jsx";
import {useEffect, useState} from "react";

const UpdateHolidayForm = () => {

    const { id } = useParams();
    const [holiday, setHoliday] = useState(null);
    const [loading, setLoading] = useState(true);

    const {fieldErrors, setErrors, removeErrorsByField} = useErrors();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleSubmit = async (data) => {
        await holidayServices.updateHoliday(id, data)
            .then(res => {
                navigate("/holidays", { state: { success: capitalize(t("successUpdateHoliday"), false) } });
            })
            .catch(error => {
                setErrors(error);
            })
    };

    useEffect(() => {
       const fetchData = async () => {
           await holidayServices.getHolidayById(id)
               .then(res => {
                   setHoliday(res.data.payload)
               })
               .catch(error => {
                   setErrors(error);
               })
               .finally(()=>{
                   setLoading(false);
               })
       }

       fetchData();
    }, [id])

    return <HolidayForm mode="edit"
                        initialValues={holiday}
                        onSubmit={handleSubmit}
                        fieldErrors = {fieldErrors}
                        setErrors = {setErrors}
                        removeErrorsByField = {removeErrorsByField}
    />;
};

export default UpdateHolidayForm;
