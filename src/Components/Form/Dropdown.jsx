import ToolTipModal from "../../Modal/ToolTipModal.jsx";
import {useTranslation} from "react-i18next";
import {capitalize} from "../../utils/helper.js";

const Dropdown = ({
                      label,
                      id,
                      name,
                      handleChange,
                      items,
                      defaultValue = "",
                      placeholder,
                      error = null,
                      disabled = false,
                      disabledDisplay = false,
                      tooltipMessage = "Hubungi admin jika ingin merubah data",
                  }) => {
    const {t} = useTranslation();
    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="text-sm font-semibold">
                {label}
            </label>

            <div className="relative group w-full">
                <select
                    id={id}
                    name={name}
                    onChange={handleChange}
                    className={`input border border-primary/10 mt-2 rounded-md py-2 px-4 text-sm w-full 
            ${disabledDisplay ? "bg-primary/10" : ""} 
            ${disabled ? "cursor-not-allowed" : ""}`}
                    disabled={disabled}
                    value={defaultValue}
                >
                    <option value="">{placeholder ?? `${capitalize(t("select"))} ${label}`}</option>
                    {items.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                {disabled && disabledDisplay && (
                    <ToolTipModal/>
                )}
            </div>

            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
    );
};

export default Dropdown;
