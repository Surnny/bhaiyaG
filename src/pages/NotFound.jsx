import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";

function NotFound() {
  const navigate = useNavigate();

  // ✅ Check if user is logged in
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-center transition-all duration-500 p-4 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/5 dark:bg-purple-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* 404 Title with enhanced styling */}
        <div className="mb-6">
          <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 dark:from-red-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent mb-2 drop-shadow-2xl animate-pulse">
            404
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-400 dark:to-orange-400 mx-auto rounded-full shadow-lg"></div>
        </div>

        {/* Enhanced Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-slate-100 mb-3">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-slate-400 mb-2 font-medium">
            Oops! The page you are looking for does not exist.
          </p>
          <p className="text-sm text-gray-500 dark:text-slate-500">
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Enhanced Video Container */}
        <div className="mb-10">
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 rounded-2xl blur opacity-30 dark:opacity-20 animate-pulse"></div>
            <div className="relative bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-600">
              <video
                src="/funny.mp4"
                controls
                autoPlay
                loop
                className="w-40 md:w-48 max-w-md rounded-xl shadow-lg"
              ></video>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-500 mt-3 font-medium">
            Here's something to cheer you up! 🎬
          </p>
        </div>

        {/* Enhanced Conditional Button */}
        <div className="space-y-4">
          {user ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-semibold text-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <ArrowLeftCircle
                size={24}
                className="relative z-10 group-hover:-translate-x-1 transition-transform duration-300"
              />
              <span className="relative z-10">Return to Dashboard</span>
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-semibold text-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <ArrowLeftCircle
                size={24}
                className="relative z-10 group-hover:-translate-x-1 transition-transform duration-300"
              />
              <span className="relative z-10">Return to Login</span>
            </button>
          )}

          {/* Additional helpful link */}
          <div className="mt-6">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium underline underline-offset-4 decoration-2 decoration-gray-300 dark:decoration-slate-600 hover:decoration-blue-500 dark:hover:decoration-blue-400"
            >
              Or go back to previous page
            </button>
          </div>
        </div>

        {/* Fun footer message */}
        <div className="mt-12 p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-slate-600/50 shadow-lg">
          <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
            <span className="font-semibold">Fun Fact:</span> The HTTP 404 error
            was named after room 404 at CERN, where the original web servers
            were located. When you couldn't find a page, you literally couldn't
            find room 404! 🌐
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
