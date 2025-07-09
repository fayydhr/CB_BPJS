// src/pages/Login.jsx
import React, { useState } from "react";

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        onLogin(data.user);
      } else {
        setError(data.error || "Login gagal");
      }
    } catch (err) {
      setError("Koneksi gagal");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">🔐 Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full border border-gray-300 px-4 py-2 rounded"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border border-gray-300 px-4 py-2 rounded"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
