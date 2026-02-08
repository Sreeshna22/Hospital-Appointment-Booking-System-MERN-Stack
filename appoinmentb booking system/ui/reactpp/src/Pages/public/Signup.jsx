// src/Pages/public/Signup.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axios";

// const Signup = () => {
//   const [form, setForm] = useState({
//     FullName: "",
//     UserName: "",
//     Password: "",
//     Role: "patient", // default role
//   });

//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/auth/signup", form);
//       alert("Signup successful! Please login.");
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       alert("Signup failed. Try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSignup} className="p-4 flex flex-col gap-2">
//       <h2 className="text-2xl font-bold mb-4">Signup</h2>

//       <input
//         placeholder="Full Name"
//         value={form.FullName}
//         onChange={(e) => setForm({ ...form, FullName: e.target.value })}
//         className="border p-2 rounded"
//         required
//       />
//       <input
//         placeholder="Username"
//         value={form.UserName}
//         onChange={(e) => setForm({ ...form, UserName: e.target.value })}
//         className="border p-2 rounded"
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={form.Password}
//         onChange={(e) => setForm({ ...form, Password: e.target.value })}
//         className="border p-2 rounded"
//         required
//       />

//       <select
//         value={form.Role}
//         onChange={(e) => setForm({ ...form, Role: e.target.value })}
//         className="border p-2 rounded"
//       >
//         <option value="patient">Patient</option>
//         <option value="doctor">Doctor</option>
//         <option value="admin">Admin</option>
//       </select>

//       <button type="submit" className="bg-green-600 text-white p-2 rounded">
//         Signup
//       </button>
//     </form>
//   );
// };

// export default Signup;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Signup = () => {
  const [form, setForm] = useState({
    FullName: "",
    UserName: "",
    Password: "",
    Role: "patient",
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", form);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col gap-4 border border-blue-100"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
          Signup
        </h2>

        <input
          placeholder="Full Name"
          value={form.FullName}
          onChange={(e) => setForm({ ...form, FullName: e.target.value })}
          className="border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-2 rounded-lg outline-none"
          required
        />

        <input
          placeholder="Username"
          value={form.UserName}
          onChange={(e) => setForm({ ...form, UserName: e.target.value })}
          className="border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-2 rounded-lg outline-none"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.Password}
          onChange={(e) => setForm({ ...form, Password: e.target.value })}
          className="border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-2 rounded-lg outline-none"
          required
        />

        <select
          value={form.Role}
          onChange={(e) => setForm({ ...form, Role: e.target.value })}
          className="border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-2 rounded-lg outline-none"
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition text-white p-2 rounded-lg font-semibold"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
