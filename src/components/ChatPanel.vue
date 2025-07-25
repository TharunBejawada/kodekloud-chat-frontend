<template>
  <div class="chat-panel">
    <h2 class="chat-heading">💬 Ask about "{{ topic }}"</h2>

    <div ref="scrollContainer" class="chat-history">
      <!-- Greeting -->
      <div v-if="messages.length === 0 && !loading" class="chat-bubble ai greeting">
        Hi {{ username }}, feel free to ask me anything about "{{ topic }}".
      </div>

      <!-- History -->
      <div
        v-for="(msg, idx) in messages"
        :key="idx"
        :class="msg.role === 'user' ? 'chat-bubble user' : 'chat-bubble ai'"
      >
        {{ msg.content }}
      </div>

      <!-- Loading Typing Dots -->
      <div v-if="loading" class="chat-bubble ai loading">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>

    <!-- Input Bar -->
    <form @submit.prevent="sendMessage" class="chat-input">
      <input
        v-model="userInput"
        type="text"
        placeholder="Ask a question..."
        class="input-box"
        :disabled="loading"
      />
      <button
        type="submit"
        class="send-button"
        :disabled="!userInput.trim() || loading"
      >
        Send
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['username', 'topic'],
  data() {
    return {
      userInput: '',
      messages: [],
      loading: false
    }
  },
  async mounted() {
    try {
      const response = await fetch(`http://localhost:8000/chat-history?user_id=${this.username}&topic=${this.topic}`)
      const data = await response.json()
      if (data.messages) {
        this.messages = data.messages
      }
    } catch (err) {
      console.error('Failed to load chat history', err)
    }
    this.scrollToBottom()
  },
  methods: {
    async sendMessage() {
      if (!this.userInput.trim()) return

      const userMsg = { role: 'user', content: this.userInput }
      this.messages.push(userMsg)
      const currentInput = this.userInput
      this.userInput = ''
      this.loading = true
      this.scrollToBottom()

      try {
        const response = await fetch('http://localhost:8000/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: this.username,
            topic: this.topic,
            user_input: currentInput
          })
        })

        const data = await response.json()
        this.messages.push({
          role: 'assistant',
          content: data.response || 'No response.'
        })
      } catch (err) {
        this.messages.push({
          role: 'assistant',
          content: 'Server error.'
        })
      } finally {
        this.loading = false
        this.scrollToBottom()
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const el = this.$refs.scrollContainer
        if (el) el.scrollTop = el.scrollHeight
      })
    }
  }
}
</script>

<style scoped>
.chat-panel {
  width: 30%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background-color: #f9fafb;
  border-left: 1px solid #e5e7eb;
  border-radius: 12px;
}

.chat-heading {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
}

.chat-history {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-right: 4px;
  scrollbar-width: thin;
}

.chat-bubble {
  max-width: 75%;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
}

.chat-bubble.user {
  align-self: flex-end;
  background-color: #4f46e5;
  color: #fff;
  border-bottom-right-radius: 0;
}

.chat-bubble.ai {
  align-self: flex-start;
  background-color: #e2e8f0;
  color: #111827;
  border-bottom-left-radius: 0;
}

.chat-bubble.greeting {
  font-style: italic;
  background-color: #dbeafe;
  color: #1e3a8a;
}

.chat-bubble.loading {
  display: flex;
  gap: 6px;
  padding: 0.5rem;
  justify-content: flex-start;
  align-items: center;
}

.dot {
  width: 8px;
  height: 8px;
  background: #6b7280;
  border-radius: 50%;
  animation: blink 1.4s infinite both;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}
.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blink {
  0%, 80%, 100% {
    opacity: 0;
    transform: scale(0.8);
  }
  40% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.chat-input {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.input-box {
  flex: 1;
  padding: 0.6rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  outline: none;
  font-size: 1rem;
}

.send-button {
  background-color: #4f46e5;
  color: white;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in;
}

.send-button:hover {
  background-color: #4338ca;
}

.send-button:disabled {
  background-color: #a5b4fc;
  cursor: not-allowed;
}
</style>
