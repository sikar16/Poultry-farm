import React, { useState, navigator } from 'react';
import { Button, TextField, Typography, Container, Paper } from '@mui/material';
import { useAddNewuserMutation } from '../service/userRegestration_service';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [addUser, { isError, isLoading, error }] = useAddNewuserMutation();
    const navigator = useNavigate()

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhoneNumber('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const userData = {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
        };
        try {
            const response = await addUser(userData).unwrap();
            alert(`Registration successful for ${firstName} ${lastName}`);
            if (response && response.data.token) {
                localStorage.setItem("token", JSON.stringify({ token: response.data.token }));
                navigator("/")
            }
            window.location.reload()
            console.log(response)

        } catch (err) {
            alert(`Registration failed: ${err.message || error}`);
        }
    };

    return (
        <div className='w-[60%] m-auto mt-3'>
            <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit} noValidate>
                    <TextField
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Phone Number"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    {isError && <div className="text-red-600">{error.message}</div>}
                    <div className="flex justify-between mt-4">
                        <Button color="secondary" onClick={resetForm} fullWidth style={{ marginRight: '10px' }}>
                            Cancel
                        </Button>
                        <Button color="primary" type="submit" fullWidth disabled={isLoading}>
                            {isLoading ? "Registering..." : "Register"}
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>
    );
}

export default Register;





