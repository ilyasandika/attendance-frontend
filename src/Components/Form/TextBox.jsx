const TextBox = ({ label, id, name, handleChange, type = "text" }) => {
    return (
        <div>
            <div className="flex flex-col">
                <label htmlFor={id} className="text-sm font-medium">
                    {label}
                </label>
                <input type={type} name={name} id={id} onChange={handleChange} className="input border border-primary/10 mt-2 rounded-md py-2 px-4" />
            </div>
        </div>
    );
};

export default TextBox;
