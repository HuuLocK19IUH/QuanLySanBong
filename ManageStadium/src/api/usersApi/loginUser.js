import axios from "axios";

export const loginUser = async (phone, password) => {
    try {
        const res = await axios.post("http://localhost:5000/api/users/login", {
            phone_number: phone,
            password: password
        });

        return res.data;
    } catch {
        return null;
    }
};