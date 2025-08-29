import React, { useState } from "react";
import { ArrowLeft, Mail, Phone, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We will get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 mb-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <h1 className="text-3xl font-bold text-blue-600 mb-6">Contact Us</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Your Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            rows="4"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>

      <div className="mt-10 text-center text-gray-600">
        <p className="flex items-center justify-center gap-2">
          <Mail size={18} /> support@bhaiyag.com
        </p>
        <p className="flex items-center justify-center gap-2 mt-2">
          <Phone size={18} /> +91 9876543210
        </p>
        <p className="flex items-center justify-center gap-2 mt-2">
          <MessageSquare size={18} /> We usually reply within 24 hours
        </p>
      </div>
    </div>
  );
}

export default Contact;
