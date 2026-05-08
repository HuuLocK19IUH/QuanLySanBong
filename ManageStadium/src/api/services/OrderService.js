import mongoose from "mongoose";
import Order from "../models/Order.js";
import SportField from "../models/Sportfield.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

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
    // 1. Tự động kiểm tra và cập nhật các đơn hàng quá 15 phút thành expired
    try {
        const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);
        const expiredOrders = await Order.find({
            state: "pending",
            date_created: { $lte: fifteenMinsAgo }
        });

        for (let order of expiredOrders) {
            order.state = "expired";
            await order.save();

            const newNotification = new Notification({
                user_id: order.id_user,
                order_id: order.id_order,
                type: "order_expired",
                title: "Đơn đặt sân đã hết hạn",
                message: `Đơn đặt sân ${order.id_order} của bạn đã hết thời gian chờ thanh toán (15 phút) và đã bị hủy.`,
            });
            await newNotification.save();
        }
    } catch (err) {
        console.error("Lỗi tự động cập nhật đơn hết hạn:", err);
    }

    // 2. Tiếp tục lấy danh sách đơn hàng như bình thường
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

    // Tạo thông báo mới với trạng thái order_pending
    const newNotification = new Notification({
        user_id: savedOrder.id_user,
        order_id: savedOrder.id_order,
        type: "order_pending",
        title: "Đơn đặt sân đang chờ xử lý",
        message: `Đơn đặt sân ${savedOrder.id_order} của bạn đã được ghi nhận. Vui lòng chờ quản trị viên xác nhận thanh toán.`,
    });
    await newNotification.save();

    return savedOrder;
};

export const getAllOrders = async () => {
    // Tự động kiểm tra và cập nhật các đơn hàng quá 15 phút thành expired
    try {
        const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);
        const expiredOrders = await Order.find({
            state: "pending",
            date_created: { $lte: fifteenMinsAgo }
        });

        for (let order of expiredOrders) {
            order.state = "expired";
            await order.save();

            const newNotification = new Notification({
                user_id: order.id_user,
                order_id: order.id_order,
                type: "order_expired",
                title: "Đơn đặt sân đã hết hạn",
                message: `Đơn đặt sân ${order.id_order} của bạn đã hết thời gian chờ thanh toán (15 phút) và đã bị hủy.`,
            });
            await newNotification.save();
        }
    } catch (err) {
        console.error("Lỗi tự động cập nhật đơn hết hạn:", err);
    }

    const orders = await Order.find().sort({ date_created: -1 }).lean();

    const sportfields = await SportField.find().lean();
    const sportfieldMap = new Map();
    sportfields.forEach((field) => {
        sportfieldMap.set(field.sportfield_id, field);
        sportfieldMap.set(String(field._id), field);
    });

    const users = await User.find().lean();
    const userMap = new Map();
    users.forEach(u => userMap.set(u.id_user, u));

    const mappedOrders = orders.map((order) => ({
        ...order,
        sportfield: sportfieldMap.get(order.id_sportfield) || null,
        user: userMap.get(order.id_user) || null
    }));

    return mappedOrders;
};

export const updateOrderStatus = async (id_order, newState) => {
    const order = await Order.findOne({ id_order: id_order });
    if (!order) throw new Error("Không tìm thấy đơn hàng");
    order.state = newState;
    await order.save();
    return order;
};