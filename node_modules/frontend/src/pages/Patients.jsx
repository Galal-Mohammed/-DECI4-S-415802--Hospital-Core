import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    email: "",
    status: "Good",
  });

  const fetchPatients = useCallback(async () => {
    try {
      const response = await api.get("/patients");
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const savePatient = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/patients/${editingId}`, form);
      } else {
        await api.post("/patients", form);
      }

      setForm({
        name: "",
        age: "",
        gender: "Male",
        phone: "",
        email: "",
        status: "Good",
      });

      setEditingId(null);

      fetchPatients();
    } catch (error) {
      console.error(error);
      alert("Failed to save patient");
    }
  };

  const deletePatient = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error(error);
      alert("Failed to delete patient");
    }
  };

  const editPatient = (patient) => {
    setEditingId(patient._id);

    setForm({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      status: patient.status,
    });
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Patients</h1>

        <form
          onSubmit={savePatient}
          style={{
            marginBottom: "30px",
            display: "grid",
            gap: "10px",
            maxWidth: "400px",
          }}
        >
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option>Good</option>
            <option>Stable</option>
            <option>Critical</option>
          </select>

          <button type="submit">
            {editingId ? "Update Patient" : "Add Patient"}
          </button>
        </form>

        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <table
            border="1"
            cellPadding="10"
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.email}</td>
                  <td>{patient.status}</td>

                  <td>
                    <button
                      onClick={() => editPatient(patient)}
                      style={{
                        marginRight: "10px",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deletePatient(patient._id)}
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "6px 10px",
                        cursor: "pointer",
                      }}
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

export default Patients;