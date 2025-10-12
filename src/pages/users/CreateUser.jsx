import { useEffect, useState } from "react";
import departmentServices from "../../services/departmentServices.js";
import {Form, Link, useNavigate} from "react-router-dom";
import roleServices from "../../services/roleServices.js";
import locationServices from "../../services/locationServices.js";
import shiftServices from "../../services/shiftServices.js";
import userServices from "../../services/userServices.js";
import TextBox from "../../Components/Form/TextBox.jsx";
import GenderDropdown from "../../Components/Form/GenderDropdown.jsx";
import Dropdown from "../../Components/Form/Dropdown.jsx";
import {useTranslation} from "react-i18next";
import {capitalize} from "../../utils/helper.js";
import Button from "../../Components/Button/Button.jsx";
import FormWrapper from "../../Components/Form/FormWrapper.jsx";
import {useErrors} from "../../hooks/useErrors.jsx";

const CreateUserForm = () => {
    const {t} = useTranslation();
    const [formData, setFormData] = useState({
        employeeId: "",
        name: "",
        birthDate: "",
        gender: "male",
        phoneNumber: "",
        email: "",
        roleId: "",
        departmentId: "",
        shiftId: "",
        locationId: "",
        password: "",
        roleAccount : "employee",
        confirmPassword: "",
    });

    const [departments, setDepartments] = useState([]);
    const [roles, setRoles] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [locations, setLocations] = useState([]);
    const navigate = useNavigate();
    const {fieldErrors, generalError, removeErrorsByField,setErrors, clearErrors} = useErrors()

    useEffect(() => {
        fetchDropdownData();
    }, []);

    const fetchDropdownData = async () => {
        try {
            const [departmentsRes, rolesRes, shiftsRes, locationsRes] = await Promise.all([
                departmentServices.getDepartmentsDropdown(),
                roleServices.getRoleDropdown(),
                shiftServices.getShiftDropdown(),
                locationServices.getLocationDropdown(),
            ]);

            const departments = departmentsRes.data.payload || [];
            const roles = rolesRes.data.payload || [];
            const shifts = shiftsRes.data.payload || [];
            const locations = locationsRes.data.payload || [];

            setDepartments(departments);
            setRoles(roles);
            setShifts(shifts);
            setLocations(locations);

            const defaultDepartmentId = departments.find(item => item.default === 1)?.id || "";
            const defaultRoleId = roles.find(item => item.default === 1)?.id || "";
            const defaultShiftId = shifts.find(item => item.default === 1)?.id || "";
            const defaultLocationId = locations.find(item => item.default === 1)?.id || "";

            setFormData(prev => ({
                ...prev,
                departmentId: defaultDepartmentId,
                locationId: defaultLocationId,
                shiftId: defaultShiftId,
                roleId: defaultRoleId,
            }));

        } catch (error) {
            setErrors(error)
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (fieldErrors[name]) {
            removeErrorsByField(name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestData = { ...formData };
        if (requestData.birthDate) {
            requestData.birthDate = Math.floor(new Date(requestData.birthDate).getTime() / 1000);
        }
        console.log(requestData)
        await userServices.createUser(requestData)
            .then(res => {
                navigate("/users", { state: { success: capitalize(t("successCreateUser"), false) } });
            })
            .catch(err => {
                setErrors(err);
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
    };

    return (
        <FormWrapper
            header={capitalize(t("user.create"))}
            handleSubmit={handleSubmit}
            button={
                {
                    cancel:{
                        to: "/users",
                    },
                    submit :{
                        text: capitalize(t("user.create")),
                    }
                }
            }
        >

            <ItemWrapper header={capitalize(t("user.profileInformation"))}>
                <TextBox label={capitalize(t("user.employeeId"))}
                         id="employeeId"
                         name="employeeId"
                         handleChange={handleChange}
                         value={formData.employeeId}
                         error={fieldErrors?.employeeId}/>
                <TextBox label={capitalize(t("user.fullName"))}
                         id="name"
                         name="name"
                         handleChange={handleChange}
                         value={formData.name}
                         error={fieldErrors?.name} />
                <div className="flex gap-4 w-full">
                    <TextBox label={capitalize(t("user.birthDate"))}
                             id="birthDate"
                             name="birthDate"
                             handleChange={handleChange} type="date"
                             value={formData.birthDate}
                             error={fieldErrors?.birthDate} />
                    <GenderDropdown
                        name="gender"
                        handleChange={handleChange}
                        value={formData.gender}
                        error={fieldErrors?.gender}/>
                </div>
            </ItemWrapper>
            {/* Contact Information */}
            <ItemWrapper header={capitalize(t("user.contactInformation"))}>
                <TextBox label={capitalize(t("user.phoneNumber"))}
                         id="phoneNumber"
                         name="phoneNumber"
                         handleChange={handleChange}
                         value={formData.phoneNumber}
                         error={fieldErrors?.phoneNumber} />
                <TextBox label="Email"
                         id="email"
                         type="email"
                         name="email"
                         handleChange={handleChange}
                         value={formData.email}
                         error={fieldErrors?.email} />
            </ItemWrapper>

            <ItemWrapper header={capitalize(t("user.workInformation"))}>
                <div className="grid grid-cols-2 gap-4">
                    <Dropdown
                        id="employeeDepartment"
                        name="departmentId"
                        label={capitalize(t("user.department"))}
                        handleChange={handleChange}
                        items={departments}
                        placeholder={`${capitalize(t("select"))} ${capitalize(t("user.department"))}`}
                        value={formData.departmentId}
                        error={fieldErrors?.departmentId}
                        defaultValue={formData.departmentId}
                    />

                    <Dropdown
                        id="employeeRole"
                        name="roleId"
                        label={capitalize(t("user.role"))}
                        handleChange={handleChange}
                        items={roles}
                        placeholder={`${capitalize(t("select"))} ${capitalize(t("user.role"))}`}
                        value={formData.roleId}
                        error={fieldErrors?.roleId}
                        defaultValue={formData.roleId}
                    />
                    <Dropdown
                        id="employeeShift"
                        name="shiftId"
                        label={capitalize(t("Shift"))}
                        handleChange={handleChange}
                        items={shifts}
                        placeholder={`${capitalize(t("select"))} ${capitalize(t("Shift"))}`}
                        value={formData.shiftId}
                        error={fieldErrors?.shiftId}
                        defaultValue={formData.shiftId}
                    />
                    <Dropdown
                        id="employeeWorkLocation"
                        name="locationId"
                        value={formData.locationId}
                        label={capitalize(t("user.workLocation"))}
                        handleChange={handleChange}
                        items={locations}
                        placeholder={`${capitalize(t("select"))} ${capitalize(t("user.workLocation"))}`}
                        error={fieldErrors?.locationId}
                        defaultValue={formData.locationId}
                    />
                </div>
            </ItemWrapper>

            <ItemWrapper header={capitalize(t("user.credential"))} isLast={true}>
                <TextBox label={capitalize(t("user.password"))}
                         id="password"
                         name="password"
                         type="password"
                         handleChange={handleChange}
                         value={formData.password}
                         error={fieldErrors?.password}/>
                <TextBox label={capitalize(t("user.confirmPassword"))}
                         id="confirmPassword"
                         name="confirmPassword"
                         type="password"
                         handleChange={handleChange}
                         value={formData.confirmPassword}
                         error={fieldErrors?.confirmPassword} />
            </ItemWrapper>

            <ItemWrapper header={capitalize(t("user.credential"))} isLast={true}>
                <Dropdown
                    id="roleAccount"
                    name="roleAccount"
                    value={formData.roleAccount}
                    label={capitalize(t("roleAccount"))}
                    handleChange={handleChange}
                    items={[
                        {
                            id: "admin",
                            name: "Admin",
                        },
                        {
                            id: "employee",
                            name: capitalize(t("employee")),
                        }

                    ]}
                    placeholder={`${capitalize(t("select"))} ${capitalize(t("roleAccount"))}`}
                    error={fieldErrors?.roleAccount}
                    defaultValue={formData.roleAccount}
                />
            </ItemWrapper>
        </FormWrapper>
    );
};


const ItemWrapper = ({header, isLast = false, children}) => {
    return (

        // border-b pb-10 border-primary/10
        <div className={`flex flex-row gap-24 justify-between ${!isLast && " "}`}>
            <h4 className="text-md font-semibold mb-4 w-1/6">{header}</h4>
            <div className="flex flex-col gap-x-8 gap-y-6 w-5/6">
                {children}
            </div>
        </div>
    )
}

export default CreateUserForm;
