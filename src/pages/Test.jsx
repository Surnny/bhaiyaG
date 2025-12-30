import React, { useEffect, useState } from "react";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

// ✅ ADMIN EMAILS
const adminEmails = ["ayush25.kandari@gmail.com", "sphsinghpharswan@gmail.com"];

function Test() {
  const [tests, setTests] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  // ✅ Get logged-in user from localStorage (existing system)
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = adminEmails.includes(loggedInUser?.email);

  // Fetch tests
  useEffect(() => {
    fetch(`${DATABASE_URL}/tests.json`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          setTests([]);
          return;
        }

        const list = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));

        setTests(list.reverse());
      });
  }, []);

  // Add test (ADMIN ONLY)
  const handleAddTest = async (e) => {
    e.preventDefault();

    if (!title || !link) {
      alert("Please fill all fields");
      return;
    }

    await fetch(`${DATABASE_URL}/tests.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, link }),
    });

    setTitle("");
    setLink("");
    alert("Test added successfully");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Tests Dashboard
          </h1>
          <p className="text-gray-600">Manage and attempt your tests</p>
        </div>

        {/* ✅ ADD TEST FORM (ADMIN ONLY) */}
        {isAdmin && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 border">
            <h2 className="text-2xl font-bold mb-6">Add New Test (Admin)</h2>

            <form onSubmit={handleAddTest} className="space-y-5">
              <input
                type="text"
                placeholder="Test Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
              />

              <input
                type="url"
                placeholder="Google Form Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
              />

              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
                Add Test
              </button>
            </form>
          </div>
        )}

        {/* TEST LIST */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Available Tests</h2>

          {tests.length === 0 && (
            <p className="text-gray-500 text-center">No tests available yet.</p>
          )}

          {tests.map((test) => (
            <div
              key={test.id}
              className="bg-white p-6 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{test.title}</h3>
                <p className="text-sm text-gray-500">
                  Click to attempt this test
                </p>
              </div>

              <a
                href={test.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-lg"
              >
                Attempt Test
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Test;
