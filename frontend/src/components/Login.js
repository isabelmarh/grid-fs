import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { loginUser } from "../utils/api";
import { useSnackbar } from "notistack";
import { UserContext } from '../context/UserContext';
import { useHistory } from 'react-router-dom';

const initialState = {
    username: "",
    password: "",
};
const Login = () => {
    const [loginval, setLoginVal] = useState(initialState);
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const { user, setUser } = useContext(UserContext);
    const handleChange = (ev) => {
        ev.preventDefault();
        setLoginVal((prev) => ({
            ...prev,
            [ev.target.name]: ev.target.value,
        }));
    };

    const handleSubmit = async (ev) => {
        try {
            ev.preventDefault();
            const resp = await loginUser(loginval);
            if (resp.status === 200) {
                setUser({ user: resp.data.user, isLoggedin: true });
                localStorage.setItem("token", resp.data.token);
                enqueueSnackbar("Login Successful", {
                    variant: "success",
                });
                history.push("/dashboard");
            }
        } catch (err) {
            enqueueSnackbar("Incorrect Credentials", {
                variant: "error",
            });
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    label="Email"
                    name="email"
                    fullWidth
                    onChange={handleChange}
                ></TextField>
                <TextField
                    required
                    label="Password"
                    name="password"
                    fullWidth
                    type="password"
                    onChange={handleChange}
                ></TextField>
                <Button type="submit" variant="contained" color="primary">
                    Log in
        </Button>
            </form>
        </div>
    );
};

export default Login;