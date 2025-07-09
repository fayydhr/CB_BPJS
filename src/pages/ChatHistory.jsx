import React, { useEffect, useState } from "react";

function ChatHistory({ user }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/history?user_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => setHistory(data.history || []))
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">📜 Riwayat Chat Anda</h2>
      <div className="space-y-4">
        {history.map((chat, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              chat.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
            }`}
          >
            <p className="text-sm text-gray-600">{chat.role === "user" ? "👤 Anda" : "🤖 Bot"}</p>
            <p className="text-base">{chat.message}</p>
            <p className="text-xs text-gray-400 mt-1">{new Date(chat.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatHistory;
