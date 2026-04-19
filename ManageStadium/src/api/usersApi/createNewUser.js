import axios from "axios";
import { getNumberUser } from "./getNumberUser";

export const createUser = async (phone, password) => {
    try {
        const total = await getNumberUser();

        const generateUserId = (num) => {
            const next = num + 1;
            return "U" + String(next).padStart(3, "0");
        };

        const res = await axios.post("http://localhost:3000/api/users", {
            id_user: generateUserId(Number(total) || 0),
            phone_number: phone,
            password: password,
            name: "Nguyễn văn A",
            date_of_birth: null,
            gender: "Nam",
            avatar: "/images/User_cicrle_light.png",
        });

        return res.data;

    } catch (error) {
        console.error("Lỗi khi tạo user:", error);
        return null;
    }
};