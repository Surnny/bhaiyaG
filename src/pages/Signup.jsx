import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { Lock, Mail, Eye, EyeOff, Shield } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${DATABASE_URL}/users.json`);
      const users = (await res.json()) || {};

      const existingUser = Object.values(users).find(
        (u) => u?.email?.trim().toLowerCase() === email.trim().toLowerCase()
      );

      if (existingUser) {
        if (existingUser.block) {
          alert("❌ You are blocked.");
          return;
        }
        alert("⚠️ Email already registered.");
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        email,
        password: hashedPassword,
        block: false,
        googleAuth: false,
        role: "user",
        name: "",
        phone: "",
        dob: "",
        place: "",
        photo: "",
      };

      await fetch(`${DATABASE_URL}/users.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      localStorage.setItem("user", JSON.stringify(newUser));
      alert("Signup successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup failed");
    }
  };

const handleGoogleSignup = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const res = await fetch(`${DATABASE_URL}/users.json`);
    const users = (await res.json()) || {};

    const existingUser = Object.values(users).find(
      (u) => u?.email?.trim().toLowerCase() === user.email.toLowerCase()
    );

    let userData;

    if (existingUser) {
      userData = existingUser;
    } else {
      userData = {
        email: user.email,
        name: user.displayName || "",
        photo: user.photoURL || "",
        googleAuth: true,
        block: false,
        role: "user",
        phone: "",
        dob: "",
        place: "",
      };

      await fetch(`${DATABASE_URL}/users.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
    }

    localStorage.setItem("user", JSON.stringify(userData));
    alert("Google signup successful!");
    navigate("/dashboard");
  } catch (error) {
    console.error("Google Auth Error:", error);
    alert(error.message);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl mb-4">
              <Shield className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="text-gray-600 dark:text-slate-400">
              Signup to access dashboard
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-slate-600 py-3 rounded-2xl font-semibold bg-white dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition mb-4"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-6 h-6"
            />
            Sign up with Google
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300 dark:border-slate-600"></div>
            <span className="px-3 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300 dark:border-slate-600"></div>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 py-3 border rounded-xl dark:bg-slate-700"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 border rounded-xl dark:bg-slate-700"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
