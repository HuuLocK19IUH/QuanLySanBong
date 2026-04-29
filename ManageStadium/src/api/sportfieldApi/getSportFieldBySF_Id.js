import axios from "axios";

const API_URL = "http://localhost:5000/api/sportfields/code";

export const getSportFieldBySF_Id = async (SF_Id) => {
    try {
        const res = await axios.get(`${API_URL}/${SF_Id}`);
        return res.data;
    } catch (err) {
        console.error("Lỗi khi gọi API sportfields:", err.response?.data || err.message);
        throw err.response?.data || { message: "Không thể lấy thông tin sân" };
    }
};