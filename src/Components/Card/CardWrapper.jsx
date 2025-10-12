import Button from "../Button/Button.jsx";
import {capitalize} from "../../utils/helper.js";
import {useTranslation} from "react-i18next";

const CardWrapper = ({title, type = "form", mode = "create", children}) => {
    const {t} = useTranslation();
    return (
        <div className="bg-white px-10 py-8 rounded-xl w-full max-w-6xl mx-auto">
            <h3 className="text-lg text-left font-semibold pb-5 border-b">{title}</h3>
            <div className="my-8">
                {children}
            </div>

            {
                type === "form" &&
                <div className="flex justify-end gap-2">
                    <Button type="link" to="/leaves" text="Cancel" fill={false} />
                    <Button text={capitalize(t(mode === "edit" ? "leaves.update" : "leaves.create"))} />
                </div>
            }
        </div>
    )
}

export default CardWrapper;