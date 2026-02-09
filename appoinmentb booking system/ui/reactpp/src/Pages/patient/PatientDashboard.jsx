


import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/appointments");
      setAppointments(res.data.slice(0, 3)); 
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 border border-blue-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Patient Dashboard
        </h1>

        <div className="flex justify-center mb-6">
          <Link
            to="/patient/book-appointment"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-2xl shadow transition"
          >
            Book Appointment
          </Link>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          Upcoming Appointments
        </h2>

        {appointments.length === 0 ? (
          <p className="text-center text-blue-600">No upcoming appointments</p>
        ) : (
          <ul className="space-y-3">
            {appointments.map((a) => (
              <li
                key={a._id}
                className="p-4 border border-blue-200 rounded-2xl bg-blue-50 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-blue-800">{a.doctor.FullName}</p>
                  <p className="text-blue-600">{new Date(a.date).toLocaleString()}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-white font-semibold ${
                    a.status === "Pending"
                      ? "bg-yellow-500"
                      : a.status === "Confirmed"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {a.status}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/patient/my-appointments"
            className="text-blue-600 font-semibold underline"
          >
            View All Appointments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
