# Meeting Summarizer

A **MERN-based web application** that leverages AI to generate concise meeting summaries from transcripts. Users can paste or upload transcripts, provide custom instructions, edit the generated summary, and share it via email.

---

## 🚀 Features

* Upload or paste meeting transcripts.
* Generate AI-powered summaries.
* Edit summaries in a clean interface.
* Share results instantly via email.
* Simple MERN architecture (MongoDB, Express, React, Node).

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Backend:** Node.js + Express
* **Database:** MongoDB
* **AI Integration:** GROQ API
* **Email:** SMTP (Nodemailer)

---

## 📂 Project Structure

```
Meeting/
 ├── client/   # React frontend
 ├── server/   # Express backend
 └── README.md # Project documentation
```

---

## ⚙️ Installation

### 1. Clone the repo

```bash
git clone https://github.com/Sunikhilthakur/Meeting.git
cd Meeting
```

### 2. Setup backend

```bash
cd server
npm install
cp .env.example .env   # update with your values
npm run dev
```

### 3. Setup frontend

```bash
cd client
npm install
cp .env.example .env   # set API base URL (e.g. http://localhost:8080/api)
npm run dev
```

---

## 🌐 Deployment

https://github.com/Sunikhilthakur/Meeting

---

## 📧 Environment Variables

### Backend (`server/.env`)

* `MONGO_URI` – MongoDB connection string
* `GROQ_API_KEY` – AI summarization API key
* `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` – for email sending

### Frontend (`client/.env`)

* `VITE_API_BASE` – URL of your backend API

---

## 📜 License

This project is licensed under the **MIT License**.
