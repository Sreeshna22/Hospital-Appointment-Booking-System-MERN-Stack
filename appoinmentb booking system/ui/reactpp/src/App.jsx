

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar"; 

// Public Pages
import Login from "./Pages/public/Login.jsx";
import Signup from "./Pages/public/Signup.jsx";
import NotFound from "./Pages/public/NotFound.jsx";

// Admin Pages
import AdminDashboard from "./Pages/admin/AdminDashboard.jsx";
import ManageDoctors from "./Pages/admin/ManageDoctors.jsx";
import ViewAppointments from "./Pages/admin/ViewAppointments.jsx";

// Doctor Pages
import DoctorDashboard from "./Pages/doctor/DoctorDashboard.jsx";
import MyAppointmentsDoctor from "./Pages/doctor/MyAppointments.jsx";

// Patient Pages
import PatientDashboard from "./Pages/patient/PatientDashboard.jsx";
import BookAppointment from "./Pages/patient/BookAppointment.jsx";
import MyAppointmentsPatient from "./Pages/patient/MyAppointments.jsx";

// Protected Route Component
const ProtectedRoute = ({ roles, children }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> 
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />

         
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-doctors"
            element={
              <ProtectedRoute roles={["admin"]}>
                <ManageDoctors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/view-appointments"
            element={
              <ProtectedRoute roles={["admin"]}>
                <ViewAppointments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/dashboard"
            element={
              <ProtectedRoute roles={["doctor"]}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/my-appointments"
            element={
              <ProtectedRoute roles={["doctor"]}>
                <MyAppointmentsDoctor />
              </ProtectedRoute>
            }
          />

         
          <Route
            path="/patient/dashboard"
            element={
              <ProtectedRoute roles={["patient"]}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/book-appointment"
            element={
              <ProtectedRoute roles={["patient"]}>
                <BookAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/my-appointments"
            element={
              <ProtectedRoute roles={["patient"]}>
                <MyAppointmentsPatient />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
