import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard.jsx";
import Report from "../pages/Report.jsx";
import Schedule from "../pages/Schedule.jsx";
import User from "../pages/User.jsx";
import NotFound from "../pages/NotFound.jsx";
import Layout from "../Layout.jsx";
import Login from "../pages/Login.jsx";
import CreateUser from "../pages/users/CreateUser.jsx";
import EditUser from "../pages/users/UpdateUser.jsx";
import CreateShiftPage from "../pages/schedules/CreateShift.jsx";
import UpdateShiftForm from "../pages/schedules/UpdateShift.jsx";
import CreateLocationForm from "../pages/schedules/CreateLocation.jsx";
import UpdateLocationForm from "../pages/schedules/UpdateLocation.jsx";
import CreateHolidayForm from "../pages/schedules/CreateHoliday.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";
import DetailAttendance from "../pages/attendances/DetailAttendance.jsx";
import UpdateHolidayForm from "../pages/schedules/UpdateHoliday.jsx";
import ShiftAndLocation from "../pages/ShiftAndLocation.jsx";
import DepartmentAndRole from "../pages/DepartmentAndRole.jsx";
import Holiday from "../pages/Holiday.jsx";
import UpdateShiftPage from "../pages/schedules/UpdateShift.jsx";
import CreateDepartmentPage from "../pages/schedules/CreateDepartment.jsx";
import UpdateDepartmentPage from "../pages/schedules/UpdateDepartment.jsx";
import CreateRolePage from "../pages/schedules/CreateRole.jsx";
import UpdateRolePage from "../pages/schedules/UpdateRole.jsx";
import CreateLocationPage from "../pages/schedules/CreateLocation.jsx";
import UpdateLocationPage from "../pages/schedules/UpdateLocation.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Shared Authenticated Route */}
            <Route element={<ProtectedRoute allowedRoles={["admin", "employee"]} />}>
                <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/reports" element={<Report />} />
                    <Route path="/schedules" element={<Schedule />} />
                    <Route path="/profile/edit" element={<EditUser />} />
                    <Route path="/attendances/detail/:id" element={<DetailAttendance />} />
                </Route>
            </Route>

            {/* Admin-only Route */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route element={<Layout />}>

                    {/*User*/}
                    <Route path="/users" element={<User />} />
                    <Route path="/users/add" element={<CreateUser />} />
                    <Route path="/users/edit/:id" element={<EditUser />} />

                    {/*shift*/}
                    <Route path="/shifts-locations" element={<ShiftAndLocation />} />
                    <Route path="/shifts-locations/shifts/add" element={<CreateShiftPage  />} />
                    <Route path="/shifts-locations/shifts/edit/:id" element={<UpdateShiftPage />} />

                    {/*location*/}
                    <Route path="/shifts-locations/locations/add" element={<CreateLocationPage />} />
                    <Route path="/shifts-locations/locations/edit/:id" element={<UpdateLocationPage />} />

                    {/*holiday*/}
                    <Route path="/holidays" element={<Holiday />} />
                    <Route path="/holidays/add" element={<CreateHolidayForm />} />
                    <Route path="/holidays/edit/:id" element={<UpdateHolidayForm />} />

                    {/*department & role*/}
                    <Route path="/departments-roles" element={<DepartmentAndRole />} />
                    <Route path="/departments-roles/departments/add" element={<CreateDepartmentPage />} />
                    <Route path="/departments-roles/departments/edit/:id" element={<UpdateDepartmentPage />} />
                    <Route path="/departments-roles/roles/add" element={<CreateRolePage />} />
                    <Route path="/departments-roles/roles/edit/:id" element={<UpdateRolePage />} />


                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
