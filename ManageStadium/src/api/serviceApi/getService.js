import axios from "axios";

export const getServices = async () => {
    const res = await axios.get("http://localhost:5000/api/services");
    return res.data;
};

