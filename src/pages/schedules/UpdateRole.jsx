import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import roleServices from "../../services/roleServices";
import DepartmentOrRoleForm from "../forms/DepartmentOrRoleForm.jsx";
import {useErrors} from "../../hooks/useErrors.jsx";
import {useTranslation} from "react-i18next";
import departmentServices from "../../services/departmentServices.js";
import {capitalize} from "../../utils/helper.js";


const UpdateRolePage = () => {
    const { id } = useParams();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);


    const {fieldErrors, setErrors, removeErrorsByField} = useErrors();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleSubmit = async (data) => {
           await roleServices.updateRole(id, data)
            .then(res => {
                navigate("/departments-roles", { state: { success: capitalize(t("successUpdateRole"), false) } });
            })
            .catch(error => {
                setErrors(error);
            })
    };

    useEffect(() => {
        const fetchData = async () => {
                     await roleServices.getRoleById(id)
                .then(res => {
                    setRole(res.data.payload)
                })
                .catch(error => {
                    setErrors(error);
                })
                .finally(()=>{
                    setLoading(false);
                })
        };
        fetchData();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return <DepartmentOrRoleForm mode="edit"
                                 type={"role"}
                                 initialValues={role}
                                 onSubmit={handleSubmit}
                                 fieldErrors = {fieldErrors}
                                 setErrors = {setErrors}
                                 removeErrorsByField = {removeErrorsByField}
    />;
};

export default UpdateRolePage;
