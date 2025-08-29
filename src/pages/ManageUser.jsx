// src/pages/ManageUsers.jsx
import React, { useEffect, useState } from "react";
import { Trash, Ban, Undo, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ManageUsers() {
  const DATABASE_URL = "https://notes-app-9540a-default-rtdb.firebaseio.com";
  const [users, setUsers] = useState({});
  const [blocked, setBlocked] = useState({});
  const navigate = useNavigate();

  const adminEmails = [
    "ayush25.kandari@gmail.com",
    "sphsinghpharswan@gmail.com",
  ];

  // Fetch users & blocked users
  useEffect(() => {
    fetch(`${DATABASE_URL}/users.json`)
      .then((res) => res.json())
      .then((data) => setUsers(data || {}));

    fetch(`${DATABASE_URL}/blocked.json`)
      .then((res) => res.json())
      .then((data) => setBlocked(data || {}));
  }, []);

  // Delete User
  const deleteUser = async (key) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    await fetch(`${DATABASE_URL}/users/${key}.json`, { method: "DELETE" });
    const updated = { ...users };
    delete updated[key];
    setUsers(updated);
  };

  // Block User
  const blockUser = async (key, email, password) => {
    if (!window.confirm("Are you sure you want to block this user?")) return;

    // Add to /blocked
    await fetch(`${DATABASE_URL}/blocked/${key}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Remove from /users
    await fetch(`${DATABASE_URL}/users/${key}.json`, { method: "DELETE" });

    const updated = { ...users };
    delete updated[key];
    setUsers(updated);

    setBlocked((prev) => ({ ...prev, [key]: { email, password } }));
  };

  // Unblock User
  const unblockUser = async (key, email, password) => {
    if (!window.confirm("Unblock this user? They will regain access.")) return;

    // Add back to /users
    await fetch(`${DATABASE_URL}/users/${key}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Remove from /blocked
    await fetch(`${DATABASE_URL}/blocked/${key}.json`, { method: "DELETE" });

    const updated = { ...blocked };
    delete updated[key];
    setBlocked(updated);

    setUsers((prev) => ({ ...prev, [key]: { email, password } }));
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 mb-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <h1 className="text-3xl font-bold mb-6 text-blue-600">Manage Users</h1>

      {/* Active Users Table */}
      <div className="bg-white shadow rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Active Users</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(users).map(([key, user]) => {
              const isAdmin = adminEmails.includes(user.email);

              return (
                <tr key={key} className="border hover:bg-gray-50">
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">
                    {isAdmin ? (
                      <span className="text-red-600 font-semibold">Admin</span>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        Student
                      </span>
                    )}
                  </td>
                  <td className="p-3 border">
                    {!isAdmin && (
                      <div className="flex gap-3">
                        {/* Delete Button */}
                        <button
                          onClick={() => deleteUser(key)}
                          className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          <Trash size={16} /> Delete
                        </button>

                        {/* Block Button */}
                        <button
                          onClick={() =>
                            blockUser(key, user.email, user.password)
                          }
                          className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                        >
                          <Ban size={16} /> Block
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Blocked Users Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Blocked Users
        </h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(blocked).map(([key, user]) => (
              <tr key={key} className="border hover:bg-gray-50">
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">
                  <button
                    onClick={() => unblockUser(key, user.email, user.password)}
                    className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <Undo size={16} /> Unblock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsers;
