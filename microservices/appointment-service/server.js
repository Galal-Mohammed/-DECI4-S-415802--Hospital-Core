const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Appointment Service Running");
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        service: "Appointment Service"
    });
});

app.use("/api/appointments", require("./routes/appointmentRoutes"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Appointment Service running on port ${PORT}`);
});