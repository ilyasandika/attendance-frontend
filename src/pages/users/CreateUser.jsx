import { useEffect, useState } from "react";
import departmentServices from "../../services/departmentServices.js";
import { Link } from "react-router-dom";
import roleServices from "../../services/roleServices.js";
import locationServices from "../../services/locationServices.js";
import shiftServices from "../../services/shiftServices.js";
import userServices from "../../services/userServices.js";
import TextBox from "../../Components/Form/TextBox.jsx";
import GenderDropdown from "../../Components/Form/GenderDropdown.jsx";
import Dropdown from "../../Components/Form/Dropdown.jsx";
import {useTranslation} from "react-i18next";
import {capitalize} from "../../utils/helper.js";

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
        confirmPassword: "",
    });

    const [departments, setDepartments] = useState([]);
    const [roles, setRoles] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [locations, setLocations] = useState([]);
    const [errors, setErrors] = useState({});

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
            console.error("Error fetch user:", error);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = { ...formData };

        if (requestData.birthDate) {
            requestData.birthDate = Math.floor(new Date(requestData.birthDate).getTime() / 1000);
        }


        try {
            await userServices.createUser(requestData);
            alert("User created successfully!");
            window.location.href = "/users";
        } catch (error) {
            if (error && error.status === 422) {
                setErrors(prevState => ({
                    ...prevState,
                    ...error.data.errors,
                }));
            } else {
                console.error("Error creating user:", error);
            }
        }
    };

    return (
        <div className="bg-white p-12 rounded-xl w-full ">
            <h3 className="text-lg text-left font-semibold mb-4">Create New User</h3>
            <hr className="text-primary/20" />
            <form onSubmit={handleSubmit} className="space-y-10 text-left mt-5">
                {/* Profile Information */}
                <div>
                    <h4 className="text-md font-semibold mb-4">Profile Information</h4>
                    <div className="grid grid-cols-3 gap-x-18 gap-y-6">
                        <TextBox label={capitalize(t("user.employeeId"))} id="employeeId" name="employeeId" handleChange={handleChange} value={formData.employeeId} error={errors.employeeId?.[0]}/>
                        <TextBox label={capitalize(t("user.fullName"))} id="name" name="name" handleChange={handleChange} value={formData.name} error={errors.name?.[0]} />
                        <TextBox label={capitalize(t("user.birthDate"))} id="birthDate" name="birthDate" handleChange={handleChange} type="date" value={formData.birthDate} error={errors.birthDate?.[0]} />
                        <GenderDropdown name="gender" handleChange={handleChange} value={formData.gender} error={errors.gender?.[0]}/>
                        <TextBox label={capitalize(t("user.phoneNumber"))} id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} handleChange={handleChange} error={errors.phoneNumber?.[0]} />
                        <TextBox label="Email" id="email" name="email" handleChange={handleChange} type="email"  value={formData.email} error={errors.email?.[0]} />
                    </div>
                </div>

                {/* Work Information */}
                <div>
                    <h4 className="text-md font-semibold mb-4">{capitalize(t("user.workInformation"))}</h4>

                    <div className="grid grid-cols-3 gap-x-16 gap-y-6">
                        <Dropdown
                            id="employeeDepartment"
                            name="departmentId"
                            label={capitalize(t("user.department"))}
                            handleChange={handleChange}
                            items={departments}
                            value={formData.departmentId}
                            placeholder={`${capitalize(t("select"))} ${capitalize(t("user.department"))}`}
                            error={errors.departmentId?.[0]}
                            defaultValue={formData.departmentId}
                        />

                        <Dropdown
                            id="employeeRole"
                            name="roleId"
                            label={capitalize(t("user.role"))}
                            handleChange={handleChange}
                            items={roles}
                            value={formData.roleId}
                            placeholder={`${capitalize(t("select"))} ${capitalize(t("user.role"))}`}
                            error={errors.roleId?.[0]}
                            defaultValue={formData.roleId}
                        />
                        <Dropdown
                            id="employeeShift"
                            name="shiftId"
                            label={capitalize(t("Shift"))}
                            handleChange={handleChange}
                            items={shifts}
                            value={formData.shiftId}
                            placeholder={`${capitalize(t("select"))} ${capitalize(t("Shift"))}`}
                            error={errors.shiftId?.[0]}
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
                            error={errors.locationId?.[0]}
                            defaultValue={formData.locationId}
                        />
                    </div>
                </div>



                {/* Credential */}
                <div>
                    <h4 className="text-md font-semibold mb-4">Credential</h4>
                    <div className="grid grid-cols-3 gap-x-16 gap-y-6">
                        <TextBox label={capitalize(t("user.password"))} id="password" name="password" value={formData.password} handleChange={handleChange} type="password" error={errors.password?.[0]}/>
                        <TextBox label={capitalize(t("user.confirmPassword"))} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} handleChange={handleChange} type="password" error={errors.confirmPassword?.[0]} />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                    <Link to="/users" className="cursor-pointer border border-primary text-primary px-4 py-2 rounded-md">
                        Cancel
                    </Link>
                    <button type="submit" className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md">
                        Create User
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateUserForm;
