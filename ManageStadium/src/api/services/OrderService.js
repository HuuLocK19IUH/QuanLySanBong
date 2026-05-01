import mongoose from "mongoose";
import Order from "../models/Order.js";
import SportField from "../models/Sportfield.js";

export const getBookedTimeSlotsBySportFieldAndDate = async(id_sportfield, date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const orders = await Order.find({
        state: { $in: ["pending", "completed"] },
        id_sportfield,
        start_hour: {
            $gte: startOfDay,
            $lt: endOfDay,
        },
    }, {
        start_hour: 1,
        end_hour: 1,
        _id: 0,
    });

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

export const getOrdersByUserId = async(userId, search = "") => {
    if (!userId) {
        return [];
    }

    const orders = await Order.find({ id_user: userId }).sort({ start_hour: -1 }).lean();
    if (!orders.length) {
        return [];
    }

    const orderIds = orders.map((order) => order.id_sportfield).filter(Boolean);
    const objectIds = orderIds
        .filter((id) => mongoose.Types.ObjectId.isValid(id))
        .map((id) => new mongoose.Types.ObjectId(id));

    const sportfieldQuery = {
        $or: [{ sportfield_id: { $in: orderIds } }],
    };
    if (objectIds.length > 0) {
        sportfieldQuery.$or.push({ _id: { $in: objectIds } });
    }

    const sportfields = await SportField.find(sportfieldQuery).lean();
    const sportfieldMap = new Map();

    sportfields.forEach((field) => {
        sportfieldMap.set(field.sportfield_id, field);
        sportfieldMap.set(String(field._id), field);
    });

    const mappedOrders = orders.map((order) => ({
        ...order,
        sportfield: sportfieldMap.get(order.id_sportfield) || null,
    }));

    if (!search.trim()) {
        return mappedOrders;
    }

    const lowerSearch = search.toLowerCase();
    return mappedOrders.filter((order) => {
        const sportfield = order.sportfield;
        const name = sportfield && sportfield.title ? sportfield.title.toLowerCase() : "";
        const type = sportfield && sportfield.sportfield_type ? sportfield.sportfield_type.toLowerCase() : "";
        return name.includes(lowerSearch) || type.includes(lowerSearch);
    });
};

export const createOrderService = async(orderData) => {
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