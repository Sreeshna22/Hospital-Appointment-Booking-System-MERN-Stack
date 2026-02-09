


import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow">
      
      <Link to="/" className="font-bold text-xl">
        Hospital App
      </Link>

      
      <div className="flex items-center space-x-4">
        {!user && (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
          </>
        )}

        {user?.role === "patient" && (
          <>
            <Link to="/patient/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/patient/my-appointments" className="hover:underline">My Appointments</Link>
          </>
        )}

        {user?.role === "doctor" && (
          <>
            <Link to="/doctor/dashboard" className="hover:underline">Dashboard</Link>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/admin/manage-doctors" className="hover:underline">Manage Doctors</Link>
            <Link to="/admin/view-appointments" className="hover:underline">All Appointments</Link>
          </>
        )}

        
        {user && (
          <div className="flex items-center space-x-3 bg-blue-700 px-3 py-2 rounded-lg">
            <span className="font-semibold text-white">Welcome, {user.userName}!</span>
            <button
              onClick={logout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

