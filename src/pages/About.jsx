import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 mb-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        About This Website
      </h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        BhaiyaG is a collaborative platform where students can access study
        resources like{" "}
        <span className="font-semibold">Notes, Videos, and Books</span>. Admins
        have the ability to manage users, control content, and ensure smooth
        operation of the platform.
      </p>
      <p className="mt-4 text-gray-600">
        The goal is to create a one-stop solution for students preparing for
        competitive exams, allowing them to learn, revise, and stay consistent
        with high-quality study materials.
      </p>
    </div>
  );
}

export default About;
