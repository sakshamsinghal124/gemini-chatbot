import { useState } from "react";
import API from "./api";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;
    const res = await API.post("/chat", { message: input });
    setMessages([...messages, { user: input }, { bot: res.data.reply }]);
    setInput("");
  };

  const uploadDoc = async (e) => {
    const form = new FormData();
    form.append("file", e.target.files[0]);
    await API.post("/upload/document", form);
    alert("Document uploaded");
  };

  const uploadImage = async (e) => {
    const form = new FormData();
    form.append("image", e.target.files[0]);
    await API.post("/upload/image", form);
    alert("Image uploaded");
  };

  const resetChat = async () => {
    await API.post("/reset");
    setMessages([]);
  };

  return (
    <div className="chat">
      <h2>Gemini Chatbot</h2>

      <div className="messages">
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.user ? "You" : "Bot"}:</b> {m.user || m.bot}
          </p>
        ))}
      </div>

      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>

      <div className="uploads">
        <input type="file" accept=".pdf,.txt" onChange={uploadDoc} />
        <input type="file" accept="image/*" onChange={uploadImage} />
      </div>

      <button onClick={resetChat}>New Chat</button>
    </div>
  );
}
