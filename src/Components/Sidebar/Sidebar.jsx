import Item from "./Item.jsx";


import dashboard from "../../assets/icons/dashboard.svg";
import dashboardInactive from "../../assets/icons/dashboard_inactive.svg";
import profile from "../../assets/icons/profile.svg";
import profileInactive from "../../assets/icons/profile_inactive.svg";
import report from "../../assets/icons/report.svg";
import reportInactive from "../../assets/icons/report_inactive.svg";
import schedule from "../../assets/icons/schedule.svg";
import scheduleInactive from "../../assets/icons/schedule_inactive.svg";

import { useLocation } from "react-router-dom";
import utilServices from "../../services/utilServices.js";

const Sidebar = () => {
    const location = useLocation();
    const isAdmin = utilServices.isAdmin();

    const homeItems = [
        {
            name: "Dashboard",
            activeIcon: dashboard,
            inActiveIcon: dashboardInactive,
            isAllowed: true,
            to: "/dashboard",
            get isActive() {
                return location.pathname.startsWith(this.to);
            },
        },
        {
            name: "User",
            activeIcon: profile,
            inActiveIcon: profileInactive,
            isAllowed: !!isAdmin,
            to: "/users",
            get isActive() {
                return location.pathname.startsWith(this.to);
            },
        },
        {
            name: "Report",
            activeIcon: report,
            inActiveIcon: reportInactive,
            isAllowed: true,
            to: "/reports",
            get isActive() {
                return location.pathname.startsWith(this.to);
            },
        },
    ];

    const configItems = [
        {
            name: "Shifts & Locations",
            to: "/shifts-locations",
            activeIcon: report,
            inActiveIcon: reportInactive,
            isAllowed: true,
            get isActive() {
                return location.pathname.startsWith(this.to);
            },
        },
        {
            name: "Dept & Roles",
            to: "/departments-roles",
            activeIcon: report,
            inActiveIcon: reportInactive,
            isAllowed: true,
            get isActive() {
                return location.pathname.startsWith(this.to);
            },
        },
        {
            name: "Holiday",
            to: "/holidays",
            activeIcon: schedule,
            inActiveIcon: scheduleInactive,
            isAllowed: true,
            get isActive() {
                return location.pathname.startsWith(this.to);
            },
        },
    ]

    return (
        <aside className="w-64 bg-white text-primary h-screen overflow-y-auto fixed py-5 px-8 z-50">

        <img src="/images/logo.svg" className="p-4 text-center" />
            <ul className="mt-5">
                <div className="flex items-center gap-4 flex-row text-sm text-primary/70">
                    <span>Home</span>
                    <hr className="w-full"/>
                </div>
                <Item items={homeItems} />
                <div className="mt-5 flex items-center gap-4 flex-row text-sm text-primary/70">
                    <span>Configuration</span>
                    <hr className="w-full"/>
                </div>
                <Item items={configItems} />

            </ul>
        </aside>
    );
};

export default Sidebar;
