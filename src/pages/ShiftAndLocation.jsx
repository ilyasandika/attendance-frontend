import utilServices from "../services/utilServices.js";
import ShiftTable from "../Components/Tables/ShiftTable.jsx";
import HolidayTable from "../Components/Tables/HolidayTable.jsx";
import LocationTable from "../Components/Tables/LocationTable.jsx";
import ScheduleTable from "../Components/Tables/ScheduleTable.jsx";
import DepartmentTable from "../Components/Tables/DepartmentTable.jsx";

const ShiftAndLocation = () => {
    return (
        <div className="flex flex-col gap-6">
            {utilServices.isAdmin() && (
                <>
                    <ShiftTable />
                    <LocationTable />
                    {/*<ScheduleTable />*/}
                </>
            )}
        </div>
    )
}

export default ShiftAndLocation;