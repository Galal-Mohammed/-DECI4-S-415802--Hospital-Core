const Appointment = require("../models/Appointment");

// Create Appointment
exports.createAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);

        res.status(201).json(appointment);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Get All Appointments
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();

        res.json(appointments);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Get One Appointment
exports.getAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        res.json(appointment);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Update Appointment
exports.updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(appointment);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Delete Appointment
exports.deleteAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);

        res.json({
            message: "Appointment deleted"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};