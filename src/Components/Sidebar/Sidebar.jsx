import Item from "./Item.jsx";
import dashboard from "../../assets/icons/dashboard.svg";
import dashboardInactive from "../../assets/icons/dashboard_inactive.svg";
import profile from "../../assets/icons/profile.svg";
import profileInactive from "../../assets/icons/profile_inactive.svg";
import report from "../../assets/icons/report.svg";
import reportInactive from "../../assets/icons/report_inactive.svg";
import schedule from "../../assets/icons/schedule.svg";
import scheduleInactive from "../../assets/icons/schedule_inactive.svg";

const Sidebar = () => {
    return (
        <aside className="w-64 bg-white text-primary h-screen py-5 px-8">
            <h2 className="p-4 text-center text-2xl font-bold">Dashboard</h2>
            <Item
                items={[
                    {
                        name: "Dashboard",
                        isActive: true,
                        activeIcon: dashboard,
                        inActiveIcon: dashboardInactive,
                        to: "/dashboard",
                    },
                    {
                        name: "User",
                        isActive: false,
                        activeIcon: profile,
                        inActiveIcon: profileInactive,
                        to: "/users",
                    },
                    {
                        name: "Report",
                        isActive: false,
                        activeIcon: report,
                        inActiveIcon: reportInactive,
                        to: "/reports",
                    },
                    {
                        name: "Schedule",
                        isActive: false,
                        activeIcon: schedule,
                        inActiveIcon: scheduleInactive,
                        to: "/schedules",
                    },
                ]}
            />
        </aside>
    );
};

export default Sidebar;
