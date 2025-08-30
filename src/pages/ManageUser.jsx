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
  const [blocked, setBlocked] = useState({});
  const navigate = useNavigate();
  const { theme } = useTheme();

  const adminEmails = [
    "ayush25.kandari@gmail.com",
    "sphsinghpharswan@gmail.com",
  ];

  useEffect(() => {
    fetch(`${DATABASE_URL}/users.json`)
      .then((res) => res.json())
      .then((data) => setUsers(data || {}));

    fetch(`${DATABASE_URL}/blocked.json`)
      .then((res) => res.json())
      .then((data) => setBlocked(data || {}));
  }, []);

  const deleteUser = async (key) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    await fetch(`${DATABASE_URL}/users/${key}.json`, { method: "DELETE" });
    const updated = { ...users };
    delete updated[key];
    setUsers(updated);
  };

  const blockUser = async (key, email, password) => {
    if (!window.confirm("Are you sure you want to block this user?")) return;

    await fetch(`${DATABASE_URL}/blocked/${key}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    await fetch(`${DATABASE_URL}/users/${key}.json`, { method: "DELETE" });

    const updated = { ...users };
    delete updated[key];
    setUsers(updated);

    setBlocked((prev) => ({ ...prev, [key]: { email, password } }));
  };

  const unblockUser = async (key, email, password) => {
    if (!window.confirm("Unblock this user? They will regain access.")) return;

    await fetch(`${DATABASE_URL}/users/${key}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    await fetch(`${DATABASE_URL}/blocked/${key}.json`, { method: "DELETE" });

    const updated = { ...blocked };
    delete updated[key];
    setBlocked(updated);

    setUsers((prev) => ({ ...prev, [key]: { email, password } }));
  };

  const activeUsersCount = Object.keys(users).length;
  const blockedUsersCount = Object.keys(blocked).length;
  const adminCount = Object.values(users).filter((user) =>
    adminEmails.includes(user.email)
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div
            className={`backdrop-blur-lg rounded-2xl p-6 shadow-xl border transition-all duration-300 hover:shadow-2xl ${
              theme === "dark"
                ? "bg-gray-800/60 border-gray-700/50"
                : "bg-white/70 border-white/50"
            }`}
          >
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
                  className={
                    theme === "dark" ? "text-green-400" : "text-green-600"
                  }
                />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {activeUsersCount}
                </div>
                <div
                  className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Active Users
                </div>
              </div>
            </div>
          </div>

          <div
            className={`backdrop-blur-lg rounded-2xl p-6 shadow-xl border transition-all duration-300 hover:shadow-2xl ${
              theme === "dark"
                ? "bg-gray-800/60 border-gray-700/50"
                : "bg-white/70 border-white/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  theme === "dark"
                    ? "bg-red-500/20 border border-red-500/30"
                    : "bg-red-100 border border-red-200"
                }`}
              >
                <Ban
                  size={20}
                  className={theme === "dark" ? "text-red-400" : "text-red-600"}
                />
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {blockedUsersCount}
                </div>
                <div
                  className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Blocked Users
                </div>
              </div>
            </div>
          </div>

          <div
            className={`backdrop-blur-lg rounded-2xl p-6 shadow-xl border transition-all duration-300 hover:shadow-2xl ${
              theme === "dark"
                ? "bg-gray-800/60 border-gray-700/50"
                : "bg-white/70 border-white/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  theme === "dark"
                    ? "bg-orange-500/20 border border-orange-500/30"
                    : "bg-orange-100 border border-orange-200"
                }`}
              >
                <Shield
                  size={20}
                  className={
                    theme === "dark" ? "text-orange-400" : "text-orange-600"
                  }
                />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {adminCount}
                </div>
                <div
                  className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Admins
                </div>
              </div>
            </div>
          </div>

          <div
            className={`backdrop-blur-lg rounded-2xl p-6 shadow-xl border transition-all duration-300 hover:shadow-2xl ${
              theme === "dark"
                ? "bg-gray-800/60 border-gray-700/50"
                : "bg-white/70 border-white/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  theme === "dark"
                    ? "bg-blue-500/20 border border-blue-500/30"
                    : "bg-blue-100 border border-blue-200"
                }`}
              >
                <CheckCircle
                  size={20}
                  className={
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  }
                />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {studentCount}
                </div>
                <div
                  className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Students
                </div>
              </div>
            </div>
          </div>
        </div>

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
                  className={
                    theme === "dark" ? "text-green-400" : "text-green-600"
                  }
                />
              </div>
              <h2
                className={`text-xl font-bold ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Active Users
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(users).map(([key, user]) => {
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
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              isAdmin
                                ? theme === "dark"
                                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                  : "bg-red-100 text-red-600 border border-red-200"
                                : theme === "dark"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : "bg-blue-100 text-blue-600 border border-blue-200"
                            }`}
                          >
                            {user.email.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium">{user.email}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {isAdmin ? (
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                              theme === "dark"
                                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                : "bg-red-100 text-red-700 border border-red-200"
                            }`}
                          >
                            <Shield size={14} />
                            Admin
                          </span>
                        ) : (
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                              theme === "dark"
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-green-100 text-green-700 border border-green-200"
                            }`}
                          >
                            <CheckCircle size={14} />
                            Student
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        {!isAdmin ? (
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => deleteUser(key)}
                              className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                              <Trash
                                size={14}
                                className="transition-transform group-hover:scale-110"
                              />
                              Delete
                            </button>
                            <button
                              onClick={() =>
                                blockUser(key, user.email, user.password)
                              }
                              className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                              <Ban
                                size={14}
                                className="transition-transform group-hover:scale-110"
                              />
                              Block
                            </button>
                          </div>
                        ) : (
                          <span
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-gray-500"
                                : "text-gray-400"
                            }`}
                          >
                            Protected
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className={`backdrop-blur-lg rounded-2xl shadow-xl border overflow-hidden ${
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
                    ? "bg-red-500/20 border border-red-500/30"
                    : "bg-red-100 border border-red-200"
                }`}
              >
                <AlertTriangle
                  size={20}
                  className={theme === "dark" ? "text-red-400" : "text-red-600"}
                />
              </div>
              <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
                Blocked Users
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(blocked).length === 0 ? (
                  <tr>
                    <td colSpan="2" className="p-8 text-center">
                      <div
                        className={`flex flex-col items-center gap-3 ${
                          theme === "dark" ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        <CheckCircle size={32} />
                        <span>No blocked users. All clear! 🎉</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  Object.entries(blocked).map(([key, user]) => (
                    <tr
                      key={key}
                      className={`border-b transition-colors duration-200 ${
                        theme === "dark"
                          ? "border-gray-700/50 hover:bg-gray-700/30"
                          : "border-gray-200/50 hover:bg-gray-50/50"
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              theme === "dark"
                                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                : "bg-red-100 text-red-600 border border-red-200"
                            }`}
                          >
                            {user.email.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium">{user.email}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() =>
                            unblockUser(key, user.email, user.password)
                          }
                          className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          <Undo
                            size={14}
                            className="transition-transform group-hover:scale-110"
                          />
                          Unblock
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
