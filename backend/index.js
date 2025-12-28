import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { extractText } from "./fileHandlers.js";
import { generateResponse, resetState } from "./gemini.js";

dotenv.config();
const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

let chatState = resetState();
app.post("/chat", async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message missing" });
    }

    chatState.messages.push({ role: "user", content: message });

    const reply = await generateResponse(chatState);

    chatState.messages.push({ role: "model", content: reply });

    res.json({ reply });
  } catch (err) {
    console.error("CHAT ROUTE ERROR:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/upload/document", upload.single("file"), async (req, res) => {
  chatState.documentText = await extractText(req.file);
  res.json({ message: "Document uploaded" });
});

app.post("/upload/image", upload.single("image"), (req, res) => {
  chatState.image = {
    data: req.file.buffer.toString("base64"),
    mimetype: req.file.mimetype,
  };
  res.json({ message: "Image uploaded" });
});

app.post("/reset", (req, res) => {
  chatState = resetState();
  res.json({ message: "New chat started" });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
