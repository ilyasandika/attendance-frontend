const GenderDropdown = ({ handleChange, value = undefined }) => {
    return (
        <div className="flex flex-col">
            <label htmlFor="employeeGender" className="text-sm font-medium">
                Gender
            </label>
            <select
                id="employeeGender"
                name="employeeGender"
                onChange={handleChange}
                value={value ? value : undefined}
                className="input border border-primary/10 mt-2 rounded-md py-2 px-4 text-sm">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>
    );
};

export default GenderDropdown;
