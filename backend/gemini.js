import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function generateResponse(state) {
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
  });

  let prompt = "";

  if (state.documentText) {
    prompt += `DOCUMENT:\n${state.documentText}\n\n`;
  }

  state.messages.forEach((m) => {
    prompt += `${m.role.toUpperCase()}: ${m.content}\n`;
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
}

export function resetState() {
  return {
    messages: [],
    documentText: "",
    image: null,
  };
}
