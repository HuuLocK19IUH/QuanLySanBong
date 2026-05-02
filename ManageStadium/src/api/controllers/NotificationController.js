import Notification from "../models/Notification.js";

export const getNotificationsByUser = async (req, res) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json({
                message: "Thiếu user_id",
            });
        }

        const notifications = await Notification.find({ user_id })
            .sort({ created_at: -1 });

        res.status(200).json({
            message: "Lấy thông báo thành công",
            data: notifications,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
