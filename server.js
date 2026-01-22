const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authMiddleware = require("./middleware/authMiddleware");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");

const app = express();

/* =======================
   GLOBAL MIDDLEWARE
======================= */
app.use(
  cors({
    origin: "*", // allow Netlify frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

/* =======================
   DATABASE CONNECTION
======================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

/* =======================
   ROUTES
======================= */

// 🔓 Public routes (NO TOKEN)
app.use("/auth", authRoutes);

// 🔐 Protected routes (TOKEN REQUIRED)
app.use("/todos", authMiddleware, todoRoutes);

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
  res.send("🚀 Todo API is running");
});

/* =======================
   SERVER
======================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
