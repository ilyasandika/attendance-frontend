import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "../DataTable/DataTable.jsx";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
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
    const navigate = useNavigate();
    const [search, setSearch] = useState(searchParams.get("holidays_search") || "");
    const currentPage = Number(searchParams.get("holidays_page")) || 1;
    const LOCALE = import.meta.env.VITE_LOCALE === "en" ? "en-EN" : "id-ID";

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

        await holidayServices.deleteHoliday(id)
            .then(res => {
                navigate(location.pathname, {state : {success : capitalize(t("successDeleteHoliday"))}})
                fetchHolidays();
            })
            .catch(error => {
                console.error(error)
            })
            .finally(() => {
                setDeleteModal(false);
            }
            )
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
                label: capitalize(t("holiday name")),
                render: (_, row) => <span className="font-semibold">{row.name}</span>,
            },
            {
                key: "date",
                label: capitalize(t("date")),
                render: (_, row) => <span>{new Date(row.date).toLocaleDateString(LOCALE, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>,
            },
            {
                key: "action",
                label: capitalize(t("action")),
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
        title: capitalize(t("holiday list")),
        button: {
            link: "/holidays/add",
            text: capitalize(t("add holiday")),
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
