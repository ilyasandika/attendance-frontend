import SuggestionSelect from "../Components/Form/SuggestionSelect.jsx";
import TextBox from "../Components/Form/TextBox.jsx";
import Button from "../Components/Button/Button.jsx"
import {useEffect, useState} from "react";
import reportServices from "../services/ReportServices.js";
import utilServices from "../services/utilServices.js";
import ReportTable from "../Components/Tables/ReportTable.jsx";
import Dropdown from "../Components/Form/Dropdown.jsx";
import {useErrors} from "../hooks/useErrors.jsx";
import {capitalize} from "../utils/helper.js";
import {useTranslation} from "react-i18next";

const Report = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [year, setYear] = useState("");
    const [availYear, setAvailYear] = useState([]);
    const [openTable, setOpenTable] = useState(false);
    const isAdmin = utilServices.isAdmin();
    const [yearEmptyMessage, setYearEmptyMessage] = useState("");
    const [userEmptyMessage, setUserEmptyMessage] = useState("");

    const {fieldErrors, generalError, setErrors, clearErrors, removeErrorsByField} = useErrors();

    const {t} = useTranslation();
    const handleSubmit = () => {

        if (year === "" || selectedId === "") {
            setYearEmptyMessage(capitalize(t("periodeCantBeEmpty")));
            setUserEmptyMessage(capitalize(t("userCantBeEmpty")))
            return;
        }

        if (year === "") {
            setYearEmptyMessage(capitalize(t("periodeCantBeEmpty")));
            return;
        }

        if (selectedId === "") {
            setUserEmptyMessage(capitalize(t("userCantBeEmpty")))
            return;
        }

        setOpenTable(true);
    }

    const getAvailYears = async () => {

        await reportServices.getAvailableReportYear(selectedId)
            .then(res => {
                setAvailYear(res.data.payload.map(y => ({
                    id: y,
                    name: y
                })));
            })
            .catch(err => {
                setErrors(err);
            });
    }
        useEffect(() => {
            if (!isAdmin) {
                const id = utilServices.getUserId();
                setSelectedId(id);
            }
            getAvailYears();
        }, [])

        return (
            <div className="space-y-6">
                <div className="p-4 flex w-full bg-white rounded-xl items-end justify-between gap-4">
                    {isAdmin &&
                        <div className={"flex-3"}>
                            <TextBox type={"suggestion"}
                                     label={"User"}
                                     handleChange={(e) => {
                                         setUserEmptyMessage("");
                                         setSelectedId(e.value)
                                     }}
                                     error={userEmptyMessage? userEmptyMessage : false}
                            />
                        </div>
                    }
                    <div className={"flex-1"}>
                        <Dropdown
                            label={"Periode"}
                            items={availYear}
                            defaultValue={year}
                            handleChange={(e) => {
                                setYearEmptyMessage("");
                                setYear(e.target.value);
                            }}
                            error={yearEmptyMessage? yearEmptyMessage : false}
                        />
                    </div>
                    <Button text={"Generate"} onClick={handleSubmit}/>
                </div>

                {openTable && (
                    <ReportTable userId={selectedId} year={year}/>
                )}


            </div>
        );
    }

export default Report;