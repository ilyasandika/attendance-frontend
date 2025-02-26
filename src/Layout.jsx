import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import Header from "./Components/Header/Header.jsx";

const Layout = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === "/login";

    return isAuthPage ? (
        <Outlet />
    ) : (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Header />
                <main className="p-14 ml-64 mt-16 text-center">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
