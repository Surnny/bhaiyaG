import React, { useState } from "react";
import bcrypt from "bcryptjs";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const DATABASE_URL = "https://notes-app-9540a-default-rtdb.firebaseio.com";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 🔹 First check if user is blocked
      const blockRes = await fetch(`${DATABASE_URL}/blocks.json`);
      const blockData = await blockRes.json();

      if (blockData) {
        const isBlocked = Object.values(blockData).some(
          (u) => u.email === email
        );
        if (isBlocked) {
          alert("❌ You are blocked. Contact admin at sphsinghpharswan@gmail.com.");
          return;
        }
      }

      // 🔹 Fetch users
      const res = await fetch(`${DATABASE_URL}/users.json`);
      if (!res.ok) throw new Error("Failed to fetch users");

      const users = await res.json();
      if (!users) {
        alert("⚠️ No users found. Please signup first.");
        return;
      }

      // Find user by email
      const userEntry = Object.values(users).find((u) => u.email === email);

      if (!userEntry) {
        alert("⚠️ User not found. Please signup with your credentials first.");
        return;
      }

      // Compare password
      const match = await bcrypt.compare(password, userEntry.password);
      if (!match) {
        alert("Wrong credentials");
        return;
      }

      // Save user in localStorage
      localStorage.setItem("user", JSON.stringify(userEntry));

      // Redirect to dashboard
      alert("Login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded-lg"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            className="text-blue-600 underline"
            onClick={() => (window.location.href = "/signup")}
          >
            Don’t have an account? Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
