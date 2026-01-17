// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const auth = require("./middleware/authMiddleware");
// const todoRoutes = require("./routes/todos");
// const authRoutes = require("./routes/auth");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // 🔗 MongoDB Connection
// mongoose
//   .connect(
//     "mongodb+srv://sravanimuduru207_db_user:Sravani%4017@cluster0.tlfgck3.mongodb.net/tododb?retryWrites=true&w=majority"
//   )
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(err));

// // 🔓 Public auth routes
// app.use("/auth", authRoutes);        // /signup , /login

// // 🔐 Protected todo routes
// app.use("/todos", auth, todoRoutes);

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });


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
