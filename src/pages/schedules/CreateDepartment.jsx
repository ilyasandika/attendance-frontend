
import departmentServices from "../../services/departmentServices";
import DepartmentForm from "../forms/DepartmentForm.jsx";

const CreateDepartmentPage = () => {
    const handleSubmit = async (data) => {
        try {
            await departmentServices.createDepartment(data);
            alert("Department created successfully!");
            window.location.href = "/departments-roles";
        } catch (err) {
            console.error("Create Error:", err);
        }
    };

    return <DepartmentForm mode="create" onSubmit={handleSubmit} />;
};

export default CreateDepartmentPage;
