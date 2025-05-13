import { useEffect, useState } from "react";
import departmentService from "../services/departmentService.js";
import { Link } from "react-router-dom";
import roleService from "../services/roleService.js";
import locationService from "../services/locationService.js";
import shiftService from "../services/shiftService.js";
import userService from "../services/userService.js";
import TextBox from "../Components/Form/TextBox.jsx";
import GenderDropdown from "../Components/Form/GenderDropdown.jsx";
import Dropdown from "../Components/Form/Dropdown.jsx";

const CreateUserForm = () => {
    const [formData, setFormData] = useState({
        employeeId: "",
        employeeName: "",
        employeeBirthDate: "",
        employeeGender: "",
        employeePhoneNumber: "",
        employeeEmail: "",
        employeeRoleId: "",
        employeeDepartmentId: "",
        employeeShiftId: "",
        employeeWorkLocationId: "",
        employeePassword: "",
        confirmPassword: "",
    });

    const [departments, setDepartments] = useState([]);
    const [roles, setRoles] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetchDropdownData();
    }, []);

    const fetchDropdownData = async () => {
        try {
            const [departmentsRes, rolesRes, shiftsRes, locationsRes] = await Promise.all([
                departmentService.getDepartments(),
                roleService.getRoles(),
                shiftService.getShiftDropdown(),
                locationService.getLocationDropdown(),
            ]);

            setDepartments(departmentsRes.data.data || []);
            setRoles(rolesRes.data.data || []);
            setShifts(shiftsRes.data.payload || []);
            setLocations(locationsRes.data.payload || []);
        } catch (error) {
            console.error("Error fetching dropdown data:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.employeePassword !== formData.confirmPassword) {
            return alert("Passwords do not match!");
        }

        const requestData = { ...formData };
        delete requestData.confirmPassword;

        if (requestData.employeeBirthDate) {
            requestData.employeeBirthDate = Math.floor(new Date(requestData.employeeBirthDate).getTime() / 1000);
        }

        try {
            await userService.createUser(requestData);
            alert("User created successfully!");
            window.location.href = "/users";
        } catch (error) {
            console.error("Error creating user:", error);
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
                        <TextBox label="Employee ID" id="employeeId" name="employeeId" handleChange={handleChange} />
                        <TextBox label="Full Name" id="employeeName" name="employeeName" handleChange={handleChange} />
                        <TextBox label="Birth Date" id="employeeBirthDate" name="employeeBirthDate" handleChange={handleChange} type="date" />
                        <GenderDropdown handleChange={handleChange} />
                        <TextBox label="Phone Number" id="employeePhoneNumber" name="employeePhoneNumber" handleChange={handleChange} />
                        <TextBox label="Email" id="employeeEmail" name="employeeEmail" handleChange={handleChange} type="email" />
                    </div>
                </div>

                {/* Work Information */}
                <div>
                    <h4 className="text-md font-semibold mb-4">Work Information</h4>

                    <div className="grid grid-cols-3 gap-x-16 gap-y-6">
                        <Dropdown
                            id="employeeDepartment"
                            name="employeeDepartmentId"
                            label="Department"
                            handleChange={handleChange}
                            items={departments}
                            placeholder="Select Department"
                        />

                        <Dropdown
                            id="employeeRole"
                            name="employeeRoleId"
                            label="Role"
                            handleChange={handleChange}
                            items={roles}
                            placeholder="Select Role"
                        />
                        <Dropdown
                            id="employeeShift"
                            name="employeeShiftId"
                            label="Shift Schedule"
                            handleChange={handleChange}
                            items={shifts}
                            placeholder="Select Shift"
                        />
                        <Dropdown
                            id="employeeWorkLocation"
                            name="employeeWorkLocationId"
                            label="Work Location"
                            handleChange={handleChange}
                            items={locations}
                            placeholder="Select Work Location"
                        />
                    </div>
                </div>

                {/* Credential */}
                <div>
                    <h4 className="text-md font-semibold mb-4">Credential</h4>
                    <div className="grid grid-cols-3 gap-x-16 gap-y-6">
                        <TextBox label="Password" id="employeePassword" name="employeePassword" handleChange={handleChange} type="password" />
                        <TextBox label="Confirm Password" id="confirmPassword" name="confirmPassword" handleChange={handleChange} type="password" />
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
