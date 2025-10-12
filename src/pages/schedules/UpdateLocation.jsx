import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import locationServices from "../../services/locationServices";
import LocationForm from "../forms/LocationForm";
import {useErrors} from "../../hooks/useErrors.jsx";
import {useTranslation} from "react-i18next";
import {data} from "autoprefixer";
import {capitalize} from "../../utils/helper.js";

const UpdateLocationPage = () => {
    const { id } = useParams();
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    const {fieldErrors, setErrors, removeErrorsByField} = useErrors();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleSubmit = async (data) => {
              await locationServices.updateLocation(id, data)
            .then(res => {
                navigate("/shifts-locations", {state : {
                        success: capitalize(t("successUpdateLocation"))
                    }})
            })
            .catch(e => {
                setErrors(e);
            })
    };

    useEffect(() => {
        const fetchData = async () => {
            await locationServices.getLocationById(id)
                .then(res => {
                    setLocation({
                        name: res.data.payload.name || "",
                        description: res.data.payload.description || "",
                        radius: res.data.payload.radius || "",
                        address: res.data.payload.address || "",
                        latitude: res.data.payload.latitude?.toString() || "-6.2",
                        longitude: res.data.payload.longitude?.toString() || "106.8",
                        default: res.data.payload.default || false,
                    });
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

    if (loading) return <div className="p-12">Loading...</div>;

    return <LocationForm mode="edit"
                         initialValues={location}
                         onSubmit={handleSubmit}
                         fieldErrors = {fieldErrors}
                         setErrors = {setErrors}
                         removeErrorsByField = {removeErrorsByField}
    />;
};

export default UpdateLocationPage;
