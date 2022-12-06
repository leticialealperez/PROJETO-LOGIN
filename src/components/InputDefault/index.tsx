import React from 'react';
import { TextField } from '@mui/material'

interface InputDefaultProps {
    type: string;
    name: string;
    label: string;
    value: string;
    handleChange: () => void;
}

function InputDefault({ type, name, label, value, handleChange }: InputDefaultProps) {
    return (
        <TextField color='secondary' focused fullWidth name={name} label={label} variant="outlined" type={type} value={value} onChange={handleChange}/>
    )
}

export { InputDefault }