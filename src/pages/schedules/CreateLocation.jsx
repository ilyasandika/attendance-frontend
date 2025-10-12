import locationServices from "../../services/locationServices";
import LocationForm from "../forms/LocationForm";
import {useErrors} from "../../hooks/useErrors.jsx";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {capitalize} from "../../utils/helper.js";

const CreateLocationPage = () => {
    const {fieldErrors, setErrors, removeErrorsByField} = useErrors();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleSubmit = async (data) => {

        await locationServices.createLocation(data)
            .then(res => {
                navigate("/shifts-locations", {state : {
                    success: capitalize(t("successCreateLocation"))
                    }})
            })
            .catch(e => {
                setErrors(e);
            })
    };

    return <LocationForm mode="create"
                         onSubmit={handleSubmit}
                         fieldErrors = {fieldErrors}
                         setErrors = {setErrors}
                         removeErrorsByField = {removeErrorsByField}
    />;
};

export default CreateLocationPage;
