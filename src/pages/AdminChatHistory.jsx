import React, { useEffect, useState } from "react";

function AdminChatHistory({ user }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user.role !== "admin") return;

    fetch(`http://localhost:5000/admin/history?role=${user.role}`)
      .then((res) => res.json())
      .then((data) => setHistory(data.history || []))
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-red-700">🧑‍💼 Riwayat Semua Chat (Admin)</h2>
      <div className="space-y-4">
        {history.map((chat, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg ${
              chat.role === "user" ? "bg-blue-50" : "bg-gray-50"
            }`}
          >
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>🧾 User ID: {chat.user_id}</span>
              <span>{new Date(chat.timestamp).toLocaleString()}</span>
            </div>
            <p className="text-sm font-semibold">{chat.role === "user" ? "👤 User" : "🤖 Bot"}</p>
            <p>{chat.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminChatHistory;
