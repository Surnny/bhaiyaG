import React, { useState, useEffect } from "react";
import { Plus, Trash, ArrowLeft, BookOpen, FileText, Map } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Notes() {
  const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin =
    user?.email === "ayush25.kandari@gmail.com" ||
    user?.email === "sphsinghpharswan@gmail.com";

  const [selectedClass, setSelectedClass] = useState(null);
  const [notes, setNotes] = useState({});
  const classes = ["class7", "class8", "class9", "class10"];

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

    const updated = [...(notes[selectedClass]?.[type] || []), { title, url }];

    setNotes((prev) => ({
      ...prev,
      [selectedClass]: { ...prev[selectedClass], [type]: updated },
    }));

    await fetch(`${DATABASE_URL}/notes/${selectedClass}/${type}.json`, {
      method: "PUT",
      body: JSON.stringify(updated),
    });
  };

  // Delete note (Admin only)
  const deleteNote = async (type, index) => {
    const updated = notes[selectedClass][type].filter((_, i) => i !== index);

    setNotes((prev) => ({
      ...prev,
      [selectedClass]: { ...prev[selectedClass], [type]: updated },
    }));

    await fetch(`${DATABASE_URL}/notes/${selectedClass}/${type}.json`, {
      method: "PUT",
      body: JSON.stringify(updated),
    });
  };

  // Reusable Section Component
  const NotesSection = ({ title, type, data, icon: Icon }) => (
    <div className="mb-8 p-6 bg-white dark:bg-slate-800 shadow-xl rounded-3xl border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 dark:text-slate-100">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 rounded-xl shadow-lg">
            <Icon className="text-white" size={24} />
          </div>
          {title}
        </h2>
        {isAdmin && (
          <button
            onClick={() => addNote(type)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
          >
            <Plus size={18} />
            Add Note
          </button>
        )}
      </div>

      {!data || data.length === 0 ? (
        <div className="text-center py-12">
          <div className="p-4 bg-gray-100 dark:bg-slate-700 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Icon className="text-gray-400 dark:text-slate-400" size={32} />
          </div>
          <p className="text-gray-500 dark:text-slate-400 text-lg">
            No notes available yet
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {data.map((note, index) => (
            <li
              key={index}
              className="group flex flex-col sm:flex-row justify-between sm:items-center gap-3 border border-gray-200 dark:border-slate-600 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 hover:from-blue-50 hover:to-indigo-50 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              <a
                href={note.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-blue-700 dark:text-blue-300 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors duration-200 flex-1 min-w-0"
              >
                <div className="p-1.5 bg-blue-100 dark:bg-blue-900 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                  <FileText size={16} />
                </div>
                <span className="truncate">{note.title}</span>
              </a>
              {isAdmin && (
                <button
                  onClick={() => deleteNote(type, index)}
                  className="flex items-center justify-center p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200 transform hover:scale-110"
                >
                  <Trash size={18} />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-blue-800 dark:from-slate-100 dark:to-blue-300 bg-clip-text text-transparent flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 rounded-2xl shadow-xl">
              <BookOpen className="text-white" size={32} />
            </div>
            Notes Hub
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 dark:border-slate-600 font-medium transform hover:-translate-y-0.5"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        {/* Class Selection */}
        {!selectedClass ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {classes.map((cls, index) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className="group p-8 bg-white dark:bg-slate-800 shadow-xl rounded-3xl text-xl font-bold text-gray-800 dark:text-slate-100 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <BookOpen className="text-white" size={28} />
                  </div>
                  <span className="bg-gradient-to-r from-gray-800 to-blue-800 dark:from-slate-100 dark:to-blue-300 bg-clip-text text-transparent">
                    {cls.replace("class", "Class ")}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <>
            {/* Back to Class Selection */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setSelectedClass(null)}
                className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 dark:border-slate-600 font-medium transform hover:-translate-y-0.5"
              >
                <ArrowLeft size={18} />
                Back to Classes
              </button>

              <div className="text-right">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-800 dark:from-slate-100 dark:to-blue-300 bg-clip-text text-transparent">
                  {selectedClass.replace("class", "Class ")}
                </h2>
                <p className="text-gray-600 dark:text-slate-400 font-medium">
                  Study Materials
                </p>
              </div>
            </div>

            {/* Notes Sections */}
            <div className="space-y-8">
              <NotesSection
                title="Detail Notes"
                type="detailNotes"
                data={notes[selectedClass]?.detailNotes}
                icon={FileText}
              />
              <NotesSection
                title="Class Notes"
                type="classNotes"
                data={notes[selectedClass]?.classNotes}
                icon={BookOpen}
              />
              <NotesSection
                title="Mind Maps"
                type="mindMaps"
                data={notes[selectedClass]?.mindMaps}
                icon={Map}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Notes;
