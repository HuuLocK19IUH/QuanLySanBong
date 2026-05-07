import Notification from "../models/Notification.js";

export const getNotificationsByUserIdService = async (userId) => {
    try {
        return await Notification.find({ user_id: userId }).sort({ created_at: -1 });
    } catch (err) {
        throw new Error("Lỗi khi lấy thông báo");
    }
};

export const markNotificationAsReadService = async (id) => {
    try {
        return await Notification.findByIdAndUpdate(id, { is_read: true }, { new: true });
    } catch (err) {
        throw new Error("Lỗi khi cập nhật thông báo");
    }
};
