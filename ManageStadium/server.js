import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/stadiumManagedb")
  .then(() => console.log("✅ Connected MongoDB"))
  .catch(err => console.log("❌ DB Error:", err));

// ================= API =================

// USERS
app.get("/api/users", async (req, res) => {
  try {
    const data = await mongoose.connection.db
      .collection("users")
      .find()
      .toArray();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SPORTFIELDS
app.get("/api/sportfields", async (req, res) => {
  try {
    const data = await mongoose.connection.db
      .collection("sportfields")
      .find()
      .toArray();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ORDERS
app.get("/api/orders", async (req, res) => {
  try {
    const data = await mongoose.connection.db
      .collection("orders")
      .find()
      .toArray();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SERVICES
app.get("/api/services", async (req, res) => {
  try {
    const data = await mongoose.connection.db
      .collection("services")
      .find()
      .toArray();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RATINGS
app.get("/api/ratings", async (req, res) => {
  try {
    const data = await mongoose.connection.db
      .collection("ratings")
      .find()
      .toArray();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================================

// chạy server
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});