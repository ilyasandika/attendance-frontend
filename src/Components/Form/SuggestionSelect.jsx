import React, {useEffect, useState} from 'react';
import AsyncSelect from 'react-select/async';
import userServices from "../../services/userServices.js";

const SuggestionSelect = ({ label, onChange }) => {
    const loadOptions = async (inputValue) => {
        const res = await userServices.getUsers(0, inputValue, true);
        const users = res.data.payload.users;
        return users.map(user => ({
            label: `${user.employeeId} - ${user.name}`,
            value: user.id
        }));
    };

    useEffect(() => {
        loadOptions()
    }, [])



    return (
        <div>
            <label>{label}</label>
            <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                onChange={onChange}
                placeholder="Cari user ID atau nama..."
            />
        </div>
    );
};

export default SuggestionSelect;
