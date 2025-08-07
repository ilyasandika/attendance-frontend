import DepartmentTable from "../Components/Tables/DepartmentTable.jsx";
import RoleTable from "../Components/Tables/RoleTable.jsx";

const DepartmentAndRole = () => {
    return (
        <div className="flex flex-col gap-6">
            <DepartmentTable/>
            <RoleTable />
        </div>
    )
}

export default DepartmentAndRole;