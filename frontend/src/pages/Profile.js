import React, { useState } from "react";
import { updateProfile } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, setUser, logout } = useAuth();
  const [form, setForm]           = useState({ name: user.name, bio: user.bio || "" });
  const [password, setPassword]   = useState("");
  const [message, setMessage]     = useState("");
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); setError("");
    setLoading(true);
    const payload = { ...form };
    if (password) payload.password = password;
    try {
      const { data } = await updateProfile(payload);
      setUser((prev) => ({ ...prev, ...data }));
      setPassword("");
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const initials = user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="profile-wrapper">
      <div className="card">
        <div className="profile-header">
          <div className="avatar">{initials}</div>
          <div>
            <h2>{user.name}</h2>
            <p className="subtitle">{user.email}</p>
          </div>
          <button className="btn-logout" onClick={logout}>Logout</button>
        </div>
        <hr className="divider" />
        <h3>Edit Profile</h3>
        {message && <div className="alert success">{message}</div>}
        {error   && <div className="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="field">
            <label>Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Tell us about yourself..." rows={3} maxLength={200} />
            <small>{form.bio.length}/200</small>
          </div>
          <div className="field">
            <label>New Password <span className="optional">(leave blank to keep current)</span></label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" minLength={6} />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
