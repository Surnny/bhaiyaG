import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    place: "",
    photo: "",
  });

  const [userKey, setUserKey] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [activeField, setActiveField] = useState(null);

  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
      return;
    }

    fetch(`${DATABASE_URL}/users.json`)
      .then((res) => res.json())
      .then((data) => {
        const entries = Object.entries(data || {});
        const found = entries.find(
          ([key, value]) =>
            value.email.trim().toLowerCase() ===
            storedUser.email.trim().toLowerCase()
        );

        if (found) {
          setUserKey(found[0]);
          setForm({
            name: found[1].name || "",
            email: found[1].email || "",
            phone: found[1].phone || "",
            dob: found[1].dob || "",
            place: found[1].place || "",
            photo: found[1].photo || "",
            role: found[1].role || "user",
            block: found[1].block || false,
            googleAuth: found[1].googleAuth || false,
          });
        }
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleImageUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, photo: reader.result });
      setSaved(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleImageUpload(file);
  };

  const handleSave = async () => {
    if (!userKey) return;

    setSaving(true);

    const updatedData = {
      name: form.name || "",
      phone: form.phone || "",
      dob: form.dob || "",
      place: form.place || "",
      role: form.role || "user",
    };

    try {
      const response = await fetch(`${DATABASE_URL}/users/${userKey}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Firebase update failed");
      }

      // Store minimal session data only
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: form.email,
          role: form.role || "user",
          name: form.name || "",
        })
      );

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong while updating profile.");
    }

    setSaving(false);
  };
  const initials = form.name
    ? form.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const fields = [
    {
      name: "name",
      label: "Full Name",
      placeholder: "Your full name",
      type: "text",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      name: "email",
      label: "Email Address",
      placeholder: "your@email.com",
      type: "email",
      disabled: true,
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "+1 (555) 000-0000",
      type: "tel",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
    {
      name: "dob",
      label: "Date of Birth",
      placeholder: "",
      type: "date",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "place",
      label: "Location",
      placeholder: "City, Country",
      type: "text",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .profile-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #0f0f13;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
        }

        .profile-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 60%);
          pointer-events: none;
        }

        .card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          backdrop-filter: blur(20px);
          width: 100%;
          max-width: 520px;
          padding: 2.5rem;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 40px 80px rgba(0,0,0,0.5);
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .avatar-zone {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
          position: relative;
        }

        .avatar-wrapper {
          position: relative;
          width: 108px;
          height: 108px;
          cursor: pointer;
        }

        .avatar-img {
          width: 108px;
          height: 108px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(255,255,255,0.12);
          transition: filter 0.3s ease, transform 0.3s ease;
        }

        .avatar-wrapper:hover .avatar-img,
        .avatar-wrapper:hover .avatar-initials {
          filter: brightness(0.5);
        }

        .avatar-wrapper:hover .avatar-overlay {
          opacity: 1;
        }

        .avatar-initials {
          width: 108px;
          height: 108px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 600;
          color: white;
          border: 2px solid rgba(255,255,255,0.12);
          transition: filter 0.3s ease;
        }

        .avatar-overlay {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.25s ease;
          color: white;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          gap: 4px;
        }

        .drag-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px dashed rgba(99, 102, 241, 0.8);
          animation: spin 8s linear infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .dragging-active .drag-ring { opacity: 1; }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .badge {
          margin-top: 0.75rem;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: #a5b4fc;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #6366f1;
          box-shadow: 0 0 6px #6366f1;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 500;
          color: #f1f1f3;
          margin-bottom: 1.5rem;
          letter-spacing: -0.01em;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .field-wrap {
          position: relative;
          animation: fadeIn 0.5s ease both;
        }

        .field-wrap:nth-child(1) { animation-delay: 0.05s; }
        .field-wrap:nth-child(2) { animation-delay: 0.1s; }
        .field-wrap:nth-child(3) { animation-delay: 0.15s; }
        .field-wrap:nth-child(4) { animation-delay: 0.2s; }
        .field-wrap:nth-child(5) { animation-delay: 0.25s; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .field-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 6px;
          transition: color 0.2s ease;
        }

        .field-wrap.focused .field-label {
          color: #818cf8;
        }

        .field-input-wrap {
          position: relative;
        }

        .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.2);
          transition: color 0.2s ease;
          pointer-events: none;
        }

        .field-wrap.focused .field-icon {
          color: #6366f1;
        }

        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 12px 14px 12px 40px;
          color: #f1f1f3;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          outline: none;
          transition: all 0.25s ease;
          -webkit-appearance: none;
        }

        .field-input::placeholder {
          color: rgba(255,255,255,0.15);
        }

        .field-input:focus {
          border-color: rgba(99, 102, 241, 0.5);
          background: rgba(99, 102, 241, 0.06);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .field-input:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .field-input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.4);
          cursor: pointer;
        }

        .focus-bar {
          position: absolute;
          bottom: 0;
          left: 12px;
          right: 12px;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #a855f7);
          border-radius: 0 0 2px 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .field-wrap.focused .focus-bar {
          transform: scaleX(1);
        }

        .divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 1.5rem 0;
        }

        .save-btn {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
          color: white;
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.35);
        }

        .save-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(99, 102, 241, 0.5);
        }

        .save-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .save-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .save-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
        }

        .save-btn.saved-state {
          background: linear-gradient(135deg, #059669, #10b981);
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.35);
        }

        .btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          position: relative;
          z-index: 1;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: rotate 0.7s linear infinite;
        }

        @keyframes rotate {
          to { transform: rotate(360deg); }
        }

        .checkmark {
          width: 18px;
          height: 18px;
          stroke: white;
          fill: none;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 24;
          stroke-dashoffset: 24;
          animation: draw 0.4s ease forwards;
        }

        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }

        .file-input-hidden {
          display: none;
        }
      `}</style>

      <div
        className="profile-root"
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <div className="card">
          {/* Avatar */}
          <div className="avatar-zone">
            <label htmlFor="photo-upload" style={{ cursor: "pointer" }}>
              <div
                className={`avatar-wrapper ${
                  dragging ? "dragging-active" : ""
                }`}
              >
                <div className="drag-ring" />
                {form.photo ? (
                  <img src={form.photo} alt="Profile" className="avatar-img" />
                ) : (
                  <div className="avatar-initials">{initials}</div>
                )}
                <div className="avatar-overlay">
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Change photo</span>
                </div>
              </div>
            </label>

            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="file-input-hidden"
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />

            <div className="badge">
              <span className="badge-dot" />
              {form.role || "Member"}
            </div>
          </div>

          {/* Title */}
          <div className="section-title">
            {form.name ? `Hello, ${form.name.split(" ")[0]}` : "Your Profile"}
          </div>

          {/* Fields */}
          <div className="field-group">
            {fields.map((field) => (
              <div
                key={field.name}
                className={`field-wrap ${
                  activeField === field.name ? "focused" : ""
                }`}
              >
                <div className="field-label">
                  {field.icon}
                  {field.label}
                  {field.disabled && (
                    <svg
                      className="w-3 h-3 ml-auto opacity-40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  )}
                </div>
                <div className="field-input-wrap">
                  <span className="field-icon">{field.icon}</span>
                  <input
                    name={field.name}
                    type={field.type}
                    value={form[field.name] || ""}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    disabled={field.disabled}
                    onFocus={() => setActiveField(field.name)}
                    onBlur={() => setActiveField(null)}
                    className="field-input"
                  />
                  <div className="focus-bar" />
                </div>
              </div>
            ))}
          </div>

          <div className="divider" />

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className={`save-btn ${saved ? "saved-state" : ""}`}
          >
            <span className="btn-content">
              {saving && <span className="spinner" />}
              {saved && (
                <svg className="checkmark" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {saving
                ? "Saving changes…"
                : saved
                ? "Changes saved!"
                : "Save Changes"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
