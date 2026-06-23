const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const errorHandler = require("./middleware/errorHandler");
const catchAsync = require("./utils/catchAsync");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const moduleRoutes = require("./routes/modulesRoutes");
const { testDatabaseConnection } = require("./config/db");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// app.use("/api/sessions", sessionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/modules", moduleRoutes);
// app.use("/api/analytics", analyticsRoutes);

app.get(
  "/api/health",
  catchAsync(async (req, res) => {
    await testDatabaseConnection();

    res.status(200).json({
      status: "success",
      message: "Student API is running",
      database: "connected",
    });
  })
);

app.use(errorHandler);

module.exports = app;