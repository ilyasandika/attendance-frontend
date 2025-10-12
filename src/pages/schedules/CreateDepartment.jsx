
import departmentServices from "../../services/departmentServices";
import DepartmentForm from "../forms/DepartmentOrRoleForm.jsx";
import {useErrors} from "../../hooks/useErrors.jsx";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {capitalize} from "../../utils/helper.js";
import DepartmentOrRoleForm from "../forms/DepartmentOrRoleForm.jsx";

const CreateDepartmentPage = () => {

    const {fieldErrors, setErrors, removeErrorsByField} = useErrors();
    const navigate = useNavigate();
    const {t} = useTranslation();


    const handleSubmit = async (data) => {
        await departmentServices.createDepartment(data)
            .then(res => {
                navigate("/departments-roles", { state: { success: capitalize(t("successCreateDepartment"), false) } });
            })
            .catch(error => {
                setErrors(error);
            })
    };

    return <DepartmentOrRoleForm mode="create"
                           onSubmit={handleSubmit}
                                 type={"department"}
                           fieldErrors = {fieldErrors}
                           setErrors = {setErrors}
                           removeErrorsByField = {removeErrorsByField}
                         />;
};

export default CreateDepartmentPage;
