import React from "react";
import {CheckCircleIcon} from "@heroicons/react/16/solid/index.js";
import Button from "../Components/Button/Button.jsx";
import {useTranslation} from "react-i18next";
import {capitalize} from "../utils/helper.js";

const AlertModal = ({ header = null, message = "success doing something", onClose }) => {
    const {t} = useTranslation();
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center animate-fade-in">
                <div className="mx-auto mb-4 flex w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircleIcon className="w-full text-green-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2 capitalize">{!header ? capitalize(t("success")) : header}!</h2>
                <p className="text-gray-600 text-sm mb-4">{message}</p>
                <Button
                    onClick={onClose}
                    text={capitalize(t('close'))}
                    success
                />
            </div>
        </div>
    );
};

export default AlertModal;
