import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

/**
 * Tạo order mới
 */
export const createOrder = async (orderData) => {
    const res = await axios.post(API_URL, orderData);
    return res.data;
};