const Dropdown = ({ label, id, name, handleChange, items, defaultValue = undefined, placeholder }) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="text-sm font-medium">
                {label}
            </label>
            <select
                id={id}
                name={name}
                onChange={handleChange}
                className="input border border-primary/10 mt-2 rounded-md py-2 px-4 text-sm"
                value={defaultValue ? defaultValue : undefined}>
                <option value="">{placeholder}</option>
                {items.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
