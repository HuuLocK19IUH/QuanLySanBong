import { getNotificationsByUserIdService, markNotificationAsReadService } from "../services/NotificationService.js";

export const getNotificationsByUserId = async (req, res) => {
    try {
        const data = await getNotificationsByUserIdService(req.params.userId);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const markNotificationAsRead = async (req, res) => {
    try {
        const data = await markNotificationAsReadService(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
