import axios from 'axios';
const token = localStorage.getItem("token");
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    }
};

const registerUser = async (payload) => {
    try {
        const response = await axios.post("/api/user/register", payload);
        return response;
    } catch (error) {
        console.log(error.message);
    }
};

const loginUser = async (payload) => {
    try {
        const response = await axios.post("/api/user/login", payload);
        return response;
    } catch (error) {
        console.log(error.message);
    }
};

const fetchUser = async () => {
    try {
        const response = await axios.get("/api/user/getUser", config);
        return response;
    } catch (error) {
        console.log(error.message);
    }
};

export { registerUser, loginUser, fetchUser };