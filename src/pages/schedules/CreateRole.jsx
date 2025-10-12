import roleServices from "../../services/roleServices";

import DepartmentOrRoleForm from "../forms/DepartmentOrRoleForm.jsx";
import {useErrors} from "../../hooks/useErrors.jsx";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import departmentServices from "../../services/departmentServices.js";
import {capitalize} from "../../utils/helper.js";

const CreateRolePage = () => {


    const {fieldErrors, setErrors, removeErrorsByField} = useErrors();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleSubmit = async (data) => {
          await roleServices.createRole(data)
            .then(res => {
                navigate("/departments-roles", { state: { success: capitalize(t("successCreateRole"), false) } });
            })
            .catch(error => {
                setErrors(error);
            })
    };

    return <DepartmentOrRoleForm mode="create"
                                 type={"role"}
                                 onSubmit={handleSubmit}
                                 fieldErrors = {fieldErrors}
                                 setErrors = {setErrors}
                                 removeErrorsByField = {removeErrorsByField}
    />;
};

export default CreateRolePage;
