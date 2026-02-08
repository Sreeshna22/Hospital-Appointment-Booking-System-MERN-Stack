

import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("/doctors/my-appointments");
        setAppointments(res.data.appointments);
      } catch (err) {
        console.error("Failed to load appointments", err);
      }
    };
    fetchAppointments();
  }, []);

  const today = new Date().toDateString();
  const todaysAppointments = appointments.filter(
    (a) => new Date(a.date).toDateString() === today
  );

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          Doctor Dashboard
        </h2>

        <div className="flex flex-col md:flex-row gap-6 justify-around mb-6">
          <div className="bg-blue-100 text-blue-800 p-6 rounded-2xl shadow text-center flex-1">
            <p className="text-lg font-semibold">Today's Appointments</p>
            <p className="text-4xl font-bold mt-2">{todaysAppointments.length}</p>
          </div>

          <div className="bg-blue-100 text-blue-800 p-6 rounded-2xl shadow text-center flex-1">
            <p className="text-lg font-semibold">Total Appointments</p>
            <p className="text-4xl font-bold mt-2">{appointments.length}</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/doctor/my-appointments"
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl font-semibold"
          >
            View All Appointments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
