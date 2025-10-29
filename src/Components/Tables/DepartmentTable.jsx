import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "../DataTable/DataTable.jsx";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import show from "../../assets/icons/show.svg";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {capitalize, updateSearchParams} from "../../utils/helper.js";
import departmentServices from "../../services/departmentServices.js";
import utilServices from "../../services/utilServices.js";
import {useTranslation} from "react-i18next";
import Action from "../Button/Action.jsx";
import ConfirmModal from "../../Modal/ConfirmModal.jsx";

const DepartmentTable = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [departments, setDepartments] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState(searchParams.get("departments_search") || "");
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const currentPage = Number(searchParams.get("departments_page")) || 1;
    const {t} = useTranslation();
    const navigate = useNavigate();
    const fetchDepartments = useCallback(async () => {
        try {
            const response = await departmentServices.getDepartments(currentPage, search, rowsPerPage);
            setDepartments(response.data.payload.data);
            setTotalPages(response.data.payload.meta.lastPage || 1);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, search, rowsPerPage]);

    const deleteDepartment = async (id) => {

        await departmentServices.deleteDepartment(id)
            .then(res => {
                setDeleteModal(false);
                fetchDepartments();
                navigate(location.pathname, {
                    state: {success: capitalize(t("successDeleteDepartment"), false)}
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    useEffect(() => {
        if (!searchParams.get("departments_page")) {
            setSearchParams((prevParams) => {
                prevParams.set("departments_page", 1);
                return prevParams;
            });
        }

        const getDepartments = setTimeout(() => {
            setIsLoading(true);
            fetchDepartments();
        }, 500);

        return () => clearTimeout(getDepartments);
    }, [currentPage, search, rowsPerPage]);

    useEffect(() => {
        updateSearchParams(setSearchParams, currentPage, search, {
            pageName: "departments_page",
            searchName: "departments_search",
        });
    }, [search]);

    const columns = useMemo(
        () => [
            {
                key: "name",
                label: capitalize(t('departments.name')),
                render: (_, row) => (
                    <div className="flex flex-col">
                        <span className="font-bold">{row.name}</span>
                        {row.default ? <span className="text-xs text-green-600 font-semibold">Default</span> : null}
                    </div>
                ),
            },
            {
                key: "description",
                label: capitalize(t('description')),
                render: (_, row) => <span>{row.description}</span>,
            },
            {
                key: "action",
                label: capitalize(t('action')),
                render: (_, row) => (
                    <Action
                        edit={
                        {to:`/departments-roles/departments/edit/${row.departmentId}`}}
                        dump={{onClick:() => {
                            setDeleteId(row.departmentId);
                            setDeleteModal(true)
                        }, disabled: row.isUsed, message: capitalize(t("departments.inUse"), false) }} />

                ),
            },
        ],
        []
    );

    const header = {
        title: capitalize(t("departments.list")),
        button: {
            link: "departments/add",
            text: capitalize(t('departments.add')),
        },
    };

    const pagination = {
        setSearch,
        setSearchParams,
        setRowsPerPage,
        rowsPerPage,
        search,
        searchParams,
        totalPages,
        currentPage,
        pageName: "departments_page",
    };

    return (
       <>
           <DataTable
               header={header}
               columns={columns}
               items={departments}
               pagination={pagination}
               isLoading={isLoading}
           />
           {deleteModal && (
               <ConfirmModal isOpen={deleteModal} onClose={() => setDeleteModal(false)} onConfirm={() => deleteDepartment(deleteId)}/>
           )}
       </>
    );
};

export default DepartmentTable;
