<template>
  <div class="container">
    <div class="card">
      <h1>Welcome to KodeKloud Chat</h1>
      <p>Enter your username to begin</p>
      <input
        v-model="username"
        @keyup.enter="submit"
        type="text"
        placeholder="Your cool name..."
      />
      <button @click="submit">Start Chatting 🚀</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onUsernameEntered: Function
  },
  data() {
    return {
      username: ''
    }
  },
  methods: {
    submit() {
      if (!this.username.trim()) {
        alert("Username can't be empty 😅")
        return
      }
      this.onUsernameEntered(this.username)
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #e0f7fa, #ffffff);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  padding: 2.5rem 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 90%;
  max-width: 500px;
  animation: fade-in 0.8s ease-out both;
}

h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
}

input {
  width: 92%;
  padding: 0.75rem 1rem;
  border: 2px solid #ccc;
  border-radius: 1rem;
  font-size: 1rem;
  transition: border-color 0.3s;
  margin-bottom: 1rem;
}

input:focus {
  border-color: #29b6f6;
  outline: none;
}

button {
  padding: 0.7rem 1.5rem;
  background-color: #29b6f6;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #039be5;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
