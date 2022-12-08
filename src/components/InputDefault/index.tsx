import React from 'react';
import { TextField } from '@mui/material'

interface InputDefaultProps {
    type: string;
    name: Name;
    label: string;
    value: string;
    color: 'error' | 'secondary';
    handleChange: (value: string, key: Name) => void;
}

export type Name = 'name' | 'email' | 'password' | 'repassword'

function InputDefault({ type, name, label, value, color, handleChange }: InputDefaultProps) {
    return (
        <TextField color={color} focused fullWidth name={name} label={label} variant="outlined" type={type} value={value} onChange={(ev) => handleChange(ev.target.value, name)}/>
    )
}

export { InputDefault }