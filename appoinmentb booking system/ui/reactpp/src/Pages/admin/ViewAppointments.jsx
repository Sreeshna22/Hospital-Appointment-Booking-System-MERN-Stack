

import { useEffect, useState } from "react";
import axios from "../../api/axios";

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("/appointments/appointments");

      setAppointments(res.data);
    } catch (err) {
      console.error(
        "Failed to fetch appointments:",
        err.response?.data || err
      );
      if (err.response?.status === 403) {
        setError(
          "Access denied. Make sure you are logged in as an admin."
        );
      } else {
        setError("Failed to fetch appointments. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Appointments</h2>

      {loading && <p>Loading appointments...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && appointments.length === 0 && (
        <p>No appointments found.</p>
      )}

      {!loading && !error && appointments.length > 0 && (
        <table className="min-w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Patient Name</th>
              <th className="p-2 border">Doctor Name</th>
              <th className="p-2 border">Date & Time</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a._id} className="text-center border-t">
                <td className="p-2">{a.patient?.FullName || "N/A"}</td>
                <td className="p-2">{a.doctor?.FullName || "N/A"}</td>
                <td className="p-2">{new Date(a.date).toLocaleString()}</td>
                <td className="p-2">{a.status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAppointments;