

import { useEffect, useState } from "react";
import axios from "../../api/axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("/appointments");
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load appointments.");
      }
    };
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    try {
      await axios.delete(`/appointments/cancel/${id}`);
      setAppointments(prev => prev.filter(a => a._id !== id));
      alert("Appointment cancelled.");
    } catch (err) {
      console.error(err);
      alert("Failed to cancel appointment.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-3xl p-6 border border-blue-200">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          My Appointments
        </h2>

        {appointments.length === 0 ? (
          <p className="text-center text-blue-600 font-medium">
            No appointments found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-blue-200 rounded-lg">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th className="p-3 border">Doctor</th>
                  <th className="p-3 border">Date & Time</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(a => (
                  <tr key={a._id} className="text-center border-t hover:bg-blue-50 transition">
                    <td className="p-3">{a.doctor.FullName}</td>
                    <td className="p-3">{new Date(a.date).toLocaleString()}</td>
                    <td className={`p-3 font-semibold ${a.status === "Pending" ? "text-orange-600" : a.status === "Cancelled" ? "text-red-600" : "text-green-600"}`}>
                      {a.status}
                    </td>
                    <td className="p-3">
                      {a.status === "Pending" && (
                        <button
                          onClick={() => handleCancel(a._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;


