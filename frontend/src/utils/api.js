import axios from "axios";

const token = localStorage.getItem("token");
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};
const registerUser = async (payload) => {
    try {
        const response = await axios.post("/api/user/register", payload);
        return response;
    } catch (err) {
        console.log(err.message);
    }
};

const loginUser = async (payload) => {
    try {
        const response = await axios.post("/api/user/login", payload);
        return response;
    } catch (err) {
        console.log(err.message);
    }
};

const fetchUser = async () => {
    try {
        const response = await axios.get("/api/user/getUser", config);
        return response;
    } catch (err) {
        console.log(err.message);
    }
};

const uploadFiles = async (payload) => {
    try {
        const response = await axios.post("/api/files/upload", payload, config);
        return response;
    } catch (err) {
        console.log(err.message);
    }
};
const getAllFiles = async (mytoken) => {
    try {
        var config = {
            headers: {
                Authorization: `Bearer ${mytoken}`
            }
        };
        const response = await axios.get("/api/files/getFiles", config);
        return response;
    } catch (err) {
        console.log(err.message);
    }
};
const deleteFile = async (id) => {
    try {
        const response = await axios.delete(`/api/files/delete/${id}`, config);
        return response;
    } catch (err) {
        console.log(err.message);
    }
};

const downloadFile = async (id) => {
    try {
        const response = await axios.get(`/api/files/download/${id}`, { ...config, responseType: "blob" });
        return response;
    } catch (err) {
        console.log(err.message);
    }
};

export {
    registerUser,
    loginUser,
    fetchUser,
    uploadFiles,
    getAllFiles,
    deleteFile,
    downloadFile,
};