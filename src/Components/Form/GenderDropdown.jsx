const GenderDropdown = ({ handleChange }) => {
    return (
        <div className="flex flex-col">
            <label for="employeeGender" className="text-sm font-medium">
                Gender
            </label>
            <select
                id="employeeGender"
                name="employeeGender"
                onChange={handleChange}
                className="input border border-primary/10 mt-2 rounded-md py-2 px-4">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>
    );
};

export default GenderDropdown;
