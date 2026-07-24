const axios = require("axios");
const Patient = require("../models/Patient");
const MedicalRecord = require("../models/MedicalRecord");

exports.getDashboardStats = async (req, res) => {
    try {
        // Count patients
        const totalPatients = await Patient.countDocuments();

        // Count medical records
        const totalMedicalRecords = await MedicalRecord.countDocuments();

        // Get appointments from Appointment Service
        const appointmentResponse = await axios.get(
            "http://appointment-service:5001/api/appointments"
        );

        const appointments = appointmentResponse.data;

        res.status(200).json({
            totalPatients,
            totalMedicalRecords,
            totalAppointments: appointments.length,
            appointments
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Failed to load dashboard",
            error: error.message
        });
    }
};