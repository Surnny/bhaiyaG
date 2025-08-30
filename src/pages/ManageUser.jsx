import React, { useEffect, useState } from "react";
import {
  Trash,
  Ban,
  Undo,
  ArrowLeft,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function ManageUsers() {
  const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;
  const [users, setUsers] = useState({});
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Add your admin emails here
  const adminEmails = [
    "ayush25.kandari@gmail.com",
    "sphsinghpharswan@gmail.com",
  ];

  useEffect(() => {
    fetch(`${DATABASE_URL}/users.json`)
      .then((res) => res.json())
      .then((data) => setUsers(data || {}));
  }, []);

  // Delete user completely
  const deleteUser = async (key) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    await fetch(`${DATABASE_URL}/users/${key}.json`, { method: "DELETE" });
    const updated = { ...users };
    delete updated[key];
    setUsers(updated);
  };

  // Block user by setting block: true
  const blockUser = async (key, user) => {
    if (!window.confirm("Are you sure you want to block this user?")) return;

    // Protect admins
    if (adminEmails.includes(user.email)) {
      alert("❌ You cannot block an admin!");
      return;
    }

    const updatedUser = { ...user, block: true };

    await fetch(`${DATABASE_URL}/users/${key}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    setUsers((prev) => ({ ...prev, [key]: updatedUser }));
  };

  // Unblock user by setting block: false
  const unblockUser = async (key, user) => {
    if (!window.confirm("Unblock this user? They will regain access.")) return;

    const updatedUser = { ...user, block: false };

    await fetch(`${DATABASE_URL}/users/${key}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    setUsers((prev) => ({ ...prev, [key]: updatedUser }));
  };

  // Counts
  const activeUsers = Object.values(users).filter((u) => u && !u.block);
  const blockedUsers = Object.values(users).filter((u) => u && u.block);
  const activeUsersCount = activeUsers.length;
  const blockedUsersCount = blockedUsers.length;
  const adminCount = activeUsers.filter((u) =>
    adminEmails.includes(u.email)
  ).length;
  const studentCount = activeUsersCount - adminCount;

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900"
      }`}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl opacity-20 ${
            theme === "dark" ? "bg-red-500" : "bg-red-400"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 right-10 w-40 h-40 rounded-full blur-3xl opacity-20 ${
            theme === "dark" ? "bg-blue-500" : "bg-blue-400"
          }`}
        ></div>
        <div
          className={`absolute top-1/2 right-1/4 w-24 h-24 rounded-full blur-3xl opacity-15 ${
            theme === "dark" ? "bg-purple-500" : "bg-purple-300"
          }`}
        ></div>
      </div>

      <div className="relative z-10 p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/dashboard")}
              className={`group flex items-center gap-3 px-6 py-3 rounded-xl font-medium shadow-lg backdrop-blur-sm border transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                theme === "dark"
                  ? "bg-gray-800/70 border-gray-700 text-white hover:bg-gray-700/80 hover:border-gray-600"
                  : "bg-white/80 border-gray-200 text-gray-700 hover:bg-white hover:border-gray-300"
              }`}
            >
              <ArrowLeft
                size={20}
                className="transition-transform group-hover:-translate-x-1"
              />
              Back to Dashboard
            </button>

            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-red-500 to-orange-500"
                    : "bg-gradient-to-r from-red-600 to-orange-600"
                }`}
              >
                <Shield size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  Manage Users
                </h1>
                <p
                  className={`text-sm mt-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Admin control panel for user management
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={
              <Users
                size={20}
                className={
                  theme === "dark" ? "text-green-400" : "text-green-600"
                }
              />
            }
            count={activeUsersCount}
            label="Active Users"
            theme={theme}
            bgColor={theme === "dark" ? "bg-green-500/20" : "bg-green-100"}
          />
          <StatCard
            icon={
              <Ban
                size={20}
                className={theme === "dark" ? "text-red-400" : "text-red-600"}
              />
            }
            count={blockedUsersCount}
            label="Blocked Users"
            theme={theme}
            bgColor={theme === "dark" ? "bg-red-500/20" : "bg-red-100"}
          />
          <StatCard
            icon={
              <Shield
                size={20}
                className={
                  theme === "dark" ? "text-orange-400" : "text-orange-600"
                }
              />
            }
            count={adminCount}
            label="Admins"
            theme={theme}
            bgColor={theme === "dark" ? "bg-orange-500/20" : "bg-orange-100"}
          />
          <StatCard
            icon={
              <CheckCircle
                size={20}
                className={theme === "dark" ? "text-blue-400" : "text-blue-600"}
              />
            }
            count={studentCount}
            label="Students"
            theme={theme}
            bgColor={theme === "dark" ? "bg-blue-500/20" : "bg-blue-100"}
          />
        </div>

        {/* Users Table */}
        <UserTable
          users={users}
          adminEmails={adminEmails}
          deleteUser={deleteUser}
          blockUser={blockUser}
          unblockUser={unblockUser}
          theme={theme}
        />
      </div>
    </div>
  );
}

export default ManageUsers;

/* ----------------- Reusable components ----------------- */

const StatCard = ({ icon, count, label, theme, bgColor }) => (
  <div
    className={`backdrop-blur-lg rounded-2xl p-6 shadow-xl border transition-all duration-300 hover:shadow-2xl ${
      theme === "dark"
        ? "bg-gray-800/60 border-gray-700/50"
        : "bg-white/70 border-white/50"
    }`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`p-2 rounded-lg ${bgColor} border ${
          theme === "dark" ? "border-green-500/30" : "border-green-200"
        }`}
      >
        {icon}
      </div>
      <div>
        <div className={`text-2xl font-bold text-gray-800 dark:text-gray-200`}>
          {count}
        </div>
        <div
          className={`text-xs ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {label}
        </div>
      </div>
    </div>
  </div>
);

const UserTable = ({
  users,
  adminEmails,
  deleteUser,
  blockUser,
  unblockUser,
  theme,
}) => {
  const entries = Object.entries(users).filter(([k, u]) => u);
  return (
    <div
      className={`backdrop-blur-lg rounded-2xl shadow-xl border mb-8 overflow-hidden ${
        theme === "dark"
          ? "bg-gray-800/60 border-gray-700/50"
          : "bg-white/70 border-white/50"
      }`}
    >
      <div className="p-6 border-b border-gray-200/20">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              theme === "dark"
                ? "bg-green-500/20 border border-green-500/30"
                : "bg-green-100 border border-green-200"
            }`}
          >
            <Users
              size={20}
              className={theme === "dark" ? "text-green-400" : "text-green-600"}
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Users
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead
            className={`${
              theme === "dark" ? "bg-gray-700/50" : "bg-gray-100/50"
            }`}
          >
            <tr>
              <th
                className={`p-4 text-left font-semibold ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email
              </th>
              <th
                className={`p-4 text-left font-semibold ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Role
              </th>
              <th
                className={`p-4 text-left font-semibold ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Status
              </th>
              <th
                className={`p-4 text-left font-semibold ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([key, user]) => {
              const isAdmin = adminEmails.includes(user.email);
              return (
                <tr
                  key={key}
                  className={`border-b transition-colors duration-200 ${
                    theme === "dark"
                      ? "border-gray-700/50 hover:bg-gray-700/30"
                      : "border-gray-200/50 hover:bg-gray-50/50"
                  }`}
                >
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{isAdmin ? "Admin" : "Student"}</td>
                  <td className="p-4">{user.block ? "Blocked" : "Active"}</td>
                  <td className="p-4 flex gap-2">
                    {!isAdmin && !user.block && (
                      <button
                        onClick={() => blockUser(key, user)}
                        className="bg-orange-500 text-white px-3 py-1 rounded-lg"
                      >
                        Block
                      </button>
                    )}
                    {!isAdmin && user.block && (
                      <button
                        onClick={() => unblockUser(key, user)}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg"
                      >
                        Unblock
                      </button>
                    )}
                    <button
                      onClick={() => deleteUser(key)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
