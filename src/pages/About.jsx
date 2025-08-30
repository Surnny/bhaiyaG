import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function About() {
  const navigate = useNavigate();
  const { theme } = useTheme();

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
          className={`absolute top-10 left-20 w-32 h-32 rounded-full blur-3xl opacity-20 ${
            theme === "dark" ? "bg-blue-500" : "bg-blue-400"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 right-20 w-40 h-40 rounded-full blur-3xl opacity-20 ${
            theme === "dark" ? "bg-purple-500" : "bg-purple-400"
          }`}
        ></div>
        <div
          className={`absolute top-1/3 right-1/4 w-24 h-24 rounded-full blur-3xl opacity-15 ${
            theme === "dark" ? "bg-indigo-500" : "bg-indigo-300"
          }`}
        ></div>
        <div
          className={`absolute bottom-1/3 left-1/4 w-36 h-36 rounded-full blur-3xl opacity-15 ${
            theme === "dark" ? "bg-cyan-500" : "bg-cyan-300"
          }`}
        ></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <button
          onClick={() => navigate("/dashboard")}
          className={`group flex items-center gap-3 mb-8 px-6 py-3 rounded-xl font-medium shadow-lg backdrop-blur-sm border transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
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

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              About BhaiyaG
            </span>
          </h1>
          <div
            className={`w-24 h-1 mx-auto rounded-full ${
              theme === "dark"
                ? "bg-gradient-to-r from-blue-500 to-purple-500"
                : "bg-gradient-to-r from-blue-600 to-indigo-600"
            }`}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className={`backdrop-blur-lg rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl border transition-all duration-300 hover:shadow-3xl ${
              theme === "dark"
                ? "bg-gray-800/60 border-gray-700/50"
                : "bg-white/70 border-white/50"
            }`}
          >
            <div className="space-y-8">
              <div className="relative">
                <div
                  className={`absolute -left-4 top-0 w-1 h-full rounded-full ${
                    theme === "dark"
                      ? "bg-gradient-to-b from-blue-500 to-purple-500"
                      : "bg-gradient-to-b from-blue-600 to-indigo-600"
                  }`}
                ></div>
                <p className="text-lg sm:text-xl leading-relaxed pl-8">
                  <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    BhaiyaG
                  </span>{" "}
                  is more than just a website — it's a way for me to stay
                  connected with you throughout your preparation journey. Even
                  though we may not always be together physically, this platform
                  bridges that gap by bringing important{" "}
                  <span
                    className={`font-semibold px-2 py-1 rounded-lg ${
                      theme === "dark"
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    notes, lessons, books, and videos
                  </span>{" "}
                  right to you whenever you need them.
                </p>
              </div>

              <div className="relative">
                <div
                  className={`absolute -left-4 top-0 w-1 h-full rounded-full ${
                    theme === "dark"
                      ? "bg-gradient-to-b from-purple-500 to-indigo-500"
                      : "bg-gradient-to-b from-indigo-600 to-purple-600"
                  }`}
                ></div>
                <p
                  className={`text-lg leading-relaxed pl-8 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Think of BhaiyaG as a companion in your studies — always here
                  to remind you of what's important, support your learning, and
                  help you stay consistent. Whether it's revising forgotten
                  concepts or refreshing your confidence before exams, BhaiyaG
                  is built to guide you every step of the way.
                </p>
              </div>

              <div className="relative">
                <div
                  className={`absolute -left-4 top-0 w-1 h-full rounded-full ${
                    theme === "dark"
                      ? "bg-gradient-to-b from-indigo-500 to-cyan-500"
                      : "bg-gradient-to-b from-purple-600 to-blue-600"
                  }`}
                ></div>
                <p
                  className={`text-lg font-semibold leading-relaxed pl-8 ${
                    theme === "dark"
                      ? "text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text"
                      : "text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text"
                  }`}
                >
                  Together, we'll make learning easier, smarter, and more
                  meaningful.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div
                className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  theme === "dark"
                    ? "bg-gray-700/50 border-gray-600/50 hover:bg-gray-700/70"
                    : "bg-blue-50/50 border-blue-200/50 hover:bg-blue-50/80"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600"
                  }`}
                >
                  <span className="text-white text-xl font-bold">📚</span>
                </div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Always Accessible
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Your study materials are available 24/7, wherever you are,
                  whenever inspiration strikes.
                </p>
              </div>

              <div
                className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  theme === "dark"
                    ? "bg-gray-700/50 border-gray-600/50 hover:bg-gray-700/70"
                    : "bg-purple-50/50 border-purple-200/50 hover:bg-purple-50/80"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500"
                      : "bg-gradient-to-r from-purple-600 to-indigo-600"
                  }`}
                >
                  <span className="text-white text-xl font-bold">🎯</span>
                </div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Personalized Learning
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Tailored content that adapts to your learning pace and helps
                  you focus on what matters most.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div
              className={`inline-flex items-center px-6 py-3 rounded-full border backdrop-blur-sm ${
                theme === "dark"
                  ? "bg-gray-800/60 border-gray-700/50 text-gray-300"
                  : "bg-white/60 border-gray-200/50 text-gray-700"
              }`}
            >
              <span className="text-sm font-medium">
                Ready to start your journey?
              </span>
              <span className="ml-2 animate-pulse">✨</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
