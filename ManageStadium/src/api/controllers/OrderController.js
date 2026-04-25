import { getBookedTimeSlotsBySportFieldAndDate } from "../services/OrderService.js";

export const getBookedSlots = async (req, res) => {
    try {
        const { id_sportfield, date } = req.query;

        if (!id_sportfield || !date) {
            return res.status(400).json({
                message: "Thiếu id_sportfield hoặc date",
            });
        }

        const orders = await getBookedTimeSlotsBySportFieldAndDate(
            id_sportfield,
            date
        );

        res.status(200).json({
            message: "Lấy danh sách slot thành công",
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};