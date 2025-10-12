import { useState } from "react";

export function useErrors() {
    const [fieldErrors, setFieldErrors] = useState({});
    const [generalError, setGeneralError] = useState(null);

    function setErrors(err) {
        if (err.status === 422) {
            setFieldErrors(err.errors);
            console.log(err.errors)
        } else {
            setGeneralError(err.errors);
        }
    }

    function removeErrorsByField(field) {
        setFieldErrors(fieldErrors => ({
            ...fieldErrors,
            [field]: null,
        }));
    }

    function clearErrors() {
        setFieldErrors({});
        setGeneralError(null);
    }

    return {
        fieldErrors,
        generalError,
        setErrors,
        clearErrors,
        removeErrorsByField,
    };
}
