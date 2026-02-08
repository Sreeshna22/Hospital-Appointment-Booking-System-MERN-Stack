

// import { Link } from "react-router-dom";

// const AdminDashboard = () => {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

//       <div className="flex gap-4">
//         <Link
//           to="/admin/manage-doctors"
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           Manage Doctors
//         </Link>

//         <Link
//           to="/admin/view-appointments"
//           className="px-4 py-2 bg-green-600 text-white rounded"
//         >
//           View Appointments
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-blue-50 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 border border-blue-200">
        <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/manage-doctors"
            className="flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-2xl shadow transition font-semibold text-lg"
          >
            Manage Doctors
          </Link>

          <Link
            to="/admin/view-appointments"
            className="flex flex-col items-center justify-center bg-blue-400 hover:bg-blue-500 text-white p-6 rounded-2xl shadow transition font-semibold text-lg"
          >
            View Appointments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

