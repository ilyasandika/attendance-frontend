import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "../DataTable/DataTable.jsx";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import show from "../../assets/icons/show.svg";
import { Link, useSearchParams } from "react-router-dom";
import { updateSearchParams } from "../../utils/helper.js";
import holidayServices from "../../services/holidayServices.js";
import utilServices from "../../services/utilServices.js";
import log from "eslint-plugin-react/lib/util/log.js";

const HolidayTable = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [holidays, setHolidays] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState(searchParams.get("holidays_search") || "");
    const currentPage = Number(searchParams.get("holidays_page")) || 1;

    const fetchHolidays = useCallback(async () => {
        try {
            const response = await holidayServices.getHolidays(currentPage, search);
            setHolidays(response.data.payload.data);
            setTotalPages(response.data.payload.meta.lastPage || 1);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, search]);

    const deleteHoliday = async (id) => {
        try {
            await holidayServices.deleteHoliday(id);
            alert("Success delete holiday");
             fetchHolidays();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!searchParams.get("holidays_page")) {
            setSearchParams((prevParams) => {
                prevParams.set("holidays_page", 1);
            });
        }
        const getHolidays = setTimeout(() => {
            setIsLoading(true);
            fetchHolidays();
        }, 500);
        return () => clearTimeout(getHolidays);
    }, [currentPage, search]);

    useEffect(() => {
        updateSearchParams(setSearchParams, currentPage, search, { pageName: "holidays_page", searchName: "holidays_search" });
    }, [search]);

    const columns = useMemo(
        () => [
            {
                key: "name",
                label: "Holiday Name",
                render: (_, row) => <span className="font-semibold">{row.name}</span>,
            },
            {
                key: "date",
                label: "Date",
                render: (_, row) => <span>{new Date(row.date).toLocaleDateString("en-EN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>,
            },
            {
                key: "action",
                label: "Action",
                render: (_, row) => (

                    <div className="flex gap-4">
                        <Link to={`/holidays/edit/${row.holidayId}`} className={`cursor-pointer ${!utilServices.isAdmin() && "hidden"}`}>
                            <img src={edit} className="w-4" />
                        </Link>
                        <button className={`cursor-pointer ${!utilServices.isAdmin() && "hidden"}`} onClick={() => deleteHoliday(row.holidayId)} >
                            <img src={trash} className="w-4" />
                        </button>

                    </div>
                ),
            },
        ],
        []
    );

    const header = {
        title: "Holiday List",
        button: {
            link: "/holidays/add",
            text: "Add Holiday",
        },
    };

    const pagination = {
        setSearch,
        setSearchParams,
        search,
        searchParams,
        totalPages,
        currentPage,
        pageName: "holidays_page",
    };

    return <DataTable header={header} columns={columns} items={holidays} pagination={pagination} isLoading={isLoading} />;
};

export default HolidayTable;
