import React, { createContext, useState, useEffect } from "react";
import { fetchUser } from "../utils/api";

export const UserContext = createContext();
const initialState = {
    user: null,
    isLoggedIn: false,
};
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(initialState);

    const handleLogOut = () => {
        localStorage.removeItem("token");
        setUser(initialState)
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const resp = await fetchUser();
                if (resp.status === 200 || resp.status === 304) {
                    setUser({ user: resp.data.user, isLoggedIn: true });
                }
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser, handleLogOut }}>
            {children}
        </UserContext.Provider>
    );
};