import React, { useState } from "react";
import axios from "axios";

const PDFUpload = ({ user }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  if (user.role !== "admin") return null;

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/upload_pdf", formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Upload gagal");
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h4>📤 Upload SOP (PDF)</h4>
      <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
};

export default PDFUpload;
