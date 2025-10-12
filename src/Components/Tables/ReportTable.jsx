import { useEffect, useState } from "react";
import DataTable from "../DataTable/DataTable.jsx";
import { capitalize } from "../../utils/helper.js";
import { useTranslation } from "react-i18next";
import reportServices from "../../services/ReportServices.js";
import Action from "../Button/Action.jsx";

const ReportTable = ({ userId, year }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [reports, setReports] = useState([]);

    const handleDownloadExcel = (month) => {
        reportServices.getUserReportExcel(userId, month, year);
    }



    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await reportServices.getUserReportByYear(userId, year);
                const payload = response.data.payload;
                console.log(payload);
                // ubah object {1:{},2:{}} jadi array [{month:1,...},{month:2,...}]
                const data = Object.entries(payload).map(([month, val]) => ({
                    month: Number(month),
                    name: val.name,
                    ...val.data,
                }));

                setReports(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
                console.log(reports)
            }
        };

        fetchReport();
    }, [userId, year]);

    const columns = [
        {
            key: "name",
            label: capitalize(t("month"))
        },
        {
            key: "total",
            label: capitalize(t("total"))
        },
        {
            key: "absent",
            label: capitalize(t("absent")),
            render: (_, row) => `${row.absent.value}`
        },
        {
            key: "late",
            label: capitalize(t("late")),
            render: (_, row) => `${row.late.value}`
        },
        {
            key: "earlyLeave",
            label: capitalize(t("earlyLeave")),
            render: (_, row) => `${row.earlyLeave.value}`
        },
        {
            key: "onTime",
            label: capitalize(t("onTime")),
            render: (_, row) => `${row.onTime.value}`
        },
        {
            key: "leave",
            label: capitalize(t("leave")),
            render: (_, row) => `${row.leave.value}`
        },
        {
            key: "checkInOutsideLocation",
            label: capitalize(t("checkInOutside")),
            render: (_, row) => `${row.checkInOutsideLocation.value}`
        },
        {
            key: "checkOutOutsideLocation",
            label: capitalize(t("checkOutOutside")),
            render: (_, row) => `${row.checkOutOutsideLocation.value}`
        },
        {
            key: "action",
            label: capitalize(t("action")),
            render: (_, row) =>
                <Action
                        excel={{

                            onClick: () => handleDownloadExcel(row.month),
                        }}
                />
}
    ];

    const header = {
        title: `Report ${year}`,
    };

    return (
        <DataTable
            header={header}
            columns={columns}
            items={reports}
            isLoading={isLoading}
            pagination={false}
        />
    );
};

export default ReportTable;
