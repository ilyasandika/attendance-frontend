import { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "../DataTable/DataTable.jsx";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {
    capitalize, formattedDate,
    getAccountUserId,
    getStatusColor,
    getUserId,
    timestampToObject,
    updateSearchParams
} from "../../utils/helper.js";
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

const LeaveTable = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [leaves, setLeaves] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [deleteModal, setDeleteModal] = useState(false);
    const [formModal, setFormModal] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [search, setSearch] = useState(searchParams.get("leaves_search") || "");
    const [comment, setComment] = useState("");
    const [data, setData] = useState({    });
    const currentPage = Number(searchParams.get("leaves_page")) || 1;
    const {t} = useTranslation();
    const isAdmin = utilServices.isAdmin();
    const userId = getAccountUserId();
    const navigate = useNavigate();

    const {fieldErrors, generalError, setErrors, clearErrors} = useErrors()

    const fetchLeaves = useCallback(async () => {
        try {
            let response;
            if (isAdmin) {
                response = await leaveServices.getLeaves(currentPage, search, ["pending", "approved", "rejected"]);
            } else {
                response = await leaveServices.getLeavesByUserId(currentPage, search, ["pending", "approved", "rejected", "draft"], userId);
            }
            setLeaves(response.data.payload.data);
            setTotalPages(response.data.payload.meta.lastPage || 1);
        } catch (err) {
            setErrors(err);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, search]);

    const deleteLeave = async (id) => {
        await leaveServices.deleteLeave(id)
            .then(_ => {
                fetchLeaves();
                setDeleteModal(false);
                navigate(location.pathname, { state: { success: capitalize(t("successDeleteLeave"), false) } });
            })
            .catch(err => {
                setErrors(err);
            });
    };

    const getLeaveById = async (id) => {
        await leaveServices.getLeaveById(id)
            .then(res => {
                setData(res.data.payload);
            })
            .catch(err => {
                setErrors(err);
            })
    }

    const approveLeave = async (id) => {
        await leaveServices.approveLeave(id)
            .then(_ => {
                alert("Success approve leave");
                fetchLeaves();
            })
            .catch(err => {
                setErrors(err);
            })
    }

    const rejectLeave = async (id, comment) => {
        await leaveServices.rejectLeave(id, comment)
            .then(_ => {
                alert("Success reject leave");
                fetchLeaves();
                setFormModal(false);
                setComment("");
                clearErrors();
            })
            .catch(err => {
                setErrors(err);
            })
            .finally(() => {

            });
    }

    useEffect(() => {
        if (!searchParams.get("leaves_page")) {
            setSearchParams((prevParams) => {
                prevParams.set("leaves_page", 1);
            });
        }
        const getLeaves = setTimeout(() => {
            setIsLoading(true);
            fetchLeaves();
        }, 500);
        return () => clearTimeout(getLeaves);
    }, [currentPage, search]);


    useEffect(() => {
        updateSearchParams(setSearchParams, currentPage, search, { pageName: "leaves_page", searchName: "leaves_search" });
    }, [search]);

    const columns = useMemo(
        () => [
            {
                key:"id",
                label: "ID",
                render : (_, row) => <Link to={`/profile/${row.user.id}`}>{row.user.employeeId}</Link>
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
                key: "type",
                label: capitalize(t('type')),
                render: (_, row) => <span className="font-semibold capitalize">{capitalize(t(row.type))}</span>,
            },
            {
                key: "date",
                label: capitalize(t('date')),
                render: (_, row) => (
                    <span className="flex items-center gap-2">
                        {new Date(row.startDate * 1000).toLocaleDateString("id-ID")}
                        <ArrowLongRightIcon className="w-4 inline-block" />
                        {new Date(row.endDate * 1000).toLocaleDateString("id-ID")}
                    </span>
                ),
            },
            {
                key: "totalDays",
                label: capitalize(t('totalDays')),
                render: (_, row) => <span>{row.totalDays} {t('days')}</span>,
            },
            {
                key: "status",
                label: "Status",
                render: (_, row) => <span className={`${getStatusColor(row.status, true)} capitalize`}>{row.status}</span>,
            },
            {
                key: "action",
                label: capitalize(t('action')),
                render: (_, row) => (
                    <Action
                        show = {{
                            onClick:() => {
                                getLeaveById(row.id)
                                setDetailModal(true);
                            }
                        }}
                        check={ isAdmin && {
                            onClick:() => {
                                approveLeave(row.id);
                            },
                            message: capitalize(t('approve'), false),
                        }}
                        reject={isAdmin && {
                            onClick:()=>{
                                setSelectedId(row.id);
                                setFormModal(true)
                            },
                            message: capitalize(t('reject'), false)
                        }}
                        attachment={{
                            url: row.attachmentUrl,
                        }}
                        edit= {
                            !isAdmin && {
                                to: `/leaves/edit/${row.id}`
                            }
                        }
                        dump={{
                            onClick:() => {
                                setSelectedId(row.id);
                                setDeleteModal(true)
                            },
                            disabled: row.status === "approved" || row.status === "rejected",
                            message : capitalize(t("cantRemoveApprovedOrRejectedLeave"), false)
                        }}
                    />


                ),
            },
        ],
        []
    );

    const header = {
        title: capitalize(t('leaves.list')),
        button: {
            link: "/leaves/add",
            text: capitalize(t("addLeave")),
        },
    };

    const pagination = {
        setSearch,
        setSearchParams,
        search,
        searchParams,
        totalPages,
        currentPage,
        pageName: "leaves_page",
    };

    return(
        <>
            <DataTable header={header} columns={columns} items={leaves} pagination={pagination} isLoading={isLoading} />
            <ConfirmModal isOpen={deleteModal} onClose={() => setDeleteModal(false)} onConfirm={() => deleteLeave(selectedId)}/>
            <FormModal isOpen={formModal} onClose={() => setFormModal(false)} onConfirm={() => rejectLeave(selectedId, comment)} header={capitalize(t('confirmReject'), false)}>
                <div className="text-left">
                    <TextBox label={capitalize(t('comment'))} id="comment" name="comment" error={fieldErrors?.comment} value={comment} handleChange={(e) => {
                        setComment(e.target.value)
                        clearErrors();
                    }} />
                </div>
            </FormModal>
            <DetailModal isOpen={detailModal} onClose={()=> {
                setDetailModal(false)
                setSelectedId(null)
                setData({    })
            }} type={"detail"}>
                    <div className="space-y-2">
                        <DetailLeaveItem label={"ID Pegawai"}       value={data?.user?.employeeId || ""}/>
                        <DetailLeaveItem label={"Nama Pegawai"}     value={data?.user?.name || ""}/>
                        <DetailLeaveItem label={"Jabatan"}          value={data?.user?.role || ""}/>
                        <DetailLeaveItem label={"Departemen"}       value={data?.user?.department || ""}/>
                        <DetailLeaveItem label={"Type"}             value={capitalize(t(data?.type)) || ""}/>
                        <DetailLeaveItem label={"Mulai Cuti"}       value={formattedDate(data?.startDate) || ""}/>
                        <DetailLeaveItem label={"Berakhir Cuti"}    value={formattedDate(data?.endDate) || ""}/>
                        <DetailLeaveItem label={"Total Hari Cuti"}  value={data?.totalDays || ""}/>
                        <DetailLeaveItem label={"Lampiran"}         value={<a href={data?.attachmentUrl || ""} target="_blank" className="text-blue-500">Klik untuk melihat</a>}/>
                        <DetailLeaveItem label={"Alasan"}           value={data?.reason || ""}/>
                        <DetailLeaveItem label={"Status"}           value={<span className={`${getStatusColor(data?.status)} font-semibold capitalize`}>{data?.status}</span>}/>
                        <DetailLeaveItem label={"Dikonfirmasi oleh"}   value={data?.approver?.name || ""}/>
                    </div>
            </DetailModal>

        </>
    );
};

const DetailLeaveItem = ({label, value}) => {
    return (
        <div className="text-left w-full grid grid-cols-[40%_5%_55%]">
            <label className={`font-semibold`}>{label}</label>
            <span>:</span>
            <span>{value}</span>
        </div>
    )
}


export default LeaveTable;
