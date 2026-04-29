import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const updateUser = async (data) => {
    try {
        const res = await axios.put(API_URL, data);
        return res.data;
    } catch (err) {
        throw err.response?.data || { message: "Update failed" };
    }
};