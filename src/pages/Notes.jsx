import React, { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Notes() {
  const DATABASE_URL = "https://notes-app-9540a-default-rtdb.firebaseio.com";
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin =
    user?.email === "ayush25.kandari@gmail.com" ||
    user?.email === "sphsinghpharswan@gmail.com";

  const [notes, setNotes] = useState({
    detailNotes: [],
    classNotes: [],
    mindMaps: [],
  });

  // Fetch notes on load
  useEffect(() => {
    fetch(`${DATABASE_URL}/notes.json`)
      .then((res) => res.json())
      .then((data) => {
        if (data) setNotes(data);
      });
  }, []);

  // Add new note (Admin only)
  const addNote = async (type) => {
    const title = prompt("Enter note title:");
    const url = prompt("Paste Google Drive link:");
    if (!title || !url) return;

    const updated = [...(notes[type] || []), { title, url }];
    setNotes((prev) => ({ ...prev, [type]: updated }));

    await fetch(`${DATABASE_URL}/notes/${type}.json`, {
      method: "PUT",
      body: JSON.stringify(updated),
    });
  };

  // Delete note (Admin only)
  const deleteNote = async (type, index) => {
    const updated = notes[type].filter((_, i) => i !== index);
    setNotes((prev) => ({ ...prev, [type]: updated }));

    await fetch(`${DATABASE_URL}/notes/${type}.json`, {
      method: "PUT",
      body: JSON.stringify(updated),
    });
  };

  // Reusable Section Component
  const NotesSection = ({ title, type, data }) => (
    <div className="mb-8 p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {isAdmin && (
          <button
            onClick={() => addNote(type)}
            className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} /> Add
          </button>
        )}
      </div>
      <ul className="space-y-3">
        {data?.map((note, index) => (
          <li
            key={index}
            className="flex justify-between items-center border p-3 rounded-lg hover:bg-gray-50"
          >
            <a
              href={note.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {note.title}
            </a>
            {isAdmin && (
              <button
                onClick={() => deleteNote(type, index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash size={20} />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header with Back button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notes</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          ⬅ Back
        </button>
      </div>

      <NotesSection
        title="Detail Notes"
        type="detailNotes"
        data={notes.detailNotes}
      />
      <NotesSection
        title="Class Notes"
        type="classNotes"
        data={notes.classNotes}
      />
      <NotesSection title="Mind Maps" type="mindMaps" data={notes.mindMaps} />
    </div>
  );
}

export default Notes;
