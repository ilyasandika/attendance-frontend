import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "../DataTable/DataTable.jsx";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import { Link, useSearchParams } from "react-router-dom";
import {capitalize, updateSearchParams} from "../../utils/helper.js";
import shiftServices from "../../services/shiftServices.js";
import {useTranslation} from "react-i18next";
import ConfirmModal from "../../Modal/ConfirmModal.jsx";
import Action from "../Button/Action.jsx";

const ShiftTable = () => {
    const {t} = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [shifts, setShifts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState(searchParams.get("shifts_search") || "");
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const currentPage = Number(searchParams.get("shifts_page")) || 1;

    const fetchShifts = useCallback(async () => {
        try {
            const response = await shiftServices.getShifts(currentPage, search);
            setShifts(response.data.payload.data);
            setTotalPages(response.data.payload.meta.lastPage || 1);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, search]);

    const deleteShifts = async (id) => {
        try {
            await shiftServices.deleteShift(id);
            alert("Success delete a shift");
            setDeleteModal(false);
            fetchShifts();
        } catch (error) {
            console.error(error);
        }
    };

    //first mount
    useEffect(() => {
        if (!searchParams.get("shifts_page")) {
            setSearchParams((prevParams) => {
                prevParams.set("shifts_page", 1);
            });
        }
        const getShifts = setTimeout(() => {
            setIsLoading(true);
            fetchShifts();
        }, 500);
        return () => clearTimeout(getShifts);
    }, [currentPage, search]);

    useEffect(() => {
        updateSearchParams(setSearchParams, currentPage, search, { pageName: "shifts_page", searchName: "shifts_search" });
    }, [search]);

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    const columns = useMemo(
        () => [
            {
                key: "name",
                label: capitalize(t('shift.name')),
                render: (_, row) => (
                    <div className="flex flex-col">
                        <span className="font-bold">{row.name}</span>
                        {row.default ? <span className="text-xs text-green-600 font-semibold">Default</span> : null}
                    </div>
                ),
            },
            ...days.map((day) => ({
                key: day,
                label: capitalize(t(day)),
                render: (_, row) =>
                    !row[day]?.isOn ? (
                        <span className="text-red-700 font-bold">{capitalize(t('shift.dayOff'))}</span>
                    ) : (
                        <div className="flex flex-col">
                            <span className="font-semibold">
                                {row[day]?.in.substring(0, 5)} - {row[day]?.out.substring(0, 5)}
                            </span>
                            <span className="text-xs text-gray-500">
                                B : {row[day]?.breakStart.substring(0, 5)} - {row[day]?.breakEnd.substring(0, 5)}
                            </span>
                        </div>
                    ),
            })),
            {
                key: "shiftId",
                label: capitalize(t('action')),
                render: (_, row) => (
                    <Action
                        edit={ {to: `/shifts-locations/shifts/edit/${row.id}`} }
                        dump={{onClick:() => {
                                setDeleteId(row.shiftId);
                                setDeleteModal(true)
                            }, disabled: row.isUsed, message: capitalize(t("shift.inUse"), false) }}
                    />
                ),
            },
        ],
        []
    );

    const header = {
        title: capitalize(t('shift.list')),
        button: {
            link: "shifts/add",
            text: capitalize(t('shift.add')),
        },
    };

    const pagination = {
        setSearch,
        setSearchParams,
        search,
        searchParams,
        totalPages,
        currentPage,
        pageName: "shifts_page",
    };

    return (
        <>
            <DataTable header={header} columns={columns} items={shifts} pagination={pagination} isLoading={isLoading} />
            {deleteModal && (
                <ConfirmModal isOpen={deleteModal} onClose={() => setDeleteModal(false)} onConfirm={() => deleteShifts(deleteId)} header={capitalize(t("shift.deleteHeader"))} message={t('shift.deleteMessage')}/>
            )}
        </>
    );
};

export default ShiftTable;
