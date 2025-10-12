import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import shiftServices from "../../services/shiftServices";
import ShiftForm from "../forms/ShiftForm.jsx";
import {useErrors} from "../../hooks/useErrors.jsx";
import {useTranslation} from "react-i18next";
import {capitalize, scrollToTop} from "../../utils/helper.js";

const UpdateShiftPage = () => {
    const { id } = useParams();
    const [shift, setShift] = useState(null);
    const [loading, setLoading] = useState(true);
    const {t} = useTranslation();
    const navigation = useNavigate();
    const {fieldErrors, setErrors, removeErrorsByField} = useErrors();

    const handleSubmit = async (id, data) => {
        console.log(id)
        await shiftServices.updateShift(id, data)
            .then(res => {
                navigation("/shifts-locations", {
                    state : {
                        success : capitalize(t("successUpdateShift"), false),
                    }
                })
            })
            .catch(e => {
                setErrors(e);
                scrollToTop();
            })
    };

    useEffect(() => {
        const fetchData = async () => {

                    await shiftServices.getShiftById(id)
                .then(res => {
                    setShift(res.data.payload);
                })
                .catch(e => {
                    console.error(e);
                })
                .finally(_ => {
                    setLoading(false);
                })
        };
        fetchData();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return <ShiftForm mode="edit" initialValues={shift} onSubmit={handleSubmit} fieldErrors={fieldErrors}  setErrors={setErrors}  removeErrorsByField={removeErrorsByField} />;
};

export default UpdateShiftPage;
