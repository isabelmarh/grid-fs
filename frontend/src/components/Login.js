import React, { useState, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { loginUser } from "../utils/api";
import { useSnackbar } from "notistack";
import { UserContext } from '../context/UserContext';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const initialState = {
    username: "",
    password: "",
};

const useStyles = makeStyles((theme) => ({
    form: {
        "& > div": {
            margin: "15px 0",
        }
    },
    button: {
        margin: "15px 0",
        width: "100%",
        background: "#009688",
    }
}));

const Login = () => {
    const classes = useStyles();
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
                localStorage.setItem("token", resp.data.token);
                setUser({ user: resp.data.user, isLoggedIn: true });
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

    useEffect(() => {
        if (user.isLoggedIn) {
            history.push("/dashboard");
        }
    }, [user, history]);

    return (
        <div>
            <form onSubmit={handleSubmit} className={classes.form}>
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
                <Button className={classes.button} type="submit" variant="contained" color="primary">
                    Log in
        </Button>
            </form>
        </div>
    );
};

export default Login;