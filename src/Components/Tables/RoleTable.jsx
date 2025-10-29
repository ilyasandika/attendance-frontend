import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "../DataTable/DataTable.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import { capitalize, updateSearchParams } from "../../utils/helper.js";
import roleServices from "../../services/roleServices.js";
import utilServices from "../../services/utilServices.js";
import { useTranslation } from "react-i18next";
import Action from "../Button/Action.jsx";
import ConfirmModal from "../../Modal/ConfirmModal.jsx";
import departmentServices from "../../services/departmentServices.js";

const RoleTable = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [roles, setRoles] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState(searchParams.get("roles_search") || "");
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const currentPage = Number(searchParams.get("roles_page")) || 1;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const fetchRoles = useCallback(async () => {
        try {
            const response = await roleServices.getRoles(currentPage, search, rowsPerPage);
            setRoles(response.data.payload.data);
            setTotalPages(response.data.payload.meta.lastPage || 1);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, search, rowsPerPage]);

    const deleteRole = async (id) => {
               await roleServices.deleteRole(id)
            .then(res => {
                setDeleteModal(false);
                fetchRoles();
                navigate(location.pathname, {
                    state: {success: capitalize(t("successDeleteRole"), false)}
                })
            })
            .catch(error => {
                console.error(error)
            })
    };

    useEffect(() => {
        if (!searchParams.get("roles_page")) {
            setSearchParams((prevParams) => {
                prevParams.set("roles_page", 1);
                return prevParams;
            });
        }

        const getRoles = setTimeout(() => {
            setIsLoading(true);
            fetchRoles();
        }, 500);

        return () => clearTimeout(getRoles);
    }, [currentPage, search, rowsPerPage]);

    useEffect(() => {
        updateSearchParams(setSearchParams, currentPage, search, {
            pageName: "roles_page",
            searchName: "roles_search",
        });
    }, [search]);

    const columns = useMemo(
        () => [
            {
                key: "name",
                label: capitalize(t("roles.name")),
                render: (_, row) => (
                    <div className="flex flex-col">
                        <span className="font-bold">{row.name}</span>
                        {row.default ? (
                            <span className="text-xs text-green-600 font-semibold">Default</span>
                        ) : null}
                    </div>
                ),
            },
            {
                key: "description",
                label: capitalize(t("description")),
                render: (_, row) => <span>{row.description}</span>,
            },
            {
                key: "action",
                label: capitalize(t("action")),
                render: (_, row) => (
                    <Action
                        edit={{
                            to: `/departments-roles/roles/edit/${row.roleId}`
                        }}
                        dump={{
                            onClick: () => {
                                setDeleteId(row.roleId);
                                setDeleteModal(true);
                            },
                            disabled: row.isUsed,
                            message: capitalize(t("roles.inUse"), false)
                        }}
                    />
                ),
            },
        ],
        []
    );

    const header = {
        title: capitalize(t("roles.list")),
        button: {
            link: "roles/add",
            text: capitalize(t("roles.add")),
        },
    };

    const pagination = {
        setSearch,
        setSearchParams,
        search,
        setRowsPerPage,
        rowsPerPage,
        searchParams,
        totalPages,
        currentPage,
        pageName: "roles_page",
    };

    return (
        <>
            <DataTable
                header={header}
                columns={columns}
                items={roles}
                pagination={pagination}
                isLoading={isLoading}
            />
            {deleteModal && (
                <ConfirmModal 
                    isOpen={deleteModal} 
                    onClose={() => setDeleteModal(false)} 
                    onConfirm={() => deleteRole(deleteId)}
                />
            )}
        </>
    );
};

export default RoleTable;