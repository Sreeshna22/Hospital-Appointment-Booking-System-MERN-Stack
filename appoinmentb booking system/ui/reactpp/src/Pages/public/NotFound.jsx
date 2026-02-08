
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
      <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded">
        Go to Login
      </Link>
    </div>
  );
};

export default NotFound;