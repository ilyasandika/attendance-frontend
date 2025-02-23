import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import Schedule from "./pages/Schedule";
import User from "./pages/User";
import NotFound from "./pages/NotFound";
import Layout from "./Layout.jsx";
import Login from "./pages/Login.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/reports" element={<Report />} />
                <Route path="/users" element={<User />} />
                <Route path="/schedules" element={<Schedule />} />
                <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default AppRoutes;
