// src/pages/Videos.jsx
import React, { useState, useEffect } from "react";
import { Plus, Trash, ArrowLeft, Play, BookOpen, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Videos() {
  const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin =
    user?.email === "ayush25.kandari@gmail.com" ||
    user?.email === "sphsinghpharswan@gmail.com";

  const [videos, setVideos] = useState({});
  const [selectedClass, setSelectedClass] = useState(null);
  const classes = ["class7", "class8", "class9", "class10"];

  // Fetch videos on load
  useEffect(() => {
    fetch(`${DATABASE_URL}/videos.json`)
      .then((res) => res.json())
      .then((data) => {
        if (data) setVideos(data);
      });
  }, []);

  // Normalize YouTube link
  const normalizeYouTubeUrl = (input) => {
    if (!input) return "";
    const iframeMatch = input.match(/src="([^"]+)"/);
    if (iframeMatch) return iframeMatch[1];
    if (input.includes("watch?v=")) {
      const videoId = input.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (input.includes("youtu.be/")) {
      const videoId = input.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return input;
  };

  // Add new video
  const addVideo = async () => {
    const title = prompt("Enter video title:");
    const urlInput = prompt("Paste YouTube link or iframe code:");
    if (!title || !urlInput || !selectedClass) return;

    const embedUrl = normalizeYouTubeUrl(urlInput);
    const updated = [
      ...(videos[selectedClass] || []),
      { title, url: embedUrl },
    ];

    setVideos((prev) => ({ ...prev, [selectedClass]: updated }));

    await fetch(`${DATABASE_URL}/videos/${selectedClass}.json`, {
      method: "PUT",
      body: JSON.stringify(updated),
    });
  };

  // Delete video
  const deleteVideo = async (index) => {
    const updated = videos[selectedClass].filter((_, i) => i !== index);
    setVideos((prev) => ({ ...prev, [selectedClass]: updated }));

    await fetch(`${DATABASE_URL}/videos/${selectedClass}.json`, {
      method: "PUT",
      body: JSON.stringify(updated),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                selectedClass ? setSelectedClass(null) : navigate(-1)
              }
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 dark:border-slate-600 font-medium transform hover:-translate-y-0.5"
            >
              <ArrowLeft size={18} />
              {selectedClass ? "Back to Classes" : "Back"}
            </button>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-500 rounded-2xl shadow-xl">
                <Video className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-purple-800 dark:from-slate-100 dark:to-purple-300 bg-clip-text text-transparent">
                  Video Library
                </h1>
                {selectedClass && (
                  <p className="text-lg text-gray-600 dark:text-slate-400 font-medium mt-1">
                    {selectedClass.replace("class", "Class ")} • Educational
                    Videos
                  </p>
                )}
              </div>
            </div>
          </div>

          {isAdmin && selectedClass && (
            <button
              onClick={addVideo}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
            >
              <Plus size={18} />
              Add Video
            </button>
          )}
        </div>

        {/* Class Selection */}
        {!selectedClass ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {classes.map((cls, index) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className="group p-8 bg-white dark:bg-slate-800 shadow-xl rounded-3xl text-xl font-bold text-gray-800 dark:text-slate-100 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-500 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Play className="text-white" size={28} />
                  </div>
                  <span className="bg-gradient-to-r from-gray-800 to-purple-800 dark:from-slate-100 dark:to-purple-300 bg-clip-text text-transparent">
                    {cls.replace("class", "Class ")}
                  </span>
                  <div className="text-sm text-gray-500 dark:text-slate-400 font-normal">
                    {videos[cls]?.length || 0} videos available
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          // Videos List for Selected Class
          <div className="space-y-6">
            {/* Stats Header */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <BookOpen
                      className="text-purple-600 dark:text-purple-400"
                      size={20}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200">
                      {selectedClass.replace("class", "Class ")} Videos
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400">
                      {videos[selectedClass]?.length || 0} educational videos
                      available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Videos Grid */}
            {!videos[selectedClass] || videos[selectedClass].length === 0 ? (
              <div className="text-center py-16">
                <div className="p-6 bg-purple-100 dark:bg-purple-900 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Video
                    className="text-purple-600 dark:text-purple-400"
                    size={40}
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-200 mb-2">
                  No Videos Yet
                </h3>
                <p className="text-gray-600 dark:text-slate-400 text-lg mb-6">
                  There are no videos available for this class yet.
                </p>
                {isAdmin && (
                  <button
                    onClick={addVideo}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                  >
                    <Plus size={18} />
                    Add First Video
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {videos[selectedClass].map((video, index) => (
                  <div
                    key={index}
                    className="group bg-white dark:bg-slate-800 shadow-xl rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Video Container */}
                    <div className="relative">
                      <div className="aspect-video rounded-t-3xl overflow-hidden bg-gray-100 dark:bg-slate-700">
                        <iframe
                          src={video.url}
                          title={video.title}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      </div>

                      {/* Play overlay for better visual indication */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-t-3xl">
                        <div className="absolute bottom-4 left-4">
                          <div className="p-2 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-lg backdrop-blur-sm">
                            <Play
                              className="text-purple-600 dark:text-purple-400"
                              size={16}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-3 line-clamp-2 leading-tight">
                        {video.title}
                      </h2>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                          <div className="p-1 bg-purple-100 dark:bg-purple-900 rounded">
                            <Video
                              size={12}
                              className="text-purple-600 dark:text-purple-400"
                            />
                          </div>
                          Educational Content
                        </div>

                        {isAdmin && (
                          <button
                            onClick={() => deleteVideo(index)}
                            className="flex items-center gap-2 px-3 py-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200 text-sm font-medium transform hover:scale-105"
                          >
                            <Trash size={16} />
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Videos;
