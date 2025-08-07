import roleServices from "../../services/roleServices";
import RoleForm from "../forms/RoleForm.jsx";

const CreateRolePage = () => {
    const handleSubmit = async (data) => {
        try {
            await roleServices.createRole(data);
            alert("Role created successfully!");
            window.location.href = "/departments-roles";
        } catch (err) {
            console.error("Create Error:", err);
        }
    };

    return <RoleForm mode="create" onSubmit={handleSubmit} />;
};

export default CreateRolePage;
