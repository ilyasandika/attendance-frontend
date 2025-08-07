import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "../DataTable/DataTable.jsx";
import edit from "../../assets/icons/edit.svg";
import { Link, useSearchParams } from "react-router-dom";
import {capitalize, updateSearchParams} from "../../utils/helper.js";

import scheduleServices from "../../services/scheduleService.js";
import {useTranslation} from "react-i18next";
import Action from "../Button/Action.jsx";

const ScheduleTable = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [schedules, setSchedules] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState(searchParams.get("schedules_search") || "");
    const currentPage = Number(searchParams.get("schedules_page")) || 1;
    const {t} = useTranslation();
    const fetchSchedules = useCallback(async () => {
        try {
            const response = await scheduleServices.getSchedules(currentPage, search);

            setSchedules(response.data.payload.data);
            setTotalPages(response.data.payload.meta.lastPage || 1);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, search]);

    useEffect(() => {
        if (!searchParams.get("schedules_page")) {
            setSearchParams((prevParams) => {
                prevParams.set("schedules_page", 1);
                return prevParams;
            });
        }
        const getSchedules = setTimeout(() => {
            setIsLoading(true);
            fetchSchedules();
        }, 500);
        return () => clearTimeout(getSchedules);
    }, [currentPage, search]);

    useEffect(() => {
        updateSearchParams(setSearchParams, currentPage, search, {
            pageName: "schedules_page",
            searchName: "schedules_search",
        });
    }, [search]);

    const columns = useMemo(
        () => [
            {
                key: "employeeId",
                label: "ID",
            },
            {
                key: "employeeName",
                label: capitalize(t('user.fullName')),
            },
            {
                key: "employeeRole",
                label: (
                    <>
                        {capitalize(t('role'))}/ <br />
                        {capitalize(t('department'))}
                    </>
                ),
                render: (_, row) => (
                    <div className="flex flex-col">
                        <span className="font-semibold">{row.employeeRole}</span>
                        <span className="text-sm text-gray-500">{row.employeeDepartment}</span>
                    </div>
                ),
            },
            {
                key: "employeeShift",
                label: "Shift",
            },
            {
                key: "employeeWorkLocation",
                label: capitalize(t('location')),
            },
            {
                key: "action",
                label: capitalize(t('action')),
                render: (_, row) => (
                    <Action edit={{to:`/users/edit/${row.employeeId}`}} />
                ),
            },
        ],
        []
    );

    const header = {
        title: capitalize(t('schedules.list')),
        // button: {
        //     link: "/schedules/add",
        //     text: "Add Schedule",
        // },
    };

    const pagination = {
        setSearch,
        setSearchParams,
        search,
        searchParams,
        totalPages,
        currentPage,
        pageName: "schedules_page",
    };

    return (
        <>
            <DataTable header={header} columns={columns} items={schedules} pagination={pagination} isLoading={isLoading} />
        </>
    );
};

export default ScheduleTable;
