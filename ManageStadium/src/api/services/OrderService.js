import Order from "../models/Order.js";
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

    return savedOrder;
};