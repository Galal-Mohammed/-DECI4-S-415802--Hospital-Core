import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import appointmentApi from "../services/appointmentApi";
import api from "../services/api";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    date: "",
    status: "Scheduled",
  });

  const fetchAppointments = async () => {
    try {
      const res = await appointmentApi.get("/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchPatients();
      await fetchAppointments();
      setLoading(false);
    };

    load();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveAppointment = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await appointmentApi.put(`/appointments/${editingId}`, form);
      } else {
        await appointmentApi.post("/appointments", form);
      }

      setEditingId(null);

      setForm({
        patient: "",
        doctor: "",
        date: "",
        status: "Scheduled",
      });

      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert("Failed to save appointment");
    }
  };

  const editAppointment = (appointment) => {
    setEditingId(appointment._id);

    setForm({
      patient: appointment.patient,
      doctor: appointment.doctor,
      date: appointment.date.slice(0, 16),
      status: appointment.status,
    });
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm("Delete appointment?")) return;

    try {
      await appointmentApi.delete(`/appointments/${id}`);
      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">Appointments</h2>

        <div className="card mb-4">
          <div className="card-header">
            {editingId ? "Edit Appointment" : "Add Appointment"}
          </div>

          <div className="card-body">

            <form onSubmit={saveAppointment}>

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
                <label className="form-label">Doctor</label>

                <input
                  className="form-control"
                  name="doctor"
                  value={form.doctor}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Date & Time</label>

                <input
                  type="datetime-local"
                  className="form-control"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>

                <select
                  className="form-select"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Scheduled</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>

              <button className="btn btn-primary">
                {editingId ? "Update Appointment" : "Add Appointment"}
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
                <th>Patient ID</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {appointments.map((appointment) => (
                <tr key={appointment._id}>

                  <td>{appointment.patient}</td>

                  <td>{appointment.doctor}</td>

                  <td>
                    {new Date(appointment.date).toLocaleString()}
                  </td>

                  <td>{appointment.status}</td>

                  <td>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editAppointment(appointment)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteAppointment(appointment._id)}
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

export default Appointments;