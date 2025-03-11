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

const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="w-64 bg-white text-primary min-h-screen fixed py-5 px-8">
            <img src="/images/logo.svg" className="p-4 text-center" />
            {/* <h2 className="p-4 text-center text-2xl font-bold">Dashboard</h2> */}
            <Item
                items={[
                    {
                        name: "Dashboard",
                        activeIcon: dashboard,
                        inActiveIcon: dashboardInactive,
                        to: "/dashboard",
                        get isActive() {
                            return location.pathname.startsWith(this.to);
                        },
                    },
                    {
                        name: "User",
                        activeIcon: profile,
                        inActiveIcon: profileInactive,
                        to: "/users",
                        get isActive() {
                            return location.pathname.startsWith(this.to);
                        },
                    },
                    {
                        name: "Report",
                        activeIcon: report,
                        inActiveIcon: reportInactive,
                        to: "/reports",
                        get isActive() {
                            return location.pathname.startsWith(this.to);
                        },
                    },
                    {
                        name: "Schedule",
                        activeIcon: schedule,
                        inActiveIcon: scheduleInactive,
                        to: "/schedules",
                        get isActive() {
                            return location.pathname.startsWith(this.to);
                        },
                    },
                ]}
            />
        </aside>
    );
};

export default Sidebar;
