import React from "react";
import warning from "../assets/icons/warning.svg";
import Button from "../Components/Button/Button.jsx";
import {capitalize} from "../utils/helper.js";
import {useTranslation} from "react-i18next";
import TextBox from "../Components/Form/TextBox.jsx";

const DetailModal = ({ type = "confirm", isOpen, onClose, onConfirm, header, children }) => {

    const {t} = useTranslation();
    const defaultHeader = capitalize(t('detail'), false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-primary/10 flex items-center justify-center z-50  overflow-y-auto">
            <div className="bg-white rounded-lg w-full max-w-md shadow-lg">
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-4 py-3 px-6 w-full border-b-2 border-primary/10 ">
                        {/*<img src={warning} className="w-6 h-6 text-red-800" alt="Warning" />*/}
                        <h3 className="font-semibold text-primary">{header || defaultHeader}</h3>
                    </div>
                    <div className="px-6 py-4 w-full">
                        {children}
                    </div>
                </div>

                <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 rounded-b-lg">
                    <Button onClick={onClose} fill={false} text={capitalize(t(type === "confirm" ? "cancel" : "close"))} className={"text-sm"}/>
                    {type === "confirm" &&
                        <Button onClick={onConfirm} text={capitalize(t("confirm"))} className={"text-sm text-white"}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default DetailModal;