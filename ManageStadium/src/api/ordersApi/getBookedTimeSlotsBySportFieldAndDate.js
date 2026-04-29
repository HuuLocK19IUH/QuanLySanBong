import axios from "axios";

export const getBookedSlotsAPI = async (id_sportfield, date) => {
    try {
        const res = await axios.get(
            "http://localhost:5000/api/orders/booked-slots",
            {
                params: {
                    id_sportfield,
                    date,
                },
            }
        );

        return res.data.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};