import { getBookedTimeSlotsBySportFieldAndDate, createOrderService, getOrdersByUserId } from "../services/OrderService.js";

export const getBookedSlots = async(req, res) => {
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

export const getOrdersByUser = async(req, res) => {
    try {
        const { user_id, search } = req.query;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: "Thiếu user_id",
            });
        }

        const orders = await getOrdersByUserId(user_id, search || "");

        return res.status(200).json({
            success: true,
            message: "Lấy lịch sử đặt sân thành công",
            data: orders,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Lỗi khi lấy lịch sử đặt sân",
        });
    }
};

export const createOrderController = async(req, res) => {
    try {
        const orderData = req.body;
        console.log("BODY:", req.body);
        const newOrder = await createOrderService(orderData);

        return res.status(201).json({
            success: true,
            message: "Create order successfully",
            data: newOrder,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Create order failed",
            error: error.message,
        });
    }
};