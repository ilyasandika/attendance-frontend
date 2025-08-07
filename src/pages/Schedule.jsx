import LocationTable from "../Components/Tables/LocationTable.jsx";
import ScheduleTable from "../Components/Tables/ScheduleTable.jsx";
import ShiftTable from "../Components/Tables/ShiftTable.jsx";
import HolidayTable from "../Components/Tables/HolidayTable.jsx";
import utilServices from "../services/utilServices.js";
import DepartmentTable from "../Components/Tables/DepartmentTable.jsx";

const Schedule = () => {
    return (
        <div className="flex flex-col gap-6">
            {utilServices.isAdmin() && <ShiftTable />}
            <HolidayTable />
            {utilServices.isAdmin() && <LocationTable />}
            {utilServices.isAdmin() &&  <ScheduleTable />}
            <DepartmentTable />
        </div>
    );
};

export default Schedule;
