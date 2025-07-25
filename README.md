# 💬 KodeKloud AI Chatbot - Frontend

A Vue.js-based chat interface for an AI assistant that answers topic-specific technical questions. Works with a LangGraph + LangChain + Neo4j-powered backend.

---

## 🧠 Architecture

```
Vue 3 (Options API)
├── UsernamePrompt.vue    ← Username input screen
├── TopicSelector.vue     ← Topic selection
├── ChatPanel.vue         ← Two-way chat with OpenAI-backed answers
└── App.vue               ← Container and session state
```

- Uses plain CSS (no Tailwind)
- Interacts with backend via FastAPI
- Remembers chat history using session ID (`username_topic`)

---

## 🚀 How to Run the Frontend Locally

### 🔧 Prerequisites
- Node.js 18+
- npm

### 🛠️ Install & Run

```bash
# Clone
git clone https://github.com/TharunBejawada/kodekloud-chat-frontend.git
cd kodekloud-chat-frontend

# Install dependencies
npm install

# Run the app
npm run dev
```

> Frontend will be available at: `http://localhost:5173`

Make sure the backend is running on `http://localhost:8000`.

---

## 🔗 API Endpoints Used

- `GET /guide-history?user_id=&topic=`
- `POST /generate-guide`
- `POST /chat`
- `GET /chat-history`

---

## 📷 UI Preview

_(Optional: Add a screenshot/gif of your chat UI here)_

---

## 🧑‍💻 Author

Tharun Bejawada
