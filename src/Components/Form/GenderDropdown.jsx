import {capitalize} from "../../utils/helper.js";
import {useTranslation} from "react-i18next";

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
                className="input border border-primary/10 mt-2 rounded-md py-2 px-4 text-sm">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
    );
};

export default GenderDropdown;
