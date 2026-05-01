import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

export const getOrdersByUser = async(userId, search = "") => {
    try {
        const res = await axios.get(API_URL, {
            params: {
                user_id: userId,
                search,
            },
        });

        return res.data.data || [];
    } catch (error) {
        throw (error.response && error.response.data) || error;
    }
};