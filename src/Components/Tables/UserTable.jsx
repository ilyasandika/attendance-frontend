import { useCallback, useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable.jsx";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {capitalize, getStatusColor, updateSearchParams} from "../../utils/helper.js";
import userServices from "../../services/userServices.js";
import {useTranslation} from "react-i18next";
import ConfirmModal from "../../Modal/ConfirmModal.jsx";
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/16/solid/index.js";
import Action from "../Button/Action.jsx";

const UserTable = ({setSuccessMessage}) => {
    const { t } = useTranslation();
    const [idDelete, setIdDelete] = useState(null);
    const [confirmModal, setConfirmModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const navigate = useNavigate();
    const currentPage = Number(searchParams.get("page")) || 1;

    const fetchUsers = useCallback(async () => {

        try {
            const response = await userServices.getUsers(currentPage, search);
            setUsers(response.data.payload.users);
            setTotalPages(response.data.payload.meta.lastPage || 1);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, search]);

    const deleteUser = async (id) => {
        await userServices.deleteUser(id)
            .then(res => {
                setConfirmModal(false);
                navigate(location.pathname, { state: { success: capitalize(t("userSuccessDelete"), false) } });
            })
            .catch(err => {
                setConfirmModal(false);
            })
    };

    //first mount
    useEffect(() => {
        if (!searchParams.get("page")) {
            setSearchParams((prevParams) => {
                prevParams.set("page", 1);
            });
        }
        const getUsers = setTimeout(() => {
            setIsLoading(true);
            fetchUsers();
        }, 500);
        return () => clearTimeout(getUsers);
    }, [currentPage, search]);

    useEffect(() => {
        updateSearchParams(setSearchParams, currentPage, search);
    }, [search]);

    const columns = [
        {
            key: "employeeId",
            label: "ID",
            render : (_, row) => <Link to={`/profile/${row.id}`}>{row.employeeId}</Link>
        },
        {
            key: "name",
            label: capitalize(t('name')),
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
                    <span className="font-semibold">{row.role}</span>
                    <span className="text-sm text-gray-500">{row.department}</span>
                </div>
            ),
        },
        {
            key: "email",
            label: "Email",
        },
        {
            key: "dateCreated",
            label: capitalize(t('dateCreated')),
            render: (val) => new Date(val * 1000).toLocaleString("id-ID"),
        },
        {
            key: "status",
            label: capitalize(t('accountStatus')),
            render: (val) => <span className={`${getStatusColor(val ? "active" : "inactive", true)}`}>{capitalize(t(val ? "active" : "inactive"))}</span>
        },

        {
            key: "id",
            label: capitalize(t('action')),
            render: (_, row) => (
                <Action
                    edit={ {to: `/users/edit/${row.id}`} }
                    dump={{
                        onClick:() => {
                            setConfirmModal(true);
                            setIdDelete(row.id);
                        },
                        // disabled: row.isUsed, message: capitalize(t("shift.inUse"), false)
                    }}
                    show={{
                        to: `/profile/${row.id}`,
                    }}



                />
            ),
        },
    ];

    const header = {
        title: capitalize(t('user.list')),
        button: {
            link: "/users/add",
            text: capitalize(t('user.add')),
        },
    };

    const pagination = {
        setSearch,
        setSearchParams,
        search,
        searchParams,
        totalPages,
        currentPage,
        pageName: "page",
    };

    return (
        <>
            <DataTable header={header} columns={columns} items={users} pagination={pagination} isLoading={isLoading} />
             {confirmModal && <ConfirmModal isOpen={confirmModal} onClose={() => setConfirmModal(false) } onConfirm={() => deleteUser(idDelete)} message={t('user.deleteMessage')} header={capitalize(t('user.deleteHeader'))}/>}
        </>
    );
};

export default UserTable;
