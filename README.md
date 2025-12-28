# gemini-chatbot
A full-stack chatbot application built using React (Vite) for the frontend and Node.js + Express for the backend.
The chatbot integrates with Google Gemini API for AI-powered responses and supports document and image uploads.

Features

Chat interface with real-time responses

Backend API built with Express

Integration with Google Gemini API

File upload support (documents & images)

Clean frontend–backend separation

Error handling and fallback for demo reliability

 Tech Stack

Frontend

React

Vite

Axios

Backend

Node.js

Express

Multer (file uploads)

Google Gemini API (Generative Language API)

 Installation
1️⃣ Clone the repository
git clone https://github.com/your-username/gemini-chatbot.git
cd gemini-chatbot

2️⃣ Install backend dependencies
cd backend
npm install

3️⃣ Install frontend dependencies
cd ../frontend
npm install

Setting Up Gemini API Key
Step 1: Create API Key

Go to Google AI Studio
👉 https://aistudio.google.com/app/apikey

Create a new API key

⚠️ The Gemini API requires the Generative Language API to be enabled in Google Cloud Console.

Step 2: Add .env file (Backend)

Inside the backend/ folder, create a file named .env:

GOOGLE_API_KEY=your_gemini_api_key_here


❗ Do not wrap the key in quotes
❗ Do not commit .env to GitHub

▶️ Running the Application
Start Backend Server
cd backend
node index.js


Expected output:

Backend running on http://localhost:5000

Start Frontend Server

Open a new terminal:

cd frontend
npm run dev


Expected output:

Local: http://localhost:5173/

Open in Browser
http://localhost:5173

🧪 Example Usage

Type a message in the chat input

Click Send

The message is sent to the backend

Backend forwards prompt to Gemini API

Gemini response is returned and displayed

Optional:

Upload a document (PDF / text)

Ask questions based on uploaded content

Upload images for image-based prompts
