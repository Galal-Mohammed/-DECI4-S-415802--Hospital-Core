const auth = require("../middleware/authMiddleware");

const express = require("express");

const router = express.Router();

const {
    createPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
} = require("../controllers/patientController");

router.post("/", auth, createPatient);

router.get("/", auth, getPatients);

router.get("/:id", auth, getPatientById);

router.put("/:id", auth, updatePatient);

router.delete("/:id", auth, deletePatient);

module.exports = router;