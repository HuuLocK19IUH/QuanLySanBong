import axios from "axios";

export const getNumberUser = async () => {
    try {
        const res = await axios.get("http://localhost:3000/api/users");
        return res.data.length;
    } catch (error) {
        console.error("Lỗi khi lấy user:", error);
        return null;
    }
};