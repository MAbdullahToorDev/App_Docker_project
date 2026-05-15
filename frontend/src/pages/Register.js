import React, { useState } from "react";
import { registerUser } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Register({ onSwitch }) {
  const { login } = useAuth();
  const [form, setForm]       = useState({ name: "", email: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    setLoading(true);
    try {
      const { data } = await registerUser(form);
      login(data, data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Create account</h2>
      <p className="subtitle">Start your journey today</p>
      {error && <div className="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Full Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min 6 characters" required />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>
      <p className="switch">Already have an account? <span onClick={onSwitch}>Sign In</span></p>
    </div>
  );
}
