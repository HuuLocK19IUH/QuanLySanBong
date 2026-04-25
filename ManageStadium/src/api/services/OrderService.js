import Order from "../models/Order.js";
export const getBookedTimeSlotsBySportFieldAndDate = async (id_sportfield, date) => {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

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
        const h = String(d.getUTCHours()).padStart(2, "0");
        const m = String(d.getUTCMinutes()).padStart(2, "0");
        return `${h}:${m}`;
    };

    return orders.map((o) => [
        formatTime(o.start_hour),
        formatTime(o.end_hour),
    ]);
};