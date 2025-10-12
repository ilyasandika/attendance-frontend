import {capitalize} from "../../utils/helper.js";
import Button from "../Button/Button.jsx";
import {useTranslation} from "react-i18next";

const FormWrapper = ({
                         header,
                         handleSubmit,
                         button = {},
                         children
                     }) => {
    const { t } = useTranslation();

    const cancelButton = {
        to: button?.cancel?.to || "/dashboard",
        text: button?.cancel?.text || capitalize(t("cancel")),
    };

    const submitButton = {
        ...button?.submit,
        text: button?.submit?.text || capitalize(t("submit")),
    };

    return (
        <div className="bg-white p-12 rounded-xl w-full">
            <h3 className="text-xl text-left font-bold mb-6 border-b-2 border-primary/40 pb-6">{header}</h3>
            <form onSubmit={handleSubmit} className="space-y-10 text-left mt-10">
                {children}
                <div className="flex justify-end gap-2 border-t-2 border-primary/40 pt-8">
                    <Button type="link" to={cancelButton.to} text={cancelButton.text} fill={false} />
                    <Button type="submit" text={submitButton.text} />
                </div>
            </form>
        </div>
    );
};


export default FormWrapper;