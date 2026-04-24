import axios from "axios";

export const createUser = async (phone, password) => {
    try {
        const res = await axios.post("http://localhost:5000/api/users/register", {
            phone_number: phone,
            password: password
        });

        return res.data;
    } catch (error) {
        console.error("Lỗi khi tạo user:", error.response?.data || error.message);
        return null;
    }
};