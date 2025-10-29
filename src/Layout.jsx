import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import Header from "./Components/Header/Header.jsx";
import {useState} from "react";

const Layout = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === "/login";
    const [minimize, setMinimize] = useState(false);

    return isAuthPage ? (
        <Outlet />
    ) : (
        <div className="flex">
            <Header minimize={minimize} setMinimize={setMinimize}  />
            <div className="flex-1">
            <Sidebar minimize={minimize} setMinimize={setMinimize} />
                <main className="p-14 ml-64 mt-14 text-center">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
