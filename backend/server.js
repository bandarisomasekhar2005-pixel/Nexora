import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import crudRoutes from "./routes/crud.js";
import { protect } from "./middleware/auth.js";
import { dashboard } from "./controllers/dashboardController.js";
import { search } from "./controllers/searchController.js";

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_, res) => res.json({ status: "ok", service: "nexora-api" }));
app.use("/api/auth", authRoutes);
app.get("/api/dashboard", protect, dashboard);
app.get("/api/search", protect, search);
app.use("/api", crudRoutes);

const port = process.env.PORT || 5000;

connectDB()
  .then(() => app.listen(port, () => console.log(`Nexora API running on port ${port}`)))
  .catch(err => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
