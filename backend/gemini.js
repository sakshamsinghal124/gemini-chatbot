import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function generateResponse(state) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const parts = [];

  if (state.documentText) {
    parts.push({ text: `DOCUMENT:\n${state.documentText}\n\n` });
  }

  if (state.image) {
    parts.push({ text: "IMAGE:\n" });
    parts.push({
      inlineData: {
        mimeType: state.image.mimetype,
        data: state.image.data,
      },
    });
    parts.push({ text: "\n\n" });
  }

  state.messages.forEach((m) => {
    parts.push({ text: `${m.role.toUpperCase()}: ${m.content}\n` });
  });

  const result = await model.generateContent(parts);
  return result.response.text();
}

export function resetState() {
  return {
    messages: [],
    documentText: "",
    image: null,
  };
}
