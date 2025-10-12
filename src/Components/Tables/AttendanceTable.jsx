import { useCallback, useEffect, useMemo, useState } from "react";
import {Link, useSearchParams} from "react-router-dom";
import {capitalize, getStatusColor, minutesToHM, updateSearchParams} from "../../utils/helper.js";
import attendanceServices from "../../services/attendanceServices.js";
import DataTable from "../DataTable/DataTable.jsx"; //
import AttendanceModal from "../../Modal/AttendanceModal.jsx";
import utilServices from "../../services/utilServices.js";
import show from "../../assets/icons/show.svg";
import {useTranslation} from "react-i18next";
import ConfirmModal from "../../Modal/ConfirmModal.jsx";
import {useErrors} from "../../hooks/useErrors.jsx";


const AttendanceTable = () => {
    const {t} = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [attendances, setAttendances] = useState([]);
    const [search, setSearch] = useState(searchParams.get("attendance_search") || "");
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const {fieldErrors, generalError, setErrors, clearErrors} = useErrors()

    const currentPage = Number(searchParams.get("attendance_page")) || 1;

    const fetchAttendances = useCallback(async () => {
        try {
            let response = {};
            if (utilServices.isAdmin()) {
                response = await attendanceServices.getAttendances(currentPage, search);
            } else {
                response = await attendanceServices.getAttendanceByLogin(currentPage, search)
            }
            setAttendances(response.data.payload.data);
            setTotalPages(response.data.payload.meta.lastPage || 1);
        } catch (error) {
            console.error("Error fetching attendance data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, search]);

    useEffect(() => {
        if (!searchParams.get("attendance_page")) {
            setSearchParams((prev) => {
                prev.set("attendance_page", 1);
                return prev;
            });
        }

        const timeout = setTimeout(() => {
            setIsLoading(true);
            fetchAttendances();
        }, 500);

        return () => clearTimeout(timeout);
    }, [currentPage, search]);

    useEffect(() => {
        updateSearchParams(setSearchParams, currentPage, search, {
            pageName: "attendance_page",
            searchName: "attendance_search",
        });
    }, [search]);

    const handleOpenPhoto = (link) => {
        window.open(link, "_blank");
    }

    const columns = useMemo(() => [
        {
            key: "employeeId",
            label: "ID",
            render : (_, row) => <Link to={`/profile/${row.userId}`}>{row.employeeId}</Link>
        },
        {
            key: "name",
            label: capitalize(t('name')),
            render: (_, row) => row.employeeName,
        },
        {
            key: "role_department",
            label: `${capitalize(t('role'))}/${capitalize(t('department'))}`,
            render: (_, row) => (
                <div className="flex flex-col">
                    <span className="font-semibold">{row.employeeRole}</span>
                    <span>{row.employeeDepartment}</span>
                </div>
            ),
        },
        {
            key: "date",
            label: capitalize(t('date')),
            render: (_, row) => new Date(row.date * 1000).toLocaleDateString("id-ID", { hour12: false }),
        },
        {
            key: "status",
            label: "Status",
            render: (_, row) => {
                const isAbsent = row.checkInStatus === "absent";
                const isNotRecorded = row.checkInStatus === null;
                const statusText = isNotRecorded ? "notRecorded" : isAbsent ? "absent" : "present";

                return <span className={`${getStatusColor(statusText)} font-medium`}>{capitalize(t(statusText))}</span>;
            }
        },
        {
            key: "check_in",
            label: capitalize(t('clockIn')),
            render: (_, row) => {
                const time = row.checkInTime
                    ? new Date(row.checkInTime * 1000).toLocaleTimeString("id-ID", {hour12: false})
                    : null;

                const status = row.checkInStatus;

                return row.checkInTime ? (
                    <div className="flex flex-col space-y-1">
                        <span className={`${getStatusColor(status)} font-bold`}>{time}</span>
                        <span className={`${getStatusColor(status)} font-medium`}>{capitalize(t(status))}</span>
                    </div>
                ) : "-";
            }
        },
        {
            key: "check_out",
            label: capitalize(t('clockOut')),
            render: (_, row) => {
                const time = row.checkOutTime
                    ? new Date(row.checkOutTime * 1000).toLocaleTimeString("id-ID", {hour12: false})
                    : null;

                const status = row.checkOutStatus;

                return row.checkOutTime && row.checkInTime ? (
                    <div className="flex flex-col space-y-1">
                        <span className={`${getStatusColor(status)} font-bold`}>{time}</span>
                        <span className={`${getStatusColor(status)} font-medium`}>{capitalize(t(status))}</span>
                    </div>
                ) : "-";
            }
        },
        {
            key: "hours",
            label: capitalize(t('workHours')),
            render: (_, row) => {
                if (row.duration) {
                    const {hours, minutes} = minutesToHM(row.duration);
                    return `${hours} ${t('h')} ${minutes} ${t('m')}`
                } else {
                    return "-"
                }
            }

        },
        {
            key: "actions",
            label: capitalize(t('action')),
            render: (_, row) => (
                <Link className=" cursor-pointer" to={`/attendances/detail/${row.attendanceId}`}>
                    <img src={show} className="w-5" />
                </Link>
            )

        },
    ], []);


    // src={`${import.meta.env.VITE_API_URL}/storage/${user.profilePicturePath}`}
    const pagination = {
        setSearch,
        setSearchParams,
        search,
        searchParams,
        totalPages,
        currentPage,
        pageName: "attendance_page",
    };

    const header = {
        title: capitalize(t("attendanceTable")),
        button: {
            text: capitalize(t("clock")),
            onClick: () => setAttendanceModalOpen(true),
        },
    };

    const handleModalClose = () => {
        setAttendanceModalOpen(false)
        fetchAttendances();
    };

    const handleSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("latitude", parseFloat(data.latitude).toFixed(7));
            formData.append("longitude", parseFloat(data.longitude).toFixed(7));
            formData.append("comment", data.comment);
            formData.append("photo", data.photo);
            formData.append("address", data.address); // pastikan ini adalah File, bukan base64 string
            await attendanceServices.checkInOut(formData);
            alert("Absensi berhasil");
        } catch (error) {
            setModalOpen(true);
            setErrors(error);
        }
        setAttendanceModalOpen(false);
        fetchAttendances();
    };

    return (
        <>
            <DataTable
                header={header}
                columns={columns}
                items={attendances}
                pagination={pagination}
                isLoading={isLoading}
            />
            {attendanceModalOpen && (
                <AttendanceModal onClose={handleModalClose} onSubmit={handleSubmit} />
            )}

            {
                generalError && (
                    <ConfirmModal type="notification" isOpen={modalOpen} onClose={() => setModalOpen(false)} onConfirm={() => setModalOpen(false)} header={capitalize(t('unableToCheck'), false)} message={generalError}/>
                )
            }
        </>
    );
};

export default AttendanceTable;
