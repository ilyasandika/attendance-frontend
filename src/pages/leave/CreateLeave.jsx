import leaveServices from "../../services/leaveServices";
import LeaveForm from "../forms/LeaveForm.jsx";
import {useState} from "react";
import {useErrors} from "../../hooks/useErrors.jsx";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {capitalize} from "../../utils/helper.js";

const CreateLeavePage = () => {

    const {fieldErrors, setErrors, removeErrorsByField} = useErrors();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleSubmit = async (data) => {
        await leaveServices.createLeave(data)
            .then(res => {
                navigate("/leaves", {state : {
                    success : capitalize(t("successCreateLeve")),
                    }});
            })
            .catch(err => {
                setErrors(err);
            })
    };

    return <LeaveForm mode="create" onSubmit={handleSubmit}
                      fieldErrors = {fieldErrors}
                      setErrors = {setErrors}
                      removeErrorsByField = {removeErrorsByField}/>;
};

export default CreateLeavePage;
