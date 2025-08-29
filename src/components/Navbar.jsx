import { User, LogOut, Home, Info, Phone } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar({ onLogout }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      {/* Left: Logo / Brand */}
      <div className="text-xl font-bold">BhaiyaG</div>

      {/* Center: Nav Links */}
      <div className="flex-1 text-center">
        {!user ? (
          <marquee className="text-yellow-200 font-semibold">
            🎉 Welcome to BhaiyaG – Signup or Login to explore within World! 🚀
          </marquee>
        ) : (
          <div className="flex justify-center gap-6">
            <Link
              to="/dashboard"
              className="flex items-center gap-1 hover:underline"
            >
              <Home size={18} /> Home
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-1 hover:underline"
            >
              <Phone size={18} /> Contact
            </Link>
          </div>
        )}
      </div>

      {/* Right: show user + logout if logged in */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="bg-white text-blue-600 px-3 py-1 rounded-full font-semibold flex items-center gap-2">
              <User size={18} /> {user?.email}
            </span>
            <button
              onClick={onLogout}
              className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 flex items-center gap-1"
            >
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <span className="italic text-sm text-gray-200"></span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
