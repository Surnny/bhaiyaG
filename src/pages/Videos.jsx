// src/pages/Videos.jsx
import React, { useState, useEffect } from "react";
import { Plus, Trash, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Videos() {
  const DATABASE_URL = "https://notes-app-9540a-default-rtdb.firebaseio.com";
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin =
    user?.email === "ayush25.kandari@gmail.com" ||
    user?.email === "sphsinghpharswan@gmail.com";

  const [videos, setVideos] = useState([]);

  // Fetch videos on load
  useEffect(() => {
    fetch(`${DATABASE_URL}/videos.json`)
      .then((res) => res.json())
      .then((data) => {
        if (data) setVideos(data);
      });
  }, []);

  // Helper: normalize YouTube link
  const normalizeYouTubeUrl = (input) => {
    if (!input) return "";

    // Case 1: if full iframe pasted
    const iframeMatch = input.match(/src="([^"]+)"/);
    if (iframeMatch) return iframeMatch[1];

    // Case 2: normal YouTube link -> convert to embed
    if (input.includes("watch?v=")) {
      const videoId = input.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Case 3: short youtu.be link
    if (input.includes("youtu.be/")) {
      const videoId = input.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Otherwise assume already embed URL
    return input;
  };

  // Add new video (Admin only)
  const addVideo = async () => {
    const title = prompt("Enter video title:");
    const urlInput = prompt("Paste YouTube link or iframe code:");
    if (!title || !urlInput) return;

    const embedUrl = normalizeYouTubeUrl(urlInput);

    const updated = [...videos, { title, url: embedUrl }];
    setVideos(updated);

    await fetch(`${DATABASE_URL}/videos.json`, {
      method: "PUT",
      body: JSON.stringify(updated),
    });
  };

  // Delete video (Admin only)
  const deleteVideo = async (index) => {
    const updated = videos.filter((_, i) => i !== index);
    setVideos(updated);

    await fetch(`${DATABASE_URL}/videos.json`, {
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
          <h1 className="text-3xl font-bold">Videos</h1>
        </div>
        {isAdmin && (
          <button
            onClick={addVideo}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} /> Add Video
          </button>
        )}
      </div>

      {/* Videos List */}
      <div className="grid md:grid-cols-2 gap-6">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-white p-4 shadow rounded-lg flex flex-col"
          >
            <h2 className="text-lg font-semibold mb-2">{video.title}</h2>
            <div className="aspect-w-16 aspect-h-9 mb-3">
              <iframe
                src={video.url}
                title={video.title}
                className="w-full h-64 rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            {isAdmin && (
              <button
                onClick={() => deleteVideo(index)}
                className="self-end text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <Trash size={18} /> Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Videos;
