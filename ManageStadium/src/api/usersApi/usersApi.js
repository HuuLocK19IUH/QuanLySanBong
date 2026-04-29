// src/api/sportfieldApi.js
import axios from "axios";

export const getUsers = async () => {
  const res = await axios.get("http://localhost:3000/api/users");
  return res.data;
};

