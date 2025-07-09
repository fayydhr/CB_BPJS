import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatPage from "./pages/ChatPage";
import ChatHistory from "./components/ChatHistory";
import PDFUploadPage from "./components/PDFUpload";
import AdminChatHistory from "./pages/AdminChatHistory";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setPage("login");
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <button onClick={() => setPage("login")}>🔓 Login</button>
        <button onClick={() => setPage("register")}>📝 Register</button>
        {page === "login" ? <Login onLogin={handleLogin} /> : <Register />}
      </div>
    );
  }

  return (
    <div>
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#f0f0f0" }}>
        <button onClick={() => setPage("chat")}>💬 Chat</button>
        <button onClick={() => setPage("history")}>📜 Riwayat</button>
        {user.role === "admin" && (
          <button onClick={() => setPage("upload")}>📤 Upload PDF</button>
        )}
        {user.role === "admin" && (
          <button onClick={() => setPage("adminHistory")}>📂 Semua Chat</button>
        )}
        <button onClick={handleLogout}>🚪 Logout</button>
      </nav>

      {page === "chat" && <ChatPage user={user} />}
      {page === "history" && <ChatHistory user={user} />}
      {page === "upload" && user.role === "admin" && <PDFUploadPage user={user} />}
      {page === "adminHistory" && user.role === "admin" && <AdminChatHistory user={user} />}
    </div>
  );
}

export default App;