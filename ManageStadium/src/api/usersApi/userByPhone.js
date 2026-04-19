import axios from "axios";

export const getUserByPhone = async (phone) => {
  try {
    const res = await axios.get("http://localhost:3000/api/users");

    return res.data.find(
      (user) => user.phone_number === phone
    ) || null;

  } catch (error) {
    console.error("Lỗi khi lấy user:", error);
    return null;
  }
};