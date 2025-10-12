import { useEffect, useState } from "react";
import TextBox from "../../Components/Form/TextBox.jsx";
import MapPicker from "../../Components/Map/MapPicker.jsx";
import { capitalize } from "../../utils/helper.js";
import { useTranslation } from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
import Button from "../../Components/Button/Button.jsx";

const LocationForm = ({ mode = "create", initialValues = {}, onSubmit, fieldErrors, removeErrorsByField, setErrors }) => {
    const { t } = useTranslation();


    const [form, setForm] = useState({
        name: "",
        description: "",
        radius: "",
        address: "",
        latitude: "-6.2",
        longitude: "106.8",
        default: false,
        ...initialValues,
    });

    useEffect(() => {
        if (initialValues && Object.keys(initialValues).length > 0) {
            setForm((prev) => ({
                ...prev,
                ...initialValues,
            }));
        }
    }, [initialValues]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });

        if(fieldErrors[name]) {
            removeErrorsByField(name);
        }
    };

    const handleLocationChange = ([lat, lng]) => {
        setForm({
            ...form,
            latitude: lat,
            longitude: lng,
        });

        if(fieldErrors["latitude"]) {
            removeErrorsByField("latitude");
        }

        if(fieldErrors["longitude"]) {
            removeErrorsByField("longitude");
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...form,
            latitude: parseFloat(form.latitude).toFixed(7),
            longitude: parseFloat(form.longitude).toFixed(7),
        });


    };

    return (
        <div className="bg-white p-12 rounded-xl w-full text-left">
            <h3 className="text-lg font-semibold mb-4">
                {capitalize(t(mode === "edit" ? "locations.edit" : "locations.add"))}
            </h3>
            <hr className="text-primary/20" />
            <form onSubmit={handleSubmit} className="space-y-10 mt-8 w-full">
                <div className="flex gap-10 w-full">
                    <div className="flex flex-col flex-1  justify-around space-y-2">
                        <div className="flex gap-4 ">
                            <div className="flex-1">
                                <TextBox
                                    label={capitalize(t('locations.name'))}
                                    name="name"
                                    value={form.name}
                                    handleChange={handleChange}
                                    error={fieldErrors?.name}
                                />
                            </div>
                            <div className="flex-1">
                                <TextBox
                                    label={`${capitalize(t('locations.radius'))} (meter)`}
                                    name="radius"
                                    value={form.radius}
                                    handleChange={handleChange}
                                    type="number"
                                    error={fieldErrors?.radius}
                                />
                            </div>
                        </div>
                        <TextBox
                            label={capitalize(t('description'))}
                            name="description"
                            value={form.description}
                            handleChange={handleChange}
                            type="text"
                            error={fieldErrors?.description}
                        />
                        <div>
                            <label className="block text-sm font-medium mb-1">{capitalize(t('address'))}</label>
                            <TextBox
                                type="textarea"
                                name="address"
                                value={form.address}
                                handleChange={handleChange}
                                rows={20}
                                className="w-full border px-3 h-40 py-2  rounded-md"
                                error={fieldErrors?.address}
                            />
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                            <input
                                type="checkbox"
                                name="default"
                                checked={form.default}
                                onChange={handleChange}
                            />
                            <span>{capitalize(t('setAsDefault'), false)}</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-around flex-1">
                        <div>
                            <h4 className="text-sm font-medium mb-2">{capitalize(t('locations.selectLocationOnMap'))}</h4>
                            <MapPicker
                                onChange={handleLocationChange}
                                center={[
                                    parseFloat(form.latitude) || -6.2,
                                    parseFloat(form.longitude) || 106.8,
                                ]}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <TextBox label="Latitude" name="latitude" value={form.latitude} handleChange={handleChange} />
                            <TextBox label="Longitude" name="longitude" value={form.longitude} handleChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Link to="/shifts-locations" className="border border-primary text-primary px-4 py-2 rounded-md">
                        {capitalize(t("cancel"))}
                    </Link>
                    <Button
                        type="submit"
                        text={capitalize(t(mode === "edit" ? "locations.update" : "locations.create"))}
                    />
                </div>
            </form>
        </div>
    );
};

export default LocationForm;
