import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "../DataTable/DataTable.jsx";
import { Link, useSearchParams } from "react-router-dom";
import {capitalize, updateSearchParams} from "../../utils/helper.js";
import holidayServices from "../../services/holidayServices.js";
import Action from "../Button/Action.jsx";
import ConfirmModal from "../../Modal/ConfirmModal.jsx";
import {useTranslation} from "react-i18next";

const HolidayTable = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [holidays, setHolidays] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const {t} = useTranslation();
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
        } finally {
            setDeleteModal(false);
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
                    <Action
                        edit={ {to: `/holidays/edit/${row.id}`} }
                        dump={{
                            onClick:() => {
                                setDeleteId(row.id);
                                setDeleteModal(true)
                            }
                            }}
                    />


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

    return (
       <>
           <DataTable header={header} columns={columns} items={holidays} pagination={pagination} isLoading={isLoading} />
           {deleteModal && (
               <ConfirmModal isOpen={deleteModal} onClose={() => setDeleteModal(false)} onConfirm={() => deleteHoliday(deleteId)}/>
           )}
       </>
    );
};

export default HolidayTable;
