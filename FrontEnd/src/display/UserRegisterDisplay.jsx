import React, { useState } from 'react';
import { Box, TextField, Paper, Button, Typography } from "@mui/material";

const UserRegisterDisplay = () => {

    const [formData, setFormData] = useState(new FormData());
    const [inputs, setInputs] = useState({
        name: '',
        lastName: '',
        password: '',
        passConfirmation: '',
        email: ''
    });

    const [inputSuccess, setInputSuccess] = useState({
        name: false,
        lastName: false,
        password: false,
        passConfirmation: false,
        email: false
    });

    const [borderStyles, setBorderStyles] = useState({
        name: { width: '20vw' },
        lastName: { width: '20vw' },
        password: { width: '20vw' },
        passConfirmation: { width: '20vw'},
        email: { width: '20vw' }
    });

    const [labels, setLabels] = useState({
        name: "",
        lastName: "",
        password: "",
        passConfirmation: "",
        email: ""
    });

    const handleInputChange = (field, value) => {
        setInputs(prevInputs => ({ ...prevInputs, [field]: value }));
        setInputSuccess(prevInputSuccess => ({ ...prevInputSuccess, [field]: value !== '' }));
        setBorderStyles(prevBorderStyles => ({ ...prevBorderStyles, [field]: value !== '' ? { width: '20vw', border: 'none' } : { minWidth: '20vw', maxWidth: '45vw', border: '1px solid red', borderRadius: '5px' } }));
        setLabels(prevLabels => ({
            ...prevLabels,
            [field]: value !== '' ? "" : `You need to enter your ${inputFields.find(input => input.name === field).label}`
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputs.password === inputs.passConfirmation) {
            setInputSuccess(prevInputSuccess => ({ ...prevInputSuccess, password: true, passConfirmation: true }));
            setBorderStyles(prevBorderStyles => ({
                ...prevBorderStyles,
                password: { width: '20vw', border: 'none' },
                passConfirmation: { width: '20vw', border: 'none' }
            }));
            setLabels(prevLabels => ({ ...prevLabels, password: "" }));
        } else {
            setBorderStyles(prevBorderStyles => ({
                ...prevBorderStyles,
                password: { width: '20vw', border: '1px solid red', borderRadius: '5px' },
                passConfirmation: { width: '20vw', border: '1px solid red', borderRadius: '5px' }
            }));
            setLabels(prevLabels => ({ ...prevLabels, password: "Your passwords do not match" }));
        }

        if (inputs.email.includes('@') && inputs.email !== '') {
            setInputSuccess(prevInputSuccess => ({ ...prevInputSuccess, email: true }));
            setBorderStyles(prevBorderStyles => ({ ...prevBorderStyles, email: { width: '20vw', border: 'none' } }));
        } else {
            setBorderStyles(prevBorderStyles => ({
                ...prevBorderStyles,
                email: { width: '20vw', border: '1px solid red', borderRadius: '5px' }
            }));
        }

        if (Object.values(inputSuccess).every(success => success)) {
            console.log(inputs.name);
            console.log(inputs.lastName);
            console.log(inputs.password);
            console.log(inputs.passConfirmation);
        }
    };

    const inputFields = [
        { name: "name", label: "Name", type: "text" },
        { name: "lastName", label: "Last Name", type: "text" },
        { name: "password", label: "Password", type: "password" },
        { name: "passConfirmation", label: "Confirm your password", type: "password" },
        { name: "email", label: "Email", type: "email" }
    ];

    return (
    <Box sx={{ padding: "10vw" }}>
            <Box component="form" onSubmit={handleSubmit} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                gap: "3vw",
            }}>
                {inputFields.map((field) => (
                    <Box key={field.name}>
                        <TextField
                            name={field.name}
                            placeholder={field.label}
                            label={borderStyles[field.name].border ? '' : field.label}
                            type={field.type}
                            value={inputs[field.name]}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            sx={{
                                ...borderStyles[field.name],
                                '@media (max-width: 768px)': {
                                    width: '100%',
                                },
                            }}
                        />
                        <Typography>{labels[field.name]}</Typography>
                    </Box>
                ))}
                <Button variant="text" type="submit" sx={{ border: "1px solid black", borderRadius: "0px", padding: "1vw", width: "20vw", color: "black", '@media (max-width: 768px)': {width: '50%'}, }}>Create Account</Button>
            </Box>
        </Box>
    )
}

export default UserRegisterDisplay;
