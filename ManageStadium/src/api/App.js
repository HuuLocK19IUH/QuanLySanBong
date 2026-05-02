import express from "express";
import cors from "cors";
import userRoutes from "./routes/UserRoutes.js";
import sportFieldRoutes from "./routes/SportfieldRoutes.js";
import ratingRoutes from "./routes/RatingRoutes.js";
import serviceRoutes from "./routes/ServiceRoutes.js";
import uploadRoutes from "./routes/UploadRoute.js";

import orderRoutes from "./routes/OrderRoutes.js";
import notificationRoutes from "./routes/NotificationRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/sportfields", sportFieldRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/api/orders", orderRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/uploads", express.static("public/uploads"));

export default app;
