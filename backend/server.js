const express = require("express");
const cors = require("cors");
require("dotenv").config();

const patientRoutes = require("./routes/patientRoutes");

const medicalRecordRoutes = require("./routes/medicalRecordRoutes");

const connectDB = require("./config/database");

const dashboardRoutes = require("./routes/dashboardRoutes");

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Hospital Backend Running");
});

// Health Check
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Healthcare API is running"
    });
});

const PORT = process.env.PORT || 5000;

app.use("/api/patients", patientRoutes);
app.use("/api/medical-records", medicalRecordRoutes);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/dashboard", dashboardRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});