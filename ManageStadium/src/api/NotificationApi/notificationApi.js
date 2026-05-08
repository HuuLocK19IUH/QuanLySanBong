import axios from "axios";

const API_BASE = "http://localhost:5000/api/notifications";

export const getNotificationsByUserId = async (userId) => {
    try {
        const res = await axios.get(`${API_BASE}/user/${userId}`);
        return res.data;
    } catch (err) {
        console.error("Lỗi khi gọi API getNotificationsByUserId:", err.response?.data || err.message);
        throw err.response?.data || { message: "Không thể lấy danh sách thông báo" };
    }
};

export const markNotificationAsRead = async (id) => {
    try {
        const res = await axios.put(`${API_BASE}/${id}/read`);
        return res.data;
    } catch (err) {
        console.error("Lỗi khi gọi API markNotificationAsRead:", err.response?.data || err.message);
        throw err.response?.data || { message: "Không thể cập nhật trạng thái thông báo" };
    }
};
