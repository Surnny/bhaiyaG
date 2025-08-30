import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Video,
  BookOpen,
  Users,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showPopup, setShowPopup] = useState(true);
  const { theme } = useTheme();

  const isAdmin =
    user?.email === "ayush25.kandari@gmail.com" ||
    user?.email === "sphsinghpharswan@gmail.com";

  return (
    <div
      className={`min-h-screen transition-all duration-500 relative ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse ${
            theme === "dark" ? "bg-blue-500" : "bg-blue-400"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse delay-1000 ${
            theme === "dark" ? "bg-purple-500" : "bg-purple-400"
          }`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/4 w-48 h-48 rounded-full blur-3xl opacity-15 animate-pulse delay-500 ${
            theme === "dark" ? "bg-indigo-500" : "bg-indigo-300"
          }`}
        ></div>
        <div
          className={`absolute bottom-1/3 right-1/3 w-60 h-60 rounded-full blur-3xl opacity-15 animate-pulse delay-2000 ${
            theme === "dark" ? "bg-cyan-500" : "bg-cyan-300"
          }`}
        ></div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 animate-fadeIn">
          <div
            className={`backdrop-blur-lg rounded-3xl p-10 shadow-2xl border max-w-md mx-4 relative overflow-hidden transform animate-scaleIn ${
              theme === "dark"
                ? "bg-gray-800/90 border-gray-700/50"
                : "bg-white/90 border-white/50"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10"></div>

            <button
              onClick={() => setShowPopup(false)}
              className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                theme === "dark"
                  ? "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
              }`}
            >
              <X size={20} />
            </button>

            <div className="relative z-10 text-center">
              <div className="mb-6">
                <div
                  className={`inline-flex p-4 rounded-full mb-4 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600"
                  }`}
                >
                  <Sparkles size={32} className="text-white" />
                </div>
                <h2
                  className={`text-3xl font-bold mb-2 ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Ky haal bhai log 😎
                </h2>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Ready to dive into your learning journey?
                </p>
              </div>

              <button
                onClick={() => setShowPopup(false)}
                className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
              >
                <span className="flex items-center gap-2">
                  Let's Goooooooo 🚀
                  <Sparkles size={16} className="animate-pulse" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 p-6 lg:p-8">
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome back,
            </span>
          </h1>
          <p
            className={`text-lg mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {user?.email}
          </p>
          <p
            className={`${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Your learning dashboard is ready. What would you like to explore
            today?
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div
              className={`w-1 h-8 rounded-full ${
                theme === "dark"
                  ? "bg-gradient-to-b from-blue-500 to-purple-500"
                  : "bg-gradient-to-b from-blue-600 to-indigo-600"
              }`}
            ></div>
            <h2
              className={`text-2xl font-bold ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Learning Resources
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/notes"
              className={`group backdrop-blur-lg rounded-2xl p-8 shadow-xl border transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                theme === "dark"
                  ? "bg-gray-800/60 border-gray-700/50 hover:bg-gray-800/80"
                  : "bg-white/70 border-white/50 hover:bg-white/90"
              }`}
            >
              <div className="text-center">
                <div
                  className={`inline-flex p-4 rounded-2xl mb-4 transition-all duration-300 group-hover:scale-110 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30"
                      : "bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300"
                  }`}
                >
                  <FileText
                    size={32}
                    className={
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }
                  />
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Notes
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Access your study notes and materials
                </p>
              </div>
            </Link>

            <Link
              to="/videos"
              className={`group backdrop-blur-lg rounded-2xl p-8 shadow-xl border transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                theme === "dark"
                  ? "bg-gray-800/60 border-gray-700/50 hover:bg-gray-800/80"
                  : "bg-white/70 border-white/50 hover:bg-white/90"
              }`}
            >
              <div className="text-center">
                <div
                  className={`inline-flex p-4 rounded-2xl mb-4 transition-all duration-300 group-hover:scale-110 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30"
                      : "bg-gradient-to-r from-green-100 to-green-200 border border-green-300"
                  }`}
                >
                  <Video
                    size={32}
                    className={
                      theme === "dark" ? "text-green-400" : "text-green-600"
                    }
                  />
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Videos
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Watch educational videos and tutorials
                </p>
              </div>
            </Link>

            <Link
              to="/books"
              className={`group backdrop-blur-lg rounded-2xl p-8 shadow-xl border transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                theme === "dark"
                  ? "bg-gray-800/60 border-gray-700/50 hover:bg-gray-800/80"
                  : "bg-white/70 border-white/50 hover:bg-white/90"
              }`}
            >
              <div className="text-center">
                <div
                  className={`inline-flex p-4 rounded-2xl mb-4 transition-all duration-300 group-hover:scale-110 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30"
                      : "bg-gradient-to-r from-purple-100 to-purple-200 border border-purple-300"
                  }`}
                >
                  <BookOpen
                    size={32}
                    className={
                      theme === "dark" ? "text-purple-400" : "text-purple-600"
                    }
                  />
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Books
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Browse through curated book collection
                </p>
              </div>
            </Link>
          </div>
        </div>

        {isAdmin && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-red-500 to-orange-500"></div>
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
                Admin Control Panel
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Link
                to="/manage-users"
                className={`group backdrop-blur-lg rounded-2xl p-8 shadow-xl border transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                  theme === "dark"
                    ? "bg-red-900/20 border-red-800/50 hover:bg-red-900/30"
                    : "bg-red-50/70 border-red-200/50 hover:bg-red-50/90"
                }`}
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30"
                        : "bg-gradient-to-r from-red-100 to-red-200 border border-red-300"
                    }`}
                  >
                    <Users
                      size={32}
                      className={
                        theme === "dark" ? "text-red-400" : "text-red-600"
                      }
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-semibold mb-1 ${
                        theme === "dark" ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Manage Users
                    </h3>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      View and manage registered users
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                to="/about"
                className={`group backdrop-blur-lg rounded-2xl p-8 shadow-xl border transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                  theme === "dark"
                    ? "bg-orange-900/20 border-orange-800/50 hover:bg-orange-900/30"
                    : "bg-orange-50/70 border-orange-200/50 hover:bg-orange-50/90"
                }`}
              >
                <div className="flex items-center gap-6">
                  <div
                    className={`p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30"
                        : "bg-gradient-to-r from-orange-100 to-orange-200 border border-orange-300"
                    }`}
                  >
                    <Settings
                      size={32}
                      className={
                        theme === "dark" ? "text-orange-400" : "text-orange-600"
                      }
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-semibold mb-1 ${
                        theme === "dark" ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      About Website
                    </h3>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Learn about BhaiyaG platform
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
