import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash,
  ArrowLeft,
  BookOpen,
  ExternalLink,
  Library,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Books() {
  const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;
  const navigate = useNavigate();
  const { theme } = useTheme();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin =
    user?.email === "ayush25.kandari@gmail.com" ||
    user?.email === "sphsinghpharswan@gmail.com";

  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`${DATABASE_URL}/books.json`)
      .then((res) => res.json())
      .then((data) => {
        if (data) setBooks(data);
      });
  }, []);

  const addBook = async () => {
    const title = prompt("Enter book title:");
    const url = prompt("Paste link (Google Drive / PDF / Website):");
    if (!title || !url) return;

    const updated = [...books, { title, url }];
    setBooks(updated);

    await fetch(`${DATABASE_URL}/books.json`, {
      method: "PUT",
      body: JSON.stringify(updated),
    });
  };

  const deleteBook = async (index) => {
    const updated = books.filter((_, i) => i !== index);
    setBooks(updated);

    await fetch(`${DATABASE_URL}/books.json`, {
      method: "PUT",
      body: JSON.stringify(updated),
    });
  };

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
            theme === "dark" ? "bg-blue-500" : "bg-blue-400"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 right-10 w-40 h-40 rounded-full blur-3xl opacity-20 ${
            theme === "dark" ? "bg-purple-500" : "bg-purple-400"
          }`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/4 w-24 h-24 rounded-full blur-3xl opacity-15 ${
            theme === "dark" ? "bg-indigo-500" : "bg-indigo-300"
          }`}
        ></div>
      </div>

      <div className="relative z-10 p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate(-1)}
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
              Back
            </button>

            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600"
                }`}
              >
                <Library size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Books Library
                </h1>
                <p
                  className={`text-sm mt-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Expand your knowledge with curated resources
                </p>
              </div>
            </div>
          </div>

          {isAdmin && (
            <button
              onClick={addBook}
              className="group flex items-center gap-3 px-6 py-3 rounded-xl font-medium shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <Plus
                size={20}
                className="transition-transform group-hover:rotate-90"
              />
              Add New Book
            </button>
          )}
        </div>

        <div
          className={`backdrop-blur-lg rounded-2xl p-6 shadow-xl border mb-8 ${
            theme === "dark"
              ? "bg-gray-800/60 border-gray-700/50"
              : "bg-white/70 border-white/50"
          }`}
        >
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {books.length}
              </div>
              <div
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Total Books
              </div>
            </div>
            <div
              className={`w-px h-12 ${
                theme === "dark" ? "bg-gray-600" : "bg-gray-300"
              }`}
            ></div>
            <div className="text-center">
              <div className="text-2xl">📚</div>
              <div
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Knowledge Hub
              </div>
            </div>
          </div>
        </div>

        {books.length === 0 ? (
          <div
            className={`text-center py-16 backdrop-blur-lg rounded-2xl shadow-xl border ${
              theme === "dark"
                ? "bg-gray-800/60 border-gray-700/50"
                : "bg-white/70 border-white/50"
            }`}
          >
            <div
              className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                theme === "dark"
                  ? "bg-gradient-to-r from-gray-700 to-gray-600"
                  : "bg-gradient-to-r from-gray-200 to-gray-300"
              }`}
            >
              <BookOpen
                size={40}
                className={theme === "dark" ? "text-gray-400" : "text-gray-500"}
              />
            </div>
            <h3
              className={`text-xl font-semibold mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              No Books Available Yet
            </h3>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              The library is being prepared. Check back soon for amazing
              resources! 📖
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {books.map((book, index) => (
              <div
                key={index}
                className={`group backdrop-blur-lg rounded-2xl p-6 shadow-xl border transition-all duration-300 hover:shadow-2xl hover:scale-102 ${
                  theme === "dark"
                    ? "bg-gray-800/60 border-gray-700/50 hover:bg-gray-800/80"
                    : "bg-white/70 border-white/50 hover:bg-white/90"
                }`}
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className={`p-3 rounded-xl ${
                        theme === "dark"
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30"
                          : "bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200"
                      }`}
                    >
                      <BookOpen
                        size={24}
                        className={
                          theme === "dark" ? "text-blue-400" : "text-blue-600"
                        }
                      />
                    </div>

                    <div className="flex-1">
                      <a
                        href={book.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group-hover:underline font-semibold text-lg transition-colors duration-300 flex items-center gap-2 ${
                          theme === "dark"
                            ? "text-blue-400 hover:text-blue-300"
                            : "text-blue-600 hover:text-blue-700"
                        }`}
                      >
                        {book.title}
                        <ExternalLink
                          size={16}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </a>
                      <p
                        className={`text-sm mt-1 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Click to open and start reading
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={book.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                        theme === "dark"
                          ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200"
                      }`}
                    >
                      Read Now
                    </a>

                    {isAdmin && (
                      <button
                        onClick={() => deleteBook(index)}
                        className={`group p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                          theme === "dark"
                            ? "text-red-400 hover:bg-red-500/20 hover:text-red-300"
                            : "text-red-600 hover:bg-red-100 hover:text-red-700"
                        }`}
                        title="Delete Book"
                      >
                        <Trash
                          size={18}
                          className="transition-transform group-hover:scale-110"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Books;
