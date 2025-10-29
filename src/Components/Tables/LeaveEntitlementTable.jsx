import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "../DataTable/DataTable.jsx";
import { useSearchParams } from "react-router-dom";
import {capitalize, getStatusColor, updateSearchParams} from "../../utils/helper.js";
import leaveServices from "../../services/leaveServices.js";
import {useTranslation} from "react-i18next";
import {ArrowLongRightIcon, EyeIcon, PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline/index.js";
import Action from "../Button/Action.jsx";
import ConfirmModal from "../../Modal/ConfirmModal.jsx";
import FormModal from "../../Modal/FormModal.jsx";
import TextBox from "../Form/TextBox.jsx";
import {useErrors} from "../../hooks/useErrors.jsx";
import utilServices from "../../services/utilServices.js";
import DetailModal from "../../Modal/DetailModal.jsx";
import leaveEntitlementServices from "../../services/leaveEntitlementServices.js";

const LeaveEntitlement = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [leaves, setLeaves] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState(searchParams.get("leave_entitlements_search") || "");
    const [comment, setComment] = useState("");
    const [data, setData] = useState({    });
    const currentPage = Number(searchParams.get("leave_entitlements_page")) || 1;
    const {t} = useTranslation();
    const isAdmin = utilServices.isAdmin();

    const {fieldErrors, generalError, setErrors, clearErrors} = useErrors()

    const fetchLeaves = useCallback(async () => {
        try {
            const response = await leaveEntitlementServices.getLeaveEntitlements(currentPage, search, rowsPerPage);
            setLeaves(response.data.payload.data);
            setTotalPages(response.data.payload.meta.lastPage || 1);
        } catch (err) {
            setErrors(err);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, search, rowsPerPage]);

    const getLeaveById = async (id) => {
        await leaveServices.getLeaveById(id)
            .then(res => {
                setData(res.data.payload);
            })
            .catch(err => {
                setErrors(err);
            })
    }

    useEffect(() => {
        if (!searchParams.get("leave_entitlements_page")) {
            setSearchParams((prevParams) => {
                prevParams.set("leave_entitlements_page", 1);
            });
        }
        const getLeaves = setTimeout(() => {
            setIsLoading(true);
            fetchLeaves();
        }, 500);
        return () => clearTimeout(getLeaves);
    }, [currentPage, search, rowsPerPage]);


    useEffect(() => {
        updateSearchParams(setSearchParams, currentPage, search, { pageName: "leave_entitlements_page", searchName: "leave_entitlements_search" });
    }, [search]);

    const columns = useMemo(
        () => [
            {
                key:"id",
                label: "ID",
                render: (_, row) => <span className="font-semibold">{row.user.employeeId}</span>,
            },
            {
                key:"name",
                label: capitalize(t('name')),
                render: (_, row) => <span className="font-semibold">{row.user.name}</span>,
            },
            {
                key: "employeeRole",
                label: (
                    <>
                        {capitalize(t('role'))} / <br />
                        {capitalize(t('department'))}
                    </>
                ),
                render: (_, row) => (
                    <div className="flex flex-col">
                        <span className="font-semibold">{row.user.role}</span>
                        <span className="text-sm text-gray-500">{row.user.department}</span>
                    </div>
                ),
            },
            {
                key:"year",
                label: capitalize(t('year')),
                render: (val) => <span className="">{val} </span>,
            },
            {
                key:"totalDays",
                label: capitalize(t('totalLeave')),
                render: (_, row) => <div className={"flex-col flex"}>
                                    <span className="font-semibold">{row.totalDays} {t("days")}</span>
                                    <span className="">{capitalize(t("remaining"))} : {row.totalDays - row.usedDays} {t("days")}</span>
                                </div>,
            },
            {
                key:"usedDays",
                label: capitalize(t('usedLeave')),
                render: (val) => <span className="">{val} {t("days")}</span>,
            },

            {
                key: "action",
                label: capitalize(t('action')),
                render: (_, row) => (
                    <Action
                        show = {{
                            onClick:() => {
                                getLeaveById(row.id)
                            }
                        }}
                        edit= {
                            isAdmin && {
                                to: `/leaves/edit/${row.id}`
                            }
                        }
                    />


                ),
            },
        ],
        []
    );

    const header = {
        title: capitalize(t('leaveEntitlements.list')),

    };

    const pagination = {
        setSearch,
        setRowsPerPage,
        rowsPerPage,
        setSearchParams,
        search,
        searchParams,
        totalPages,
        currentPage,
        pageName: "leave_entitlements_page",
    };

    return(
        <>
            <DataTable header={header} columns={columns} items={leaves} pagination={pagination} isLoading={isLoading} />
            </>
    );
};

export default LeaveEntitlement;
