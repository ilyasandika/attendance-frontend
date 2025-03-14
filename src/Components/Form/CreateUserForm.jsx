import { useEffect, useState } from "react";
import axios from "axios";
import departmentService from "../../services/departmentService.js";

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
            const token = localStorage.getItem("token");
            if (!token) return console.error("No token found");

            const [departmentsRes, rolesRes, shiftsRes, locationsRes] = await Promise.all([
                departmentService.getDepartments(),
                axios.get("http://localhost:8000/api/roles", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get("http://localhost:8000/api/schedules/shifts", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get("http://localhost:8000/api/schedules/locations", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            setDepartments(departmentsRes.data.data || []);
            setRoles(rolesRes.data.data || []);
            setShifts(shiftsRes.data.data || []);
            setLocations(locationsRes.data.data || []);
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
            const token = localStorage.getItem("token");
            if (!token) return console.error("No token found");

            await axios.post("http://localhost:8000/api/users", requestData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("User created successfully!");
            window.location.href = "/user";
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
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Employee ID</label>
                            <input
                                name="employeeId"
                                type="text"
                                onChange={handleChange}
                                className="input border border-primary/10 mt-2 rounded-md py-2 px-4"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Full Name</label>
                            <input
                                name="employeeName"
                                type="text"
                                onChange={handleChange}
                                className="input border border-primary/10 mt-2 rounded-md py-2 px-4"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Birth Date</label>
                            <input
                                name="employeeBirthDate"
                                type="date"
                                onChange={handleChange}
                                className="input border border-primary/10 mt-2 rounded-md py-2 px-4"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Gender</label>
                            <select
                                name="employeeGender"
                                onChange={handleChange}
                                className="input border border-primary/10 mt-2 rounded-md py-2 px-4">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Phone Number</label>
                            <input
                                name="employeePhoneNumber"
                                type="text"
                                onChange={handleChange}
                                className="input border border-primary/10 mt-2 rounded-md py-2 px-4"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Email</label>
                            <input
                                name="employeeEmail"
                                type="email"
                                onChange={handleChange}
                                className="input border border-primary/10 mt-2 rounded-md py-2 px-4"
                            />
                        </div>
                    </div>
                </div>

                {/* Work Information */}
                <div>
                    <h4 className="text-md font-semibold mb-4">Work Information</h4>
                    <div className="grid grid-cols-3 gap-x-16 gap-y-6">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Department</label>
                            <select
                                name="employeeDepartmentId"
                                onChange={handleChange}
                                className="input border border-primary/10 mt-2 rounded-md py-2 px-4">
                                <option value="">Select Department</option>
                                {departments.map((dept) => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Role</label>
                            <select
                                name="employeeRoleId"
                                onChange={handleChange}
                                className="input border border-primary/10 mt-2 rounded-md py-2 px-4">
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Shift Schedule</label>
                            <select
                                name="employeeShiftId"
                                onChange={handleChange}
                                className="input border border-primary/10 mt-2 rounded-md py-2 px-4">
                                <option value="">Select Shift</option>
                                {shifts.map((shift) => (
                                    <option key={shift.id} value={shift.id}>
                                        {shift.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Work Location</label>
                            <select
                                name="employeeWorkLocationId"
                                onChange={handleChange}
                                className="input border border-primary/10 mt-2 rounded-md py-2 px-4">
                                <option value="">Select Location</option>
                                {locations.map((location) => (
                                    <option key={location.id} value={location.id}>
                                        {location.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Credential */}
                <div>
                    <h4 className="text-md font-semibold mb-4">Credential</h4>
                    <div className="grid grid-cols-3 gap-x-16 gap-y-6">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Password</label>
                            <input
                                name="employeePassword"
                                type="password"
                                onChange={handleChange}
                                className="input border border-primary/10 mt-2 rounded-md py-2 px-4"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Confirm Password</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                onChange={handleChange}
                                className="input border border-primary/10 mt-2 rounded-md py-2 px-4"
                            />
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                    <button type="button" className="cursor-pointer border border-primary text-primary px-4 py-2 rounded-md">
                        Cancel
                    </button>
                    <button type="submit" className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md">
                        Create User
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateUserForm;
