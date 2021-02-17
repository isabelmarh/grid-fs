import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { registerUser } from '../utils/api';
import { useSnackbar } from 'notistack';

const initialSate = {
    email: "",
    password: "",
    username: "",
    repeat_password: ""
};

const SignUp = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [signupval, setsignUpVal] = useState(initialSate);

    const handleChange = (ev) => {
        ev.persist();
        setsignUpVal((prev) => ({
            ...prev,
            [ev.target.name]: ev.target.value
        }));
        console.log(signupval);
    };

    const handleSubmit = async (ev) => {
        try {
            ev.preventDefault();
            const resp = await registerUser(signupval);
            if (resp) {
                enqueueSnackbar('Login successful', {
                    variant: 'success'
                });
            }
        } catch (err) {
            enqueueSnackbar(err.message, {
                variant: 'error'
            });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField required label="Email" name="email" fullWidth onChange={handleChange}></TextField>
                <TextField required label="Username" name="username" fullWidth onChange={handleChange}></TextField>
                <TextField required label="Password" type="password" name="password" fullWidth onChange={handleChange}></TextField>
                <TextField required label="Repeat password" type="password" name="repeat_password" fullWidth onChange={handleChange}></TextField>
                <Button type="submit" variant="contained" color="primary">Sign up</Button>
            </form>
        </div>
    );
};

export default SignUp;