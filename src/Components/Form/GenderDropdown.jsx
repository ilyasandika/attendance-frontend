import {capitalize} from "../../utils/helper.js";
import {useTranslation} from "react-i18next";
import {inputBackground, inputBorder} from "../../constant.js";

const GenderDropdown = ({ handleChange, name, value = undefined, error = null}) => {
    const {t} = useTranslation();
    return (
        <div className="flex flex-col">
            <label htmlFor="employeeGender" className="text-sm font-semibold">
                {capitalize(t("user.gender"))}
            </label>
            <select
                id="employeeGender"
                name={name}
                onChange={handleChange}
                value={value ? value : undefined}
                className={`input ${inputBorder} mt-2 rounded-md py-2 px-4 text-sm ${inputBackground}`}>
                <option value="male">{capitalize(t("male"))}</option>
                <option value="female">{capitalize(t("female"))}</option>
            </select>

            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
    );
};

export default GenderDropdown;
