import Item from "./Item.jsx";
import { useLocation } from "react-router-dom";
import utilServices from "../../services/utilServices.js";
import {
    ArrowRightStartOnRectangleIcon, BuildingOffice2Icon, CalendarDaysIcon, CalendarIcon,
    ComputerDesktopIcon,
    DocumentChartBarIcon,
    UserGroupIcon
} from "@heroicons/react/16/solid/index.js";
import {capitalize} from "../../utils/helper.js";
import {useTranslation} from "react-i18next";

const Sidebar = () => {
    const location = useLocation();
    const isAdmin = utilServices.isAdmin();
    const {t} = useTranslation();

    const itemStyle = "h-5 text-primary/40"
    const activeItemStyle = `${itemStyle} text-primary/100`

    const homeItems = [
        {
            name: "Dashboard",
            activeIcon: <ComputerDesktopIcon className={activeItemStyle}/>,
            inActiveIcon: <ComputerDesktopIcon className={itemStyle}/>,
            isAllowed: true,
            to: "/dashboard",
            get isActive() {
                return location.pathname.startsWith(this.to);
            },
        },
        {
            name: capitalize(t("users")),
            activeIcon: <UserGroupIcon className={activeItemStyle}/>,
            inActiveIcon: <UserGroupIcon className={itemStyle}/>,
            isAllowed: !!isAdmin,
            to: "/users",
            get isActive() {
                return location.pathname.startsWith(this.to);
            },
        },
        {
            name: capitalize(t("report")),
            activeIcon: <DocumentChartBarIcon className={activeItemStyle}/>,
            inActiveIcon: <DocumentChartBarIcon className={itemStyle}/>,
            isAllowed: true,
            to: "/reports",
            get isActive() {
                return location.pathname.startsWith(this.to);
            },
        },

        {
            name: capitalize(t("leave")),
            activeIcon: <ArrowRightStartOnRectangleIcon className={activeItemStyle}/>,
            inActiveIcon: <ArrowRightStartOnRectangleIcon className={itemStyle}/>,
            isAllowed: true,
            to: "/leaves",
            get isActive() {
                return location.pathname.startsWith(this.to);
            },
        },
    ];

    const configItems = [
        {
            name: `${capitalize(t("shifts"))} & ${capitalize(t("location"))}`,
            to: "/shifts-locations",
            activeIcon: <CalendarIcon className={activeItemStyle}/>,
            inActiveIcon: <CalendarIcon className={itemStyle}/>,
            isAllowed: true,
            get isActive() {
                return location.pathname.startsWith(this.to);
            },
        },
        {
            name: `${capitalize(t("department"))} & ${capitalize(t("role"))}`,
            to: "/departments-roles",
            activeIcon: <BuildingOffice2Icon className={activeItemStyle}/>,
            inActiveIcon: <BuildingOffice2Icon className={itemStyle}/>,
            isAllowed: true,
            get isActive() {
                return location.pathname.startsWith(this.to);
            },
        },
        {
            name: capitalize(t("holiday")),
            to: "/holidays",
            activeIcon: <CalendarDaysIcon className={activeItemStyle}/>,
            inActiveIcon: <CalendarDaysIcon className={itemStyle}/>,
            isAllowed: true,
            get isActive() {
                return location.pathname.startsWith(this.to);
            },
        },
    ]

    return (
        <aside className="w-64 bg-white text-primary h-screen overflow-y-auto fixed py-5 px-8 z-50">

        <img src="/images/LOGO_ALHAYAH.png" className="p-4 text-center" />
            <ul className="mt-5">
                <div className="flex items-center gap-4 flex-row text-sm text-primary/70">
                    <span>Home</span>
                    <hr className="w-full"/>
                </div>
                <Item items={homeItems} />
                {isAdmin &&
                   <div>
                       <div className="mt-5 flex items-center gap-4 flex-row text-sm text-primary/70">
                           <span>{capitalize(t("configuration"))}</span>
                           <hr className="w-full"/>
                       </div>
                       <Item items={configItems} />
                   </div>
                }

            </ul>
        </aside>
    );
};

export default Sidebar;
