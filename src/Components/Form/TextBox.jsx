import ToolTipModal from "../../Modal/ToolTipModal.jsx";

const TextBox = ({
                     id,
                     label = null,
                     name,
                     type = "text",
                     placeholder = null,
                     value = undefined,
                     handleChange = null,
                     onlyBottom = false,
                     disabled = false,
                     readOnly = false,
                     error = null,
                     children,
                     disabledDisplay = false,
                     toolTipMessage = "Hubungi admin jika ingin merubah data",
                 }) => {

    const inputBaseClass = "text-sm w-full";
    const errorClass = error ? "animate-shake text-red-500" : "";
    const inputClass = onlyBottom
        ? `border-b border-primary p-2 placeholder-primary/80 focus:outline-none focus:ring-0 ${error ? "border-red-500" : ""}`
        : `border border-primary/20 mt-2 rounded-md py-2 px-4 ${disabledDisplay ? "bg-primary/10" : ""} ${disabled ? "cursor-not-allowed" : ""} ${error ? "border-red-500" : ""}`;

    return (
        <div>
            <div className={`flex flex-col ${errorClass}`}>
                {label && (
                    <label htmlFor={id} className="text-sm font-semibold">
                        {label}
                    </label>
                )}

                {type === "textarea" ? (
                    <textarea
                        id={id}
                        name={name}
                        disabled={disabled}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        onChange={handleChange}
                        value={value ?? ""}
                        className={`mt-2 border rounded-md p-2 resize-none ${inputBaseClass} ${error ? "border-red-500" : "border-primary/20"}`}
                    >{value}</textarea>
                ) : !children ? (
                    <div className={`relative group w-full`}>
                        <input
                            type={type}
                            name={name}
                            id={id}
                            disabled={disabled}
                            readOnly={readOnly}
                            placeholder={placeholder}
                            onChange={handleChange}
                            value={value ?? ""}
                            className={`${inputBaseClass} ${inputClass}`}
                        />
                        {disabled && disabledDisplay && (
                            <ToolTipModal message={toolTipMessage}  />
                        )}
                    </div>
                ) : (
                    <div className="border-b border-primary p-2 text-sm text-gray-700 mt-2">
                        {children || "-"}
                    </div>
                )}

                {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
            </div>
        </div>
    );
};

export default TextBox;
