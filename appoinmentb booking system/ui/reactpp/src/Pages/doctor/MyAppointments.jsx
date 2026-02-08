import { useEffect, useState } from "react";
import axios from "../../api/axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await axios.get("/doctors/my-appointments");
      setAppointments(res.data.appointments);
    };
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`/doctors/update-appointment/${id}`, { status });
      setAppointments(prev => prev.map(a => a._id === id ? { ...a, status } : a));
    } catch (err) {
      alert(err.response?.data?.msg || "Update failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
      <table className="min-w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Patient</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(a => (
            <tr key={a._id} className="text-center border-t">
              <td className="p-2">{a.patient?.FullName}</td>
              <td className="p-2">{new Date(a.date).toLocaleString()}</td>
              <td className="p-2">{a.status}</td>
              <td className="p-2 space-x-2">
                {["Pending","Accepted"].map(s => (
                  <button key={s} onClick={() => updateStatus(a._id, s)} className="bg-green-500 px-2 py-1 text-white">{s}</button>
                ))}
                <button onClick={() => updateStatus(a._id,"Cancelled")} className="bg-red-600 px-2 py-1 text-white">Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAppointments;