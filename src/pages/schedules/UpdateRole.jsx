import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import roleServices from "../../services/roleServices";

import RoleForm from "../forms/RoleForm.jsx";

const UpdateRolePage = () => {
    const { id } = useParams();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleSubmit = async (data) => {
        try {
            await roleServices.updateRole(id, data);
            alert("Role updated successfully!");
            window.location.href = "/departments-roles";
        } catch (err) {
            console.error("Update Error:", err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await roleServices.getRoleById(id);
                setRole(res.data.payload);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return <RoleForm mode="edit" initialValues={role} onSubmit={handleSubmit} />;
};

export default UpdateRolePage;
