import { useCallback, useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable.jsx";
import edit from "../../assets/icons/edit.svg";
import trash from "../../assets/icons/trash.svg";
import { Link, useSearchParams } from "react-router-dom";
import {capitalize, updateSearchParams} from "../../utils/helper.js";
import userServices from "../../services/userServices.js";
import {useTranslation} from "react-i18next";
import ConfirmModal from "../../Modal/ConfirmModal.jsx";

const UserTable = () => {
    const { t } = useTranslation();
    const [idDelete, setIdDelete] = useState(null);
    const [confirmModal, setConfirmModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState(searchParams.get("search") || "");

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
        try {
            await userServices.deleteUser(id);
            alert("Success delete a user");
            setConfirmModal(false);
            fetchUsers();
        } catch (error) {
            console.error(error);
            setConfirmModal(false);
        }
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
            render: (val) =>
                val === 1 ? (
                    <span className="bg-green-400/10 text-green-400 px-4 py-2 rounded-lg font-bold">{capitalize(t('active'))}</span>
                ) : (
                    <span className="bg-gray-400/10 px-4 py-2 rounded-lg text-gray-400 font-bold">{capitalize(t('inactive'))}</span>
                ),
        },
        {
            key: "id",
            label: capitalize(t('action')),
            render: (_, row) => (
                <div className="flex">
                    <Link to={`/users/edit/${row.id}`} className="mr-6 cursor-pointer">
                        <img src={edit} className="w-4" />
                    </Link>
                    {/*<button className="cursor-pointer" onClick={() => deleteUser(row.id)}>*/}
                    {/*    <img src={trash} className="w-4" />*/}
                    {/*</button>*/}
                    <button className="cursor-pointer" onClick={() =>{ setConfirmModal(true); setIdDelete(row.id)}}>
                        <img src={trash} className="w-4" />
                    </button>
                </div>
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
