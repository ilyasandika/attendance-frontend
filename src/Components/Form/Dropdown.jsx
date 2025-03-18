const Dropdown = ({ label, id, name, handleChange, values }) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="text-sm font-medium">
                {label}
            </label>
            <select id={id} name={name} onChange={handleChange} className="input border border-primary/10 mt-2 rounded-md py-2 px-4">
                <option value="">Select Department</option>
                {values.map((value) => (
                    <option key={value.id} value={value.id}>
                        {value.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
