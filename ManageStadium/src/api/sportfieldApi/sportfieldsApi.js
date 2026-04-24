import axios from "axios";

const API_URL = "http://localhost:5000/api/sportfields";

export const getSportFields = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error("Lỗi khi gọi API sportfields:", err.response?.data || err.message);
    throw err.response?.data || { message: "Không thể lấy danh sách sân" };
  }
};