const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const auth = require("./middleware/authMiddleware");
const todoRoutes = require("./routes/todos");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔗 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// 🔓 Public auth routes
app.use("/auth", authRoutes);

// 🔐 Protected todo routes
app.use("/todos", auth, todoRoutes);

// ✅ Dynamic port (IMPORTANT)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
