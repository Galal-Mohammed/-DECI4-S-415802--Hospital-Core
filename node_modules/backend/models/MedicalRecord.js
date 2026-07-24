const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema(
{
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },

    type: {
        type: String,
        enum: ["checkup", "prescription", "lab result", "referral"],
        required: true
    },

    diagnosis: {
        type: String,
        required: true
    },

    medication: {
        type: String
    },

    notes: {
        type: String
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);