import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard");
        setStats(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="container mt-5">
          <div className="text-center">
            <div className="spinner-border text-primary"></div>
            <h4 className="mt-3">Loading Dashboard...</h4>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4 fw-bold">
          🏥 Healthcare Dashboard
        </h2>

        <div className="row">

          <div className="col-md-4 mb-3">
            <div className="card text-bg-primary shadow">
              <div className="card-body text-center">
                <h5>Total Patients</h5>
                <h1>{stats.totalPatients}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card text-bg-success shadow">
              <div className="card-body text-center">
                <h5>Medical Records</h5>
                <h1>{stats.totalMedicalRecords}</h1>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card text-bg-warning shadow">
              <div className="card-body text-center">
                <h5>Appointments</h5>
                <h1>{stats.totalAppointments}</h1>
              </div>
            </div>
          </div>

        </div>

        <div className="card shadow mt-4">

          <div className="card-header bg-dark text-white">
            Upcoming Appointments
          </div>

          <div className="card-body">

            {stats.appointments.length === 0 ? (

              <div className="alert alert-info">
                No appointments found.
              </div>

            ) : (

              <table className="table table-hover table-striped">

                <thead className="table-dark">
                  <tr>
                    <th>Doctor</th>
                    <th>Patient ID</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {stats.appointments.map((appointment) => (

                    <tr key={appointment._id}>

                      <td>{appointment.doctor}</td>

                      <td>{appointment.patient}</td>

                      <td>
                        {new Date(appointment.date).toLocaleString()}
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            appointment.status === "Scheduled"
                              ? "bg-primary"
                              : appointment.status === "Completed"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;