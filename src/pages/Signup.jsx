// src/pages/Signup.jsx
import React, { useState } from "react";
import bcrypt from "bcryptjs";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const DATABASE_URL = "https://notes-app-9540a-default-rtdb.firebaseio.com";

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // 🔹 Step 1: Check if user is blocked
      const blockRes = await fetch(`${DATABASE_URL}/blocks.json`);
      const blockData = await blockRes.json();

      if (blockData) {
        const isBlocked = Object.values(blockData).some(
          (u) => u.email === email
        );
        if (isBlocked) {
          alert("❌ You are blocked. Contact admin.");
          return;
        }
      }

      // 🔹 Step 2: Check if email is already registered
      const res = await fetch(`${DATABASE_URL}/users.json`);
      const data = await res.json();

      if (data) {
        const alreadyExists = Object.values(data).some(
          (u) => u.email === email
        );
        if (alreadyExists) {
          alert(
            "⚠️ User already registered. Please login with your credentials."
          );
          return;
        }
      }

      // 🔹 Step 3: Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // 🔹 Step 4: Find next index for new user
      const nextIndex = data ? Object.keys(data).length : 0;

      // 🔹 Step 5: Save new user to Firebase
      await fetch(`${DATABASE_URL}/users/${nextIndex}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: hashedPassword,
        }),
      });

      alert("✅ Signup successful! Please login.");
      window.location.href = "/login";
    } catch (err) {
      console.error("Signup error:", err);
      alert("Error signing up. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
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
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Signup
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            className="text-blue-600 underline"
            onClick={() => (window.location.href = "/login")}
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
