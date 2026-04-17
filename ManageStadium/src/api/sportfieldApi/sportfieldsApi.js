// src/api/sportfieldApi.js
import axios from "axios";

export const getSportFields = async () => {
  const res = await axios.get("http://localhost:3000/api/sportfields");
  return res.data;
};