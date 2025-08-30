import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { Lock, Mail, User, Eye, EyeOff, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";



function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
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

      const hashedPassword = await bcrypt.hash(password, 10);

      const nextIndex = data ? Object.keys(data).length : 0;

      await fetch(`${DATABASE_URL}/users/${nextIndex}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: hashedPassword,
        }),
      });

      alert("✅ Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Error signing up. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 transition-all duration-500">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400/10 dark:bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400/10 dark:bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500 rounded-2xl shadow-xl mb-4">
              <UserPlus className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-green-800 dark:from-slate-100 dark:to-green-300 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-600 dark:text-slate-400 mt-2 font-medium">
              Join us and start learning
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 dark:text-slate-500 group-focus-within:text-green-500 dark:group-focus-within:text-green-400 transition-colors" />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 transition-all duration-300 text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 dark:text-slate-500 group-focus-within:text-green-500 dark:group-focus-within:text-green-400 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-gray-50/50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 transition-all duration-300 text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl hover:from-green-700 hover:to-emerald-700 dark:hover:from-green-600 dark:hover:to-emerald-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-slate-400 mb-2">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
