// src/pages/Books.jsx
import React, { useState, useEffect } from "react";
import { Plus, Trash, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Books() {
  const DATABASE_URL = "https://notes-app-9540a-default-rtdb.firebaseio.com";
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin =
    user?.email === "ayush25.kandari@gmail.com" ||
    user?.email === "sphsinghpharswan@gmail.com";

  const [books, setBooks] = useState([]);

  // Fetch books on load
  useEffect(() => {
    fetch(`${DATABASE_URL}/books.json`)
      .then((res) => res.json())
      .then((data) => {
        if (data) setBooks(data);
      });
  }, []);

  // Add new book (Admin only)
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

  // Delete book (Admin only)
  const deleteBook = async (index) => {
    const updated = books.filter((_, i) => i !== index);
    setBooks(updated);

    await fetch(`${DATABASE_URL}/books.json`, {
      method: "PUT",
      body: JSON.stringify(updated),
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-1 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <h1 className="text-3xl font-bold">Books</h1>
        </div>
        {isAdmin && (
          <button
            onClick={addBook}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} /> Add Book
          </button>
        )}
      </div>

      {/* Books List */}
      <ul className="space-y-4">
        {books.map((book, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow hover:bg-gray-50"
          >
            <a
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline font-medium"
            >
              {book.title}
            </a>
            {isAdmin && (
              <button
                onClick={() => deleteBook(index)}
                className="text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <Trash size={18} /> Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
