import { User, LogOut, Home, Phone, Sun, Moon, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar({ onLogout }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`relative backdrop-blur-lg border-b transition-all duration-500 ${
        theme === "dark"
          ? "bg-gray-900/95 border-gray-800/50 text-gray-100"
          : "bg-white/95 border-gray-200/50 text-gray-900"
      }`}
    >
      {/* Gradient overlay for depth */}
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90"
            : "bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5"
        }`}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
              BhaiyaG
            </div>
          </div>

          {/* Center: Nav Links or Welcome Message */}
          <div className="flex-1 flex justify-center px-4">
            {!user ? (
              <div
                className={`overflow-hidden rounded-full px-6 py-2 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30"
                    : "bg-gradient-to-r from-yellow-200/50 to-orange-200/50 border border-yellow-300/50"
                }`}
              >
                <marquee
                  className={`font-semibold text-sm ${
                    theme === "dark" ? "text-yellow-300" : "text-orange-700"
                  }`}
                >
                  🎉 Welcome to BhaiyaG – Signup or Login to explore within
                  World! 🚀
                </marquee>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-1">
                <Link
                  to="/dashboard"
                  className={`group flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                    theme === "dark"
                      ? "hover:bg-gray-800/70 text-gray-300 hover:text-white"
                      : "hover:bg-blue-50 text-gray-600 hover:text-blue-600"
                  }`}
                >
                  <Home
                    size={18}
                    className="transition-transform group-hover:scale-110"
                  />
                  <span>Home</span>
                </Link>
                <Link
                  to="/about"
                  className={`group flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                    theme === "dark"
                      ? "hover:bg-gray-800/70 text-gray-300 hover:text-white"
                      : "hover:bg-blue-50 text-gray-600 hover:text-blue-600"
                  }`}
                >
                  <Info
                    size={18}
                    className="transition-transform group-hover:scale-110"
                  />
                  <span>About</span>
                </Link>
                <Link
                  to="/contact"
                  className={`group flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                    theme === "dark"
                      ? "hover:bg-gray-800/70 text-gray-300 hover:text-white"
                      : "hover:bg-blue-50 text-gray-600 hover:text-blue-600"
                  }`}
                >
                  <Phone
                    size={18}
                    className="transition-transform group-hover:scale-110"
                  />
                  <span>Contact</span>
                </Link>
              </div>
            )}
          </div>

          {/* Right: Theme toggle + User */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`group relative p-3 rounded-full shadow-lg backdrop-blur-sm border transition-all duration-300 hover:scale-110 hover:shadow-xl ${
                theme === "dark"
                  ? "bg-gray-800/80 border-gray-700 hover:bg-gray-700/90"
                  : "bg-white/80 border-gray-200 hover:bg-white"
              }`}
            >
              <div className="relative z-10">
                {theme === "dark" ? (
                  <Sun
                    size={20}
                    className="text-yellow-400 transition-transform group-hover:rotate-45"
                  />
                ) : (
                  <Moon
                    size={20}
                    className="text-indigo-600 transition-transform group-hover:-rotate-12"
                  />
                )}
              </div>
              {/* Glow effect */}
              <div
                className={`absolute inset-0 rounded-full blur-md opacity-30 transition-opacity group-hover:opacity-50 ${
                  theme === "dark" ? "bg-yellow-400" : "bg-indigo-600"
                }`}
              ></div>
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                {/* User Info */}
                <div
                  className={`group flex items-center gap-3 px-4 py-2 rounded-xl shadow-lg backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                    theme === "dark"
                      ? "bg-gray-800/80 border-gray-700 hover:bg-gray-700/90"
                      : "bg-white/80 border-gray-200 hover:bg-white"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-blue-500 to-purple-500"
                        : "bg-gradient-to-r from-blue-500 to-indigo-500"
                    }`}
                  >
                    <User size={16} className="text-white" />
                  </div>
                  <span
                    className={`font-medium text-sm hidden sm:block ${
                      theme === "dark" ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    {user?.email}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={onLogout}
                  className="group flex items-center gap-2 px-4 py-2 rounded-xl font-medium shadow-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <LogOut
                    size={18}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* Mobile Navigation (when user is logged in) */}
        {user && (
          <div className="md:hidden border-t border-gray-200/20 pt-2 pb-2">
            <div className="flex justify-center space-x-1">
              <Link
                to="/dashboard"
                className={`group flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  theme === "dark"
                    ? "hover:bg-gray-800/70 text-gray-300 hover:text-white"
                    : "hover:bg-blue-50 text-gray-600 hover:text-blue-600"
                }`}
              >
                <Home
                  size={16}
                  className="transition-transform group-hover:scale-110"
                />
                <span className="text-sm">Home</span>
              </Link>
              <Link
                to="/about"
                className={`group flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  theme === "dark"
                    ? "hover:bg-gray-800/70 text-gray-300 hover:text-white"
                    : "hover:bg-blue-50 text-gray-600 hover:text-blue-600"
                }`}
              >
                <Info
                  size={16}
                  className="transition-transform group-hover:scale-110"
                />
                <span className="text-sm">About</span>
              </Link>
              <Link
                to="/contact"
                className={`group flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  theme === "dark"
                    ? "hover:bg-gray-800/70 text-gray-300 hover:text-white"
                    : "hover:bg-blue-50 text-gray-600 hover:text-blue-600"
                }`}
              >
                <Phone
                  size={16}
                  className="transition-transform group-hover:scale-110"
                />
                <span className="text-sm">Contact</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
