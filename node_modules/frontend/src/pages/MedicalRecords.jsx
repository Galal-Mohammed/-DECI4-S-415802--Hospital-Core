import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    patient: "",
    type: "checkup",
    diagnosis: "",
    medication: "",
    notes: "",
  });

  const fetchRecords = async () => {
    try {
      const response = await api.get("/medical-records");
      setRecords(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await api.get("/patients");
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchPatients();
      await fetchRecords();
      setLoading(false);
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveRecord = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/medical-records/${editingId}`, form);
      } else {
        await api.post("/medical-records", form);
      }

      setForm({
        patient: "",
        type: "checkup",
        diagnosis: "",
        medication: "",
        notes: "",
      });

      setEditingId(null);

      fetchRecords();
    } catch (error) {
      console.error(error);
      alert("Failed to save medical record");
    }
  };

  const editRecord = (record) => {
    setEditingId(record._id);

    setForm({
      patient: record.patient._id,
      type: record.type,
      diagnosis: record.diagnosis,
      medication: record.medication || "",
      notes: record.notes || "",
    });
  };

  const deleteRecord = async (id) => {
    if (!window.confirm("Delete this medical record?")) return;

    try {
      await api.delete(`/medical-records/${id}`);
      fetchRecords();
    } catch (error) {
      console.error(error);
      alert("Failed to delete medical record");
    }
  };
    return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="mb-4">Medical Records</h2>

        <div className="card mb-4">
          <div className="card-header">
            {editingId ? "Edit Medical Record" : "Add Medical Record"}
          </div>

          <div className="card-body">
            <form onSubmit={saveRecord}>

              <div className="mb-3">
                <label className="form-label">Patient</label>

                <select
                  className="form-select"
                  name="patient"
                  value={form.patient}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Patient</option>

                  {patients.map((patient) => (
                    <option key={patient._id} value={patient._id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Record Type</label>

                <select
                  className="form-select"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option value="checkup">Checkup</option>
                  <option value="prescription">Prescription</option>
                  <option value="lab result">Lab Result</option>
                  <option value="referral">Referral</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Diagnosis</label>

                <input
                  className="form-control"
                  name="diagnosis"
                  value={form.diagnosis}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Medication</label>

                <input
                  className="form-control"
                  name="medication"
                  value={form.medication}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Notes</label>

                <textarea
                  className="form-control"
                  rows="3"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                />
              </div>

              <button className="btn btn-primary" type="submit">
                {editingId ? "Update Record" : "Add Record"}
              </button>

            </form>
          </div>
        </div>

        {loading ? (
          <h4>Loading...</h4>
        ) : (
          <table className="table table-bordered table-striped">

            <thead className="table-dark">
              <tr>
                <th>Patient</th>
                <th>Type</th>
                <th>Diagnosis</th>
                <th>Medication</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {records.map((record) => (
                <tr key={record._id}>

                  <td>{record.patient?.name}</td>

                  <td>{record.type}</td>

                  <td>{record.diagnosis}</td>

                  <td>{record.medication}</td>

                  <td>{record.notes}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editRecord(record)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteRecord(record._id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>
    </>
  );
}

export default MedicalRecords;