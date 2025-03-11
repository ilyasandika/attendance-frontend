import LocationTable from "../Components/Tables/LocationTable.jsx";
import ShiftTable from "../Components/Tables/ShiftTable.jsx";

const Schedule = () => {
    return (
        <div className="flex flex-col gap-6">
            <ShiftTable />
            <LocationTable />
        </div>
    );
};

export default Schedule;
