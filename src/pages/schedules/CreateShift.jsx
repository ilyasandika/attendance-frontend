import shiftServices from "../../services/shiftServices";
import ShiftForm from "../forms/ShiftForm.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useErrors} from "../../hooks/useErrors.jsx";
import {capitalize, scrollToTop} from "../../utils/helper.js";

const CreateShiftPage = () => {
    const [error, setError] = useState(null);
    const navigation = useNavigate();
    const {t} = useTranslation();

    const {fieldErrors, setErrors, removeErrorsByField} = useErrors();

    const handleSubmit = async (data) => {
              await shiftServices.createShift(data)
            .then(res => {
                navigation("/shifts-locations", {
                    state : {
                        success : capitalize(t("successCreateShift"), false),
                    }
                })
            })
            .catch(e => {
                setErrors(e);
                scrollToTop();
            })
    };

    return <ShiftForm mode="create" onSubmit={handleSubmit} fieldErrors={fieldErrors}  setErrors={setErrors}  removeErrorsByField={removeErrorsByField} />;
};

export default CreateShiftPage;
