const express = require("express");

const router = express.Router();

const {
  createMedicalRecord,
  getMedicalRecords,
  getMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
} = require("../controllers/medicalRecordController");

router.post("/", createMedicalRecord);

router.get("/", getMedicalRecords);

router.get("/:id", getMedicalRecord);

router.put("/:id", updateMedicalRecord);

router.delete("/:id", deleteMedicalRecord);

module.exports = router;