import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ChatHistory from "../components/ChatHistory";

const ChatPage = () => {
  const [mode, setMode] = useState("sql");
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMsg = { sender: "user", content: message };
    setChatLog((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        command: `/${mode} ${message}`,
      });
      const botMsg = { sender: "bot", content: res.data.response };
      setChatLog((prev) => [...prev, botMsg]);
    } catch (err) {
      const errMsg = { sender: "bot", content: `❌ ${err.message}` };
      setChatLog((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-500 flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-3xl h-[85vh] bg-white shadow-xl rounded-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-5 relative">
          <div className="absolute top-5 right-5 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <h1 className="text-xl font-bold">🏥 BPJS Chatbot</h1>
          <p className="text-sm text-white/90">Asisten Virtual untuk Informasi BPJS</p>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-3">
          {chatLog.length === 0 && (
            <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 text-sm text-blue-900">
              <h4 className="font-semibold mb-2">Selamat datang di BPJS Chatbot 🎉</h4>
              <p>Saya dapat membantu Anda dengan:</p>
              <ul className="list-disc ml-5">
                <li><strong>Database Query:</strong> Cari data user, keluhan, rujukan medis</li>
                <li><strong>Dokumen SOP:</strong> Informasi dari dokumen prosedur BPJS</li>
              </ul>
              <p className="mt-2">Pilih mode dan ajukan pertanyaan Anda!</p>
            </div>
          )}

          {chatLog.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start gap-2 max-w-[70%]`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                    msg.sender === "user" ? "bg-gradient-to-r from-indigo-400 to-purple-500" : "bg-blue-600"
                  }`}
                >
                  {msg.sender === "user" ? "👤" : "🤖"}
                </div>
                <div
                  className={`p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-br-sm"
                      : "bg-white text-gray-800 border rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <span>🤖 Bot sedang mengetik...</span>
              <span className="animate-pulse">...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Mode selector & input */}
        <div className="p-4 bg-white border-t">
          <div className="flex gap-2 mb-3 flex-wrap">
            <button
              className={`px-4 py-1 border-2 text-sm rounded-full ${
                mode === "sql"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-blue-600 border-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setMode("sql")}
            >
              🗃️ Database Query
            </button>
            <button
              className={`px-4 py-1 border-2 text-sm rounded-full ${
                mode === "pdf"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-blue-600 border-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setMode("pdf")}
            >
              📄 Dokumen SOP
            </button>
          </div>

          <div className="flex gap-3 items-center">
            <input
              type="text"
              placeholder={
                mode === "sql"
                  ? "Contoh: Tampilkan data user dengan NIK 1234567890123456"
                  : "Contoh: Bagaimana cara mengajukan klaim BPJS?"
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-blue-500"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-3 rounded-full disabled:opacity-50"
            >
              ➤
            </button>
          </div>
        </div>
      </div>

      {/* Chat history below chatbox */}
      <div className="w-full max-w-3xl mt-6">
        <ChatHistory />
      </div>
    </div>
  );
};

export default ChatPage;
