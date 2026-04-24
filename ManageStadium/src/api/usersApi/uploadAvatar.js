import axios from "axios";

export const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData
    );

    return res.data;
};