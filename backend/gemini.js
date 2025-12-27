import dotenv from "dotenv";
dotenv.config();

import fetch from "node-fetch";

const API_KEY = process.env.GOOGLE_API_KEY;

export async function generateResponse(state) {
  let prompt = "";

  if (state.documentText) {
    prompt += `DOCUMENT:\n${state.documentText}\n\n`;
  }

  state.messages.forEach((m) => {
    prompt += `${m.role.toUpperCase()}: ${m.content}\n`;
  });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Gemini REST error:", data);
    throw new Error("Gemini API failed");
  }

  return data.candidates[0].content.parts[0].text;
}

export function resetState() {
  return {
    messages: [],
    documentText: "",
    image: null,
  };
}
