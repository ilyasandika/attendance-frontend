import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import departmentServices from "../../services/departmentServices";
import DepartmentForm from "../forms/DepartmentForm.jsx";


const UpdateDepartmentPage = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleSubmit = async (data) => {
        try {
            await departmentServices.updateDepartment(id, data);
            alert("Department updated successfully!");
            window.location.href = "/departments-roles";
        } catch (err) {
            console.error("Update Error:", err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await departmentServices.getDepartmentById(id);
                setDepartment(res.data.payload);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return <DepartmentForm mode="edit" initialValues={department} onSubmit={handleSubmit} />;
};

export default UpdateDepartmentPage;
