import React, { useContext } from "react";
import { UserContext } from './../../context/UserContext';

const Dashboard = () => {
    const { user } = useContext(UserContext);
    return (
        <div>
            <h1>Hi I am Dashboard</h1>
            <pre>{JSON.stringify(user)}</pre>
        </div>
    );
};

export default Dashboard;
