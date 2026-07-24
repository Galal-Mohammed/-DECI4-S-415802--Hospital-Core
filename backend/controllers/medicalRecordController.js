const MedicalRecord = require("../models/MedicalRecord");

// Create
const createMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All
const getMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find().populate("patient");

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get One
const getMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id).populate(
      "patient"
    );

    if (!record) {
      return res.status(404).json({
        message: "Medical record not found",
      });
    }

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update
const updateMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("patient");

    if (!record) {
      return res.status(404).json({
        message: "Medical record not found",
      });
    }

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete
const deleteMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({
        message: "Medical record not found",
      });
    }

    res.status(200).json({
      message: "Medical record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMedicalRecord,
  getMedicalRecords,
  getMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
};