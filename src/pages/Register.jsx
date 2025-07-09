// src/pages/Register.jsx
import React, { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "pegawai",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Registrasi berhasil!");
        setForm({ username: "", password: "", role: "pegawai" });
      } else {
        setMessage(`❌ ${data.error || "Registrasi gagal"}`);
      }
    } catch (err) {
      setMessage("❌ Koneksi gagal");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-600">📝 Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
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
        <select
          name="role"
          className="w-full border border-gray-300 px-4 py-2 rounded"
          value={form.role}
          onChange={handleChange}
        >
          <option value="pegawai">Pegawai</option>
          <option value="admin">Admin</option>
        </select>
        {message && <p className="text-sm">{message}</p>}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
