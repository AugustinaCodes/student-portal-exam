import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          
          <div className="flex-shrink-0">
            <Link to="/" className="text-lg font-bold text-gray-900 tracking-tight">
              StudentPortal
            </Link>
          </div>

          <div className="flex items-center space-x-6 text-sm font-medium">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900 transition focus:outline-none"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="rounded bg-gray-900 px-3 py-1.5 text-white hover:bg-gray-800 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
