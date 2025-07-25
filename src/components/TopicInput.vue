<template>
  <div class="container">
    <div class="card">
      <h2>👋 Hey {{ username }}!</h2>
      <p>What topic are you curious about today?</p>

      <input
        v-model="localTopic"
        type="text"
        placeholder="E.g., Docker, Kubernetes..."
        @keyup.enter="submit"
      />

      <button @click="submit">
        🔍 Search Guide
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps(['username', 'onTopicEntered'])
const localTopic = ref('')

const submit = () => {
  if (localTopic.value.trim()) {
    props.onTopicEntered(localTopic.value.trim())
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #fffde7, #e3f2fd);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  padding: 2.5rem 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
  width: 90%;
  max-width: 420px;
  animation: fade-in 0.8s ease-out both;
}

h2 {
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.2rem;
}

input {
  width: 92%;
  padding: 0.75rem 1rem;
  border: 2px solid #ccc;
  border-radius: 1rem;
  font-size: 1rem;
  transition: border-color 0.3s;
  margin-bottom: 1.2rem;
}

input:focus {
  border-color: #42a5f5;
  outline: none;
}

button {
  padding: 0.7rem 1.5rem;
  background-color: #42a5f5;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #1e88e5;
  transform: scale(1.03);
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
