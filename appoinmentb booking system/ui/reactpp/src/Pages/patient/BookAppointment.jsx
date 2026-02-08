





import { useEffect, useState } from "react";
import axios from "../../api/axios";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get("/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.error("Failed to load doctors", err.response?.data || err);
        setError("Failed to load doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctorId || !date) return;

    try {
      await axios.post("/appointments/book", { doctorId, date });
      alert("Appointment booked successfully!");
      setDoctorId("");
      setDate("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Booking failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md border border-blue-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Book Appointment
        </h2>

        {loading && <p className="text-center text-blue-600">Loading doctors...</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {!loading && !error && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              required
              className="border border-blue-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Doctor</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.FullName} ({d.Specialization})
                </option>
              ))}
            </select>

            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="border border-blue-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded w-full font-semibold"
            >
              Book Appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
