require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");
const dashboardRoutes = require("./routes/dashboard");
const attendanceRoutes = require("./routes/attendance");
const exportRoutes = require("./routes/export");

const auth = require("./middleware/auth");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((e) => console.log("❌ Mongo Error:", e.message));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/students", auth, studentRoutes);
app.use("/api/dashboard", auth, dashboardRoutes);
app.use("/api/attendance", auth, attendanceRoutes);
app.use("/api/export", auth, exportRoutes);

// FRONTEND ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.get("/students", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "students.html"));
});

// FIXED ROUTE (IMPORTANT)
app.get("/create-admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "create-admin.html"));
});

// Render uses dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
