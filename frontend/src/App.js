import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import "./App.css";

function AppContent() {
  const { user, loading } = useAuth();
  const [page, setPage] = useState("login");

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    );
  }

  if (user) return <Profile />;

  return (
    <div className="auth-screen">
      <div className="brand">
        <div className="brand-logo">⬡</div>
        <span>AuthApp</span>
      </div>
      {page === "login" ? (
        <Login onSwitch={() => setPage("register")} />
      ) : (
        <Register onSwitch={() => setPage("login")} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
