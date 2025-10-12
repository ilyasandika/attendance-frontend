import ToolTipModal from "../../Modal/ToolTipModal.jsx";
import {inputBackground, inputBorder} from "../../constant.js";
import userServices from "../../services/userServices.js";
import React from "react";
import AsyncSelect from "react-select/async";

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
                     min = 0,
                     max = 100,
                     children,
                     disabledDisplay = false,
                     toolTipMessage = "Hubungi admin jika ingin merubah data",
                     className = "",
                 }) => {

    const inputBaseClass = `text-sm w-full ${inputBackground} ${!onlyBottom && inputBorder } `;
    const errorClass = error ? "animate-shake text-red-500" : "";
    const inputClass = onlyBottom
        ? `border-b border-primary p-2 placeholder-primary/80 focus:outline-none focus:ring-0 ${error ? "border-red-500" : ""}`
        : `rounded-md py-2 px-4 ${disabledDisplay ? "bg-primary/10" : ""} ${disabled ? "cursor-not-allowed" : ""} ${error ? "border-red-500" : ""}`;


    const loadOptions = async (inputValue) => {
        const res = await userServices.getUsers(0, inputValue, true);
        const users = res.data.payload.users;
        return users.map(user => ({
            label: `${user.employeeId} - ${user.name}`,
            value: user.id
        }));
    };

    return (
        <div>
            <div className={`flex flex-col ${errorClass}`}>
                {label && (
                    <label htmlFor={id} className={`text-sm font-semibold ${!onlyBottom && 'mb-2'}`}>
                        {label}
                    </label>
                )}

                {type === "suggestion" &&
                    <AsyncSelect
                        cacheOptions
                        loadOptions={loadOptions}
                        onChange={handleChange}
                        placeholder="Cari user ID atau nama..."
                    />
                }

                {type === "textarea" &&
                    <textarea
                        id={id}
                        name={name}
                        disabled={disabled}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        onChange={handleChange}
                        value={value ?? ""}
                        className={`mt-2 border rounded-md p-2 resize-none ${inputBaseClass} ${error ? "border-red-500" : "border-primary/20"} ${className}`}
                    >{value}</textarea>
                }


                {
                    (type !== "textarea" && type !== "suggestion") && (
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
                                min={min}
                                max={max}
                                className={`${inputBaseClass} ${inputClass}`}
                            />
                            {disabled && disabledDisplay && (
                                <ToolTipModal message={toolTipMessage}  />
                            )}
                        </div>
                    )
                }

                {children && (
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
