import React from "react";
import warning from "../assets/icons/warning.svg";
import Button from "../Components/Button/Button.jsx";
import {capitalize} from "../utils/helper.js";
import {useTranslation} from "react-i18next";

const ConfirmModal = ({ type = "confirm", isOpen, onClose, onConfirm, message, header }) => {

    const {t} = useTranslation();
    const defaultMessage = capitalize(t('deleteMessage'), false);
    const defaultHeader = capitalize(t('deleteHeader'), false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-primary/10 flex items-center justify-center z-50  overflow-y-auto">
            <div className="bg-white rounded-lg w-full max-w-md shadow-lg my-10">
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-4 bg-red-100 text-red-600 py-3 px-6 w-full">
                        <img src={warning} className="w-6 h-6 text-red-800" alt="Warning" />
                        <h3 className="font-semibold text-gray-900">{header || defaultHeader}</h3>
                    </div>
                        <p className="text-gray-600 px-6 py-4">
                            {message || defaultMessage}
                        </p>
                </div>

                <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 rounded-b-lg">
                    <Button onClick={onClose} fill={false} text={capitalize(t(type === "confirm" ? "cancel" : "close"))} className={"text-sm"}/>
                    {type === "confirm" &&
                        <Button onClick={onConfirm} danger text={capitalize(t("delete"))} className={"text-sm"}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;