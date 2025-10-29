import Item from "./Item.jsx";
import { useLocation } from "react-router-dom";
import utilServices from "../../services/utilServices.js";
import {
    ArrowRightStartOnRectangleIcon, BuildingOffice2Icon, CalendarDaysIcon, CalendarIcon, ChevronLeftIcon,
    ComputerDesktopIcon,
    DocumentChartBarIcon,
    UserGroupIcon
} from "@heroicons/react/16/solid/index.js";
import {capitalize} from "../../utils/helper.js";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {Bars3Icon} from "@heroicons/react/24/outline/index.js";
import {useSidebar} from "../../contexts/useSideBar.jsx";

const Sidebar = ({}) => {
    const location = useLocation();
    const isAdmin = utilServices.isAdmin();
    const {minimize, setMinimize} = useSidebar();
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


    useEffect(() => {
        console.log(minimize)
    }, [minimize]);

    const toggleMinimize = () => {
        setMinimize(true);

    }

    return (
        <>
            {/*<div className={`fixed top-25  z-200 p-1 cursor-pointer bg-primary text-white rounded-lg  transition-transform duration-300 ease-in-out ${minimize && "left-0 -translate-x-full"}`}>*/}
            {/*    <ChevronLeftIcon className="h-6 w-6" onClick={toggleMinimize}/>*/}
            {/*</div>*/}
            <div className={`hidden absolute top-0 left-0 z-50 w-screen h-screen bg-primary/40 ${!minimize && "inline"}`} onClick={toggleMinimize}>

            </div>


            <aside className={`z-50 -translate-x-full fixed xl:translate-x-0 w-64 bg-white text-primary h-screen overflow-y-auto py-5 px-8 transition-transform duration-300 ease-in-out ${!minimize && "translate-x-0 border-r border-gray-200"}`}>

                <img src="/images/LOGO_ALHAYAH.png" className="mx-auto w-40" />

                <ul className="mt-4">
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
        </>
    );
};

export default Sidebar;
