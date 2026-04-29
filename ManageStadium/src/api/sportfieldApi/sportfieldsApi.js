import axios from "axios";

const API_BASE = "http://localhost:5000/api";
const SPORTFIELDS_URL = `${API_BASE}/sportfields`;
const RATINGS_URL = `${API_BASE}/ratings`;
const SERVICES_URL = `${API_BASE}/services`;

export const getSportFields = async () => {
  try {
    const res = await axios.get(SPORTFIELDS_URL);
    return res.data;
  } catch (err) {
    console.error("Lỗi khi gọi API sportfields:", err.response?.data || err.message);
    throw err.response?.data || { message: "Không thể lấy danh sách sân" };
  }
};

export const getSportFieldById = async (id) => {
  try {
    const res = await axios.get(`${SPORTFIELDS_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi khi gọi API sportfield by id:", err.response?.data || err.message);
    throw err.response?.data || { message: "Không thể lấy chi tiết sân" };
  }
};

export const getRatingsByField = async (sportfieldId) => {
  try {
    const res = await axios.get(RATINGS_URL, { params: { sportfield_id: sportfieldId } });
    return res.data;
  } catch (err) {
    console.error("Lỗi khi gọi API ratings:", err.response?.data || err.message);
    throw err.response?.data || { message: "Không thể lấy đánh giá" };
  }
};

export const createRating = async (ratingData) => {
  try {
    const res = await axios.post(RATINGS_URL, ratingData);
    return res.data;
  } catch (err) {
    console.error("Lỗi khi tạo rating:", err.response?.data || err.message);
    throw err.response?.data || { message: "Không thể tạo đánh giá" };
  }
};

export const getServices = async () => {
  try {
    const res = await axios.get(SERVICES_URL);
    return res.data;
  } catch (err) {
    console.error("Lỗi khi gọi API services:", err.response?.data || err.message);
    throw err.response?.data || { message: "Không thể lấy dịch vụ" };
  }
};