import { useEffect, useState } from "react";
import departmentService from "../services/departmentService.js";
import { Link, useParams } from "react-router-dom";
import roleService from "../services/roleService.js";
import locationService from "../services/locationService.js";
import shiftService from "../services/shiftService.js";
import userService from "../services/userService.js";
import TextBox from "../Components/Form/TextBox.jsx";
import GenderDropdown from "../Components/Form/GenderDropdown.jsx";
import Dropdown from "../Components/Form/Dropdown.jsx";
import { CameraIcon } from "@heroicons/react/24/solid";
import defaultProfile from "../assets/images/example_profile_picture.jpg";
import { formattedDate } from "../utils/helper.js";

const EditUserForm = () => {
    const [user, setUser] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [roles, setRoles] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [formData, setFormData] = useState({
        id: 0,
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
        employeeBiography: "",
        profilePhoto: null,
    });
    const { id } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [userRes, departmentsRes, rolesRes, shiftsRes, locationsRes] = await Promise.all([
                userService.getUserById(id),
                departmentService.getDepartments(),
                roleService.getRoles(),
                shiftService.getShiftDropdown(),
                locationService.getLocationDropdown(),
            ]);

            const userData = userRes.data.payload.data;
            setUser(userData);
            setDepartments(departmentsRes.data.data || []);
            setRoles(rolesRes.data.data || []);
            setShifts(shiftsRes.data.payload || []);
            setLocations(locationsRes.data.payload || []);
            setProfilePhoto(userData.profilePicturePath);

            setFormData((prev) => ({
                ...prev,
                ...userData,
                employeeBirthDate: userData.employeeBirthDate ? formattedDate(userData.employeeBirthDate) : "",
                employeePassword: "",
                confirmPassword: "",
            }));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, [name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.employeePassword !== formData.confirmPassword) {
            return alert("Passwords do not match!");
        }

        let requestData = { ...formData };
        delete requestData.confirmPassword;
        requestData.id = parseInt(id);

        if (requestData.employeeBirthDate) {
            requestData.employeeBirthDate = Math.floor(new Date(requestData.employeeBirthDate).getTime() / 1000);
        }
        try {
            await userService.updateUser(requestData);
            alert("User updated successfully!");
            // window.location.href = `/users/edit/${id}`;
        } catch (error) {
            console.error("Error update user:", error);
        }
    };
    return (
        <div className="bg-white px-10 py-8 rounded-xl w-full">
            <h3 className="text-lg text-left font-semibold mb-4">Edit User</h3>
            <form onSubmit={handleSubmit} className="text-left mt-5 border-t-2 border-gray-300">
                {loading ? (
                    <p className="text-center w-full mt-5">Loading data ...</p>
                ) : (
                    <div className="flex flex-row gap-10">
                        {/* pofile */}
                        <div className="w-3/12 pt-8">
                            <div className="bg-gray-200 h-72 w-full rounded overflow-hidden">
                                <img
                                    src={profilePhoto ? `${import.meta.env.VITE_API_URL}/storage/${profilePhoto}` : defaultProfile}
                                    alt="default profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <label className="flex gap-2 py-3 px-4 border border-gray-300 rounded w-full items-center justify-center mt-2 cursor-pointer">
                                <CameraIcon className="h-4" />
                                <span className="text-sm">Upload a photo</span>
                                <input type="file" accept="image/*" onChange={handleChange} className="hidden" name="profilePhoto" />
                            </label>

                            <div className="flex flex-col">
                                <h4 className="font-semibold mt-4 mb-2">Credential</h4>

                                <TextBox label="Password" id="employeePassword" name="employeePassword" handleChange={handleChange} type="password" />
                                <TextBox
                                    label="Confirm Password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    handleChange={handleChange}
                                    type="password"
                                />
                            </div>
                        </div>

                        {/* form */}
                        <div className="space-y-10 w-7/10  border-gray-300 pl-8 pt-8">
                            <div>
                                <h4 className="text-md font-semibold mb-4">Profile Information</h4>
                                <div className="grid grid-cols-2 gap-x-18 gap-y-6">
                                    <TextBox
                                        label="Employee ID"
                                        id="employeeId"
                                        name="employeeId"
                                        handleChange={handleChange}
                                        value={formData.employeeId}
                                    />
                                    <TextBox
                                        label="Full Name"
                                        id="employeeName"
                                        name="employeeName"
                                        handleChange={handleChange}
                                        value={formData.employeeName}
                                    />
                                    <TextBox
                                        label="Birth Date"
                                        id="employeeBirthDate"
                                        name="employeeBirthDate"
                                        handleChange={handleChange}
                                        type="date"
                                        value={formData.employeeBirthDate}
                                    />

                                    <GenderDropdown handleChange={handleChange} value={formData.employeeGender} />
                                </div>
                            </div>

                            {/* Work Information */}
                            <div>
                                <h4 className="text-md font-semibold mb-4">Work Information</h4>

                                <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                                    <Dropdown
                                        id="employeeDepartment"
                                        name="employeeDepartmentId"
                                        label="Department"
                                        handleChange={handleChange}
                                        items={departments}
                                        defaultValue={formData.employeeDepartmentId}
                                    />

                                    <Dropdown
                                        id="employeeRole"
                                        name="employeeRoleId"
                                        label="Role"
                                        handleChange={handleChange}
                                        items={roles}
                                        defaultValue={formData.employeeRoleId}
                                    />
                                    <Dropdown
                                        id="employeeShift"
                                        name="employeeShiftId"
                                        label="Shift Schedule"
                                        handleChange={handleChange}
                                        items={shifts}
                                        defaultValue={formData.employeeShiftId}
                                    />
                                    <Dropdown
                                        id="employeeWorkLocation"
                                        name="employeeWorkLocationId"
                                        label="Work Location"
                                        handleChange={handleChange}
                                        items={locations}
                                        defaultValue={formData.employeeWorkLocationId}
                                    />
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div>
                                <h4 className="text-md font-semibold mb-4">Contact Information</h4>

                                <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                                    <TextBox
                                        id="employeeEmail"
                                        name="employeeEmail"
                                        label="Email"
                                        type="email"
                                        handleChange={handleChange}
                                        value={formData.employeeEmail}
                                    />
                                    <TextBox
                                        id="employeeWhatsApp"
                                        name="employeeWhatsApp"
                                        label="WhatsApp"
                                        type="text"
                                        handleChange={handleChange}
                                        value={formData.employeeWhatsApp}
                                    />
                                    <TextBox
                                        id="employeeLinkedin"
                                        name="employeeLinkedin"
                                        label="Linkedin"
                                        type="text"
                                        handleChange={handleChange}
                                        value={formData.employeeLinkedin}
                                    />
                                    <TextBox
                                        id="employeeTelegram"
                                        name="employeeTelegram"
                                        label="Telegram"
                                        type="text"
                                        handleChange={handleChange}
                                        value={formData.employeeTelegram}
                                    />
                                    <TextBox
                                        id="employeePhoneNumber"
                                        name="employeePhoneNumber"
                                        label="Phone Number"
                                        type="text"
                                        handleChange={handleChange}
                                        value={formData.employeePhoneNumber}
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 mt-4">
                                <Link to="/users" className="cursor-pointer border border-primary text-primary px-4 py-2 rounded-md">
                                    Cancel
                                </Link>
                                <button type="submit" className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md">
                                    Update Data
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default EditUserForm;
