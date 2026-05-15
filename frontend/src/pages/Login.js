import React, { useState } from "react";
import { loginUser } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Login({ onSwitch }) {
  const { login } = useAuth();
  const [form, setForm]       = useState({ email: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await loginUser(form);
      login(data, data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Welcome back</h2>
      <p className="subtitle">Sign in to your account</p>
      {error && <div className="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <p className="switch">Don't have an account? <span onClick={onSwitch}>Register</span></p>
    </div>
  );
}
