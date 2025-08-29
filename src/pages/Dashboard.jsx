// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Video, BookOpen, Users, Settings } from "lucide-react";
import Navbar from "../components/Navbar";

function Dashboard() {
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const [showPopup, setShowPopup] = useState(true); // show popup initially

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // Check if logged-in user is admin
  const isAdmin =
    user?.email === "ayush25.kandari@gmail.com" ||
    user?.email === "sphsinghpharswan@gmail.com";

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* ===== Welcome Popup ===== */}
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Ky haal bhai log 😎</h2>
            <button
              onClick={() => setShowPopup(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Chalooooooooooo 🚀
            </button>
          </div>
        </div>
      )}

      {/* ===== Main Content ===== */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-blue-600">
          Welcome, {user?.email}
        </h1>
        <p className="mt-2 text-gray-700">This is your dashboard.</p>

        {/* User Features */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">User Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/notes"
              className="flex flex-col items-center bg-white p-6 shadow rounded-2xl hover:shadow-lg hover:bg-blue-50 transition"
            >
              <FileText size={40} className="text-blue-600 mb-2" />
              <h2 className="text-lg font-semibold">Notes</h2>
            </Link>

            <Link
              to="/videos"
              className="flex flex-col items-center bg-white p-6 shadow rounded-2xl hover:shadow-lg hover:bg-green-50 transition"
            >
              <Video size={40} className="text-green-600 mb-2" />
              <h2 className="text-lg font-semibold">Videos</h2>
            </Link>

            <Link
              to="/books"
              className="flex flex-col items-center bg-white p-6 shadow rounded-2xl hover:shadow-lg hover:bg-purple-50 transition"
            >
              <BookOpen size={40} className="text-purple-600 mb-2" />
              <h2 className="text-lg font-semibold">Books</h2>
            </Link>
          </div>
        </div>

        {/* Admin-only Features */}
        {isAdmin && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Admin Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                to="/admin-users"
                className="flex flex-col items-center bg-red-100 p-6 shadow rounded-2xl hover:shadow-lg hover:bg-red-200 transition"
              >
                <Users size={40} className="text-red-600 mb-2" />
                <h2 className="text-lg font-semibold">Manage Users</h2>
              </Link>

              <Link
                to="/about"
                className="flex flex-col items-center bg-red-100 p-6 shadow rounded-2xl hover:shadow-lg hover:bg-red-200 transition"
              >
                <Settings size={40} className="text-red-600 mb-2" />
                <h2 className="text-lg font-semibold">About Website</h2>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
