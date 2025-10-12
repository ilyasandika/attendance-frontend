import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import departmentServices from "../../services/departmentServices";
import DepartmentForm from "../forms/DepartmentOrRoleForm.jsx";
import {useErrors} from "../../hooks/useErrors.jsx";
import {useTranslation} from "react-i18next";
import {capitalize} from "../../utils/helper.js";
import DepartmentOrRoleForm from "../forms/DepartmentOrRoleForm.jsx";

const UpdateDepartmentPage = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(true);

    const {fieldErrors, setErrors, removeErrorsByField} = useErrors();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleSubmit = async (data) => {
              await departmentServices.updateDepartment(id, data)
            .then(res => {
                navigate("/departments-roles", { state: { success: capitalize(t("successUpdateDepartment"), false) } });
            })
            .catch(error => {
                setErrors(error);
            })
    };

    useEffect(() => {
        const fetchData = async () => {
            await departmentServices.getDepartmentById(id)
                .then(res => {
                    setDepartment(res.data.payload)
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
                           initialValues={department}
                           onSubmit={handleSubmit}
                                 type={"department"}
                           fieldErrors = {fieldErrors}
                           setErrors = {setErrors}
                           removeErrorsByField = {removeErrorsByField}
    />;
};

export default UpdateDepartmentPage;
