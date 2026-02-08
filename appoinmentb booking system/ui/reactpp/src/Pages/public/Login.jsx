


// import { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";

// const Login = () => {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const { login, logout, user } = useContext(AuthContext); // include logout & user

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await login({ userName, password });
//       // role based redirect
//       if (res.user.role === "admin") navigate("/admin/dashboard");
//       else if (res.user.role === "doctor") navigate("/doctor/dashboard");
//       else navigate("/patient/dashboard");
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.msg || "Login failed");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       alert("Logout failed");
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       {!user ? (
//         <form onSubmit={handleLogin} className="flex flex-col gap-2">
//           <h2 className="text-2xl font-bold mb-4">Login</h2>

//           <input
//             type="text"
//             placeholder="Username"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border p-2 rounded"
//             required
//           />

//           <button type="submit" className="bg-blue-600 text-white p-2 rounded">
//             Login
//           </button>

//           <p className="mt-3 text-center">
//             Don't have an account?{" "}
//             <Link to="/signup" className="text-blue-600 font-semibold">
//               Sign up
//             </Link>
//           </p>
//         </form>
//       ) : (
//         <div className="text-center">
//           <h2 className="text-xl font-bold mb-4">Welcome, {user.userName}!</h2>
//           <button
//             onClick={handleLogout}
//             className="bg-red-600 text-white p-2 rounded"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;

import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, logout, user } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ userName, password });
      if (res.user.role === "admin") navigate("/admin/dashboard");
      else if (res.user.role === "doctor") navigate("/doctor/dashboard");
      else navigate("/patient/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-blue-100">
        {!user ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-center text-blue-700">
              Login
            </h2>

            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border border-blue-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-lg outline-none"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-blue-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-lg outline-none"
              required
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold p-3 rounded-lg shadow"
            >
              Login
            </button>

            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 font-semibold">
                Sign up
              </Link>
            </p>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              Welcome, {user.userName}!
            </h2>
            <button
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
