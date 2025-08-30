import React, { useState } from "react";
import { ArrowLeft, Mail, Phone, MessageSquare, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Contact() {
  const navigate = useNavigate();
  const { theme } = useTheme(); 
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We will get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 text-gray-100"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl opacity-20 ${
            theme === "dark" ? "bg-blue-500" : "bg-blue-400"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 right-10 w-40 h-40 rounded-full blur-3xl opacity-20 ${
            theme === "dark" ? "bg-purple-500" : "bg-purple-400"
          }`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full blur-3xl opacity-10 ${
            theme === "dark" ? "bg-indigo-500" : "bg-indigo-300"
          }`}
        ></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <button
          onClick={() => navigate("/dashboard")}
          className={`group flex items-center gap-3 mb-8 px-6 py-3 rounded-xl font-medium shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
            theme === "dark"
              ? "bg-gray-800/70 border border-gray-700 text-white hover:bg-gray-700/80 hover:border-gray-600"
              : "bg-white/80 border border-gray-200 text-gray-700 hover:bg-white hover:border-gray-300"
          }`}
        >
          <ArrowLeft
            size={20}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to Dashboard
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h1>
          <p
            className={`text-lg sm:text-xl max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div
            className={`backdrop-blur-lg rounded-2xl p-8 shadow-2xl border transition-all duration-300 hover:shadow-3xl ${
              theme === "dark"
                ? "bg-gray-800/60 border-gray-700/50"
                : "bg-white/70 border-white/50"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  className={`block text-sm font-semibold ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 focus:scale-105 ${
                    theme === "dark"
                      ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:bg-gray-700/70"
                      : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white/80"
                  }`}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  className={`block text-sm font-semibold ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 focus:scale-105 ${
                    theme === "dark"
                      ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:bg-gray-700/70"
                      : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white/80"
                  }`}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  className={`block text-sm font-semibold ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 focus:scale-105 resize-none ${
                    theme === "dark"
                      ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:bg-gray-700/70"
                      : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white/80"
                  }`}
                  placeholder="Tell us what's on your mind..."
                  required
                />
              </div>

              <button
                type="submit"
                className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  <Send
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                  Send Message
                </span>
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div
              className={`backdrop-blur-lg rounded-2xl p-8 shadow-2xl border transition-all duration-300 hover:shadow-3xl ${
                theme === "dark"
                  ? "bg-gray-800/60 border-gray-700/50"
                  : "bg-white/70 border-white/50"
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-6 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <p
                      className={`font-semibold ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Email
                    </p>
                    <a
                      href="mailto:sphsinghpharswan@gmail.com"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 hover:underline"
                    >
                      sphsinghpharswan@gmail.com
                    </a>
                  </div>
                </div>

                <div className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-lg">
                    <Send size={20} className="text-white" />
                  </div>
                  <div>
                    <p
                      className={`font-semibold ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      WhatsApp
                    </p>
                    <a
                      href="https://api.whatsapp.com/send/?phone=917889844597&text&type=phone_number&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-300 hover:underline"
                    >
                      +91 7889844597
                    </a>
                  </div>
                </div>

                <div className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-105">
                  <div className="p-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-lg">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <p
                      className={`font-semibold ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Phone
                    </p>
                    <p
                      className={`${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      +91 7889844597
                    </p>
                  </div>
                </div>

                <div className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-105">
                  <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-lg">
                    <MessageSquare size={20} className="text-white" />
                  </div>
                  <div>
                    <p
                      className={`font-semibold ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Response Time
                    </p>
                    <p
                      className={`${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      We usually reply within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`backdrop-blur-lg rounded-2xl p-6 shadow-2xl border transition-all duration-300 hover:shadow-3xl ${
                theme === "dark"
                  ? "bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-gray-700/50"
                  : "bg-gradient-to-br from-white/70 to-gray-50/70 border-white/50"
              }`}
            >
              <div className="text-center">
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Let's Build Something Amazing Together
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Whether you have a question, feedback, or just want to say
                  hello, we're here to help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
