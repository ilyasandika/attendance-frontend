import { useEffect, useState } from "react";
import departmentServices from "../../services/departmentServices.js";
import {useNavigate, useParams} from "react-router-dom";
import roleServices from "../../services/roleServices.js";
import locationServices from "../../services/locationServices.js";
import shiftServices from "../../services/shiftServices.js";
import userServices from "../../services/userServices.js";
import TextBox from "../../Components/Form/TextBox.jsx";
import GenderDropdown from "../../Components/Form/GenderDropdown.jsx";
import Dropdown from "../../Components/Form/Dropdown.jsx";
import { CameraIcon } from "@heroicons/react/24/solid";
import defaultProfile from "../../assets/images/example_profile_picture.svg";
import {capitalize, formattedDate} from "../../utils/helper.js";
import ImageCropModal from "../../Modal/ImageCropModal.jsx";
import Button from "../../Components/Button/Button.jsx";
import utilServices from "../../services/utilServices.js";
import {useTranslation} from "react-i18next";
import {useErrors} from "../../hooks/useErrors.jsx";

const UpdateUserForm = () => {
    const {t} = useTranslation();
    const [previewPhotoUrl, setPreviewPhotoUrl] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [roles, setRoles] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [photo, setPhoto] = useState(null);
    const [openCrop, setOpenCrop] = useState(false);
    const [rawImage, setRawImage] = useState(null);
    const { id } = useParams();
    const [userId, setUserId] = useState(id ?? "");
    const navigate = useNavigate();

    const {fieldErrors, generalError, removeErrorsByField,setErrors, clearErrors} = useErrors()

    const [formData, setFormData] = useState({
        id: 0,
        employeeId: "",
        name: "",
        birthDate: "",
        gender: "",
        phoneNumber: "",
        email: "",
        roleId: "",
        departmentId: "",
        shiftId: "",
        locationId: "",
        password: "",
        status: "",
        confirmPassword: "",
        biography: "",
        whatsapp: "",
        linkedin: "",
        telegram: "",
        photo: null,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            let userRes;
            if (id) {
                userRes = await userServices.getUserById(id);
            } else if (location.pathname === "/profile/edit") {
                userRes = await userServices.getCurrent();
                setUserId(userRes.data.payload.id);
            }

            const [departmentsRes, rolesRes, shiftsRes, locationsRes] = await Promise.all([
                departmentServices.getDepartmentsDropdown(),
                roleServices.getRoleDropdown(),
                shiftServices.getShiftDropdown(),
                locationServices.getLocationDropdown(),
            ]);

            const userData = userRes.data.payload;
            setDepartments(departmentsRes.data.payload || []);
            setRoles(rolesRes.data.data || []);
            setShifts(shiftsRes.data.payload || []);
            setLocations(locationsRes.data.payload || []);
            setPhoto(userData.photo);

            setFormData((prev) => ({
                ...prev,
                ...userData,
                birthDate: userData.birthDate ? formattedDate(userData.birthDate) : "",
                password: "",
                confirmPassword: "",
            }));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            setFormData((prev) => ({
                ...prev,
                [name]: file,
            }));
            setPreviewPhotoUrl(URL.createObjectURL(file));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

        if (fieldErrors[name]) {
            removeErrorsByField(name);
        }

    };

    useEffect(() => {
        return () => {
            if (previewPhotoUrl) {
                URL.revokeObjectURL(previewPhotoUrl);
            }
        };
    }, [previewPhotoUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return alert("Passwords do not match!");
        }

        let requestData = { ...formData };
        delete requestData.confirmPassword;

        if (!formData.photo || typeof formData.photo === "string") {
            delete requestData.photo;
        }

        requestData.id = parseInt(userId);

        if (requestData.birthDate) {
            requestData.birthDate = Math.floor(new Date(requestData.birthDate).getTime() / 1000);
        }


        await userServices.updateUser(requestData)
            .then(res => {
                navigate("/users", {
                    state: {
                        success: capitalize(t("successUpdateUser")),
                    },
                });
            })
            .catch(error => {
                setErrors(error);
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
    };

    return (
        <>
            <div className="bg-white px-10 py-8 rounded-xl w-full">
                <h3 className="text-lg text-left font-semibold mb-4">{capitalize(t("user.edit"))}</h3>
                <form onSubmit={handleSubmit} className="text-left mt-5 border-t-2 border-gray-300">
                    {loading ? (
                        <p className="text-center w-full mt-5">Loading data ...</p>
                    ) : (
                        <div className="flex flex-row gap-10">
                            {/* Left Column - Photo and Credentials */}
                            <div className="w-3/12 pt-8">
                                <div className="bg-gray-200 h-72 w-full rounded overflow-hidden">
                                    <img
                                        src={
                                            previewPhotoUrl
                                                ? previewPhotoUrl
                                                : photo
                                                    ? photo
                                                    : defaultProfile
                                        }
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <label className="flex gap-2 py-3 px-4 border border-gray-300 rounded w-full items-center justify-center mt-2 cursor-pointer">
                                    <CameraIcon className="h-4" />
                                    <span className="text-sm">{capitalize(t("user.uploadAPhoto"))}</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (!file) return;
                                            const imageURL = URL.createObjectURL(file);
                                            setRawImage(imageURL);
                                            setOpenCrop(true);
                                        }}
                                        className="hidden"
                                        name="photo"
                                    />
                                </label>

                                <div className="flex flex-col gap-4 mt-4">
                                    <h4 className="font-semibold">{capitalize(t("user.credential"))}</h4>
                                    <TextBox
                                        label={capitalize(t("user.password"))}
                                        id="password"
                                        name="password"
                                        handleChange={handleChange}
                                        type="password"
                                        value={formData?.password}
                                        error={fieldErrors?.password}
                                    />
                                    <TextBox
                                        label={capitalize(t("user.confirmPassword"))}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        handleChange={handleChange}
                                        type="password"
                                        value={formData?.confirmPassword}
                                        error={fieldErrors?.confirmPassword}
                                    />
                                    {
                                        utilServices.isAdmin() ?
                                            <Dropdown
                                                name="status"
                                                label={capitalize(t("accountStatus"))}
                                                handleChange={handleChange}
                                                items={[{ id: 1, name: capitalize(t("active")) }, { id: 0, name: capitalize(t("inactive")) }]}
                                                defaultValue={formData.status}
                                                error={fieldErrors?.status}
                                                disabled={utilServices.isEmployee()}
                                                disabledDisplay={utilServices.isEmployee()}
                                            />
                                            :
                                            formData.status ? (

                                                <div>
                                                    <h2 className="mb-4 text-sm font-semibold">Account Status</h2>
                                                    <span className="bg-green-400/10 text-green-400 px-4 py-2 rounded-lg font-bold">{capitalize(t("active"))}</span>
                                                </div>
                                            ) : (
                                                <div><span className="bg-gray-400/10 px-4 py-2 rounded-lg text-gray-400 font-bold">{capitalize(t("inactive"))}</span></div>
                                            )

                                    }
                                </div>
                            </div>

                            {/* Right Column - Form */}
                            <div className="space-y-10 w-9/12 border-gray-300 pl-8 pt-8">
                                {/* Profile Information */}
                                <div>
                                    <h4 className="text-md font-semibold mb-4">{capitalize(t("user.profileInformation"))}</h4>
                                    <div className="grid grid-cols-2 gap-x-18 gap-y-6">
                                        <TextBox label={capitalize(t("user.employeeId"))} name="employeeId" value={formData.employeeId} handleChange={handleChange} error={fieldErrors?.employeeId} disabled={utilServices.isEmployee()} disabledDisplay={utilServices.isEmployee()} />
                                        <TextBox label={capitalize(t("user.fullName"))} name="name" value={formData.name} handleChange={handleChange} error={fieldErrors?.name} />
                                        <TextBox label={capitalize(t("user.birthDate"))} name="birthDate" type="date" value={formData.birthDate} handleChange={handleChange} error={fieldErrors?.birthDate} />
                                        <GenderDropdown name="gender" handleChange={handleChange} value={formData.gender} error={fieldErrors?.gender} />
                                    </div>
                                </div>

                                {/* Work Information */}
                                <div>
                                    <h4 className="text-md font-semibold mb-4">{capitalize(t("user.workInformation"))}</h4>
                                    <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                                        <Dropdown name="departmentId" label={capitalize(t("user.department"))} handleChange={handleChange} items={departments} defaultValue={formData.departmentId} error={fieldErrors?.departmentId} disabled={utilServices.isEmployee()} disabledDisplay={utilServices.isEmployee()} />
                                        <Dropdown name="roleId" label={capitalize(t("user.role"))} handleChange={handleChange} items={roles} defaultValue={formData.roleId} error={fieldErrors?.roleId} disabled={utilServices.isEmployee()} disabledDisplay={utilServices.isEmployee()} />
                                        <Dropdown name="shiftId" label={capitalize(t("Shift"))} handleChange={handleChange} items={shifts} defaultValue={formData.shiftId} error={fieldErrors?.shiftId} disabled={utilServices.isEmployee()} disabledDisplay={utilServices.isEmployee()} />
                                        <Dropdown name="locationId" label={capitalize(t("user.workLocation"))} handleChange={handleChange} items={locations} defaultValue={formData.locationId} error={fieldErrors?.locationId} disabled={utilServices.isEmployee()} disabledDisplay={utilServices.isEmployee()} />
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div>
                                    <h4 className="text-md font-semibold mb-4">{capitalize(t("user.contactInformation"))}</h4>
                                    <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                                        <TextBox name="email" label="Email" type="email" value={formData.email} handleChange={handleChange} error={fieldErrors?.email} />
                                        <TextBox name="phoneNumber" label={capitalize(t("user.phoneNumber"))} value={formData.phoneNumber} handleChange={handleChange} error={fieldErrors?.phoneNumber} />
                                        <TextBox name="whatsapp" label="WhatsApp" value={formData.whatsapp} handleChange={handleChange} error={fieldErrors?.whatsapp} />
                                        <TextBox name="linkedin" label="LinkedIn" value={formData.linkedin} handleChange={handleChange} error={fieldErrors?.linkedin} />
                                        <TextBox name="telegram" label="Telegram" value={formData.telegram} handleChange={handleChange} error={fieldErrors?.telegram} />
                                    </div>
                                </div>

                                {/* Account Status */}
                                <div>
                                    <h4 className="text-md font-semibold mb-4">{capitalize(t("user.biography"))}</h4>
                                    <div className="">
                                        <TextBox type="textarea" name="biography" label={capitalize(t("user.biography"))} value={formData.biography} handleChange={handleChange} error={fieldErrors?.biography} />
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end gap-3 mt-4">
                                    <Button type="link" to={`/users`} text={capitalize(t("cancel"))} fill={false} />
                                    <Button type="submit" text={capitalize(t("update"))} />
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            {/* Crop Modal */}
            {openCrop && rawImage && (
                <ImageCropModal
                    imageSrc={rawImage}
                    onClose={() => {
                        setOpenCrop(false);
                        URL.revokeObjectURL(rawImage);
                    }}
                    onCropDone={(croppedFile) => {
                        setFormData((prev) => ({
                            ...prev,
                            photo: croppedFile,
                        }));
                        setPreviewPhotoUrl(URL.createObjectURL(croppedFile));
                    }}
                />
            )}
        </>
    );
};

export default UpdateUserForm;
