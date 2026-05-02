import Order from "../models/Order.js";
import Notification from "../models/Notification.js";
export const getBookedTimeSlotsBySportFieldAndDate = async (id_sportfield, date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const orders = await Order.find(
        {
            state: { $in: ["pending", "completed"] },
            id_sportfield,
            start_hour: {
                $gte: startOfDay,
                $lt: endOfDay,
            },
        },
        {
            start_hour: 1,
            end_hour: 1,
            _id: 0,
        }
    );

    const formatTime = (date) => {
        const d = new Date(date);

        const h = String(d.getHours()).padStart(2, "0");
        const m = String(d.getMinutes()).padStart(2, "0");

        return `${h}:${m}`;
    };

    return orders.map((o) => [
        formatTime(o.start_hour),
        formatTime(o.end_hour),
    ]);
};

export const createOrderService = async (orderData) => {
    // Đếm số order hiện tại
    const count = await Order.countDocuments();

    // Sinh mã order: O001, O002, ...
    const nextNumber = count + 1;
    const id_order = `O${String(nextNumber).padStart(3, "0")}`;

    // Tạo order mới
    const newOrder = new Order({
        id_order,
        ...orderData,
    });
    console.log(newOrder);
    // Lưu DB
    const savedOrder = await newOrder.save();

    try {
        const newNotification = new Notification({
            user_id: savedOrder.id_user,
            order_id: savedOrder.id_order,
            type: "order_completed",
            title: "Đặt sân thành công",
            message: `Đơn hàng ${savedOrder.id_order} của bạn đã được đặt thành công. Vui lòng thanh toán!`
        });
        await newNotification.save();
    } catch (error) {
        console.error("Error creating notification:", error);
    }

    return savedOrder;
};

export const getOrdersByUserService = async (id_user) => {
    return await Order.find({ id_user }).sort({ created_at: -1 });
};