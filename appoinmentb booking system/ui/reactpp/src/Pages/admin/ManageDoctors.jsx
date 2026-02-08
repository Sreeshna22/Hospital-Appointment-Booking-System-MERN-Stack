import { useEffect, useState } from "react";
import axios from "../../api/axios";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [FullName, setFullName] = useState("");
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("/admin/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchDoctors(); }, []);

  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // EDIT: (Optional: backend should support update doctor)
        alert("Edit feature requires backend endpoint");
      } else {
        await axios.post("/admin/add-doctor", { FullName, UserName, Password });
        setFullName(""); setUserName(""); setPassword("");
        fetchDoctors();
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  const handleDelete = async (id) => {
    try {
      // Optional: backend DELETE endpoint needed
      await axios.delete(`/admin/delete-doctor/${id}`);
      fetchDoctors();
    } catch (err) {
      alert(err.response?.data?.msg || "Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Doctors</h2>

      <form onSubmit={handleAddOrEdit} className="mb-6 space-y-2">
        <input type="text" value={FullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name" className="border p-2 w-full" required />
        <input type="text" value={UserName} onChange={e => setUserName(e.target.value)} placeholder="Username" className="border p-2 w-full" required />
        <input type="password" value={Password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          {editingId ? "Update Doctor" : "Add Doctor"}
        </button>
      </form>

      <table className="min-w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Full Name</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(d => (
            <tr key={d._id} className="text-center border-t">
              <td className="p-2">{d.FullName}</td>
              <td className="p-2">{d.UserName}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => { setEditingId(d._id); setFullName(d.FullName); setUserName(d.UserName); }} className="bg-yellow-500 px-2 py-1 text-white">Edit</button>
                <button onClick={() => handleDelete(d._id)} className="bg-red-600 px-2 py-1 text-white">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDoctors;

