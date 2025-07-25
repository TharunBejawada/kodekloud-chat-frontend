<template>
  <div class="guide-panel">
    <h2 class="panel-heading">📘 Guide for "{{ topic }}"</h2>

    <div v-if="loading" class="status-text">⏳ Loading guide...</div>
    <div v-else-if="error" class="error-text">❌ {{ error }}</div>

    <div v-else class="guide-list">
      <div
        v-for="(item, index) in guide"
        :key="index"
        class="guide-card animate-fade-in"
      >
        <h3 class="guide-title">{{ item.title }}</h3>
        <p class="guide-content">{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['username', 'topic'],
  data() {
    return {
      guide: [],
      loading: true,
      error: null
    }
  },
  async mounted() {
    const cacheKey = `guide_${this.username}_${this.topic}`

    // Check if cached guide exists
    const cached = localStorage.getItem(cacheKey)
    if (cached) {
      try {
        this.guide = JSON.parse(cached)
        this.loading = false
        return
      } catch (e) {
        // If corrupted, fallback to fetch
        console.warn('Invalid cached guide, refetching...')
      }
    }

    // Otherwise, fetch from backend
    try {
      const response = await fetch('http://localhost:8000/generate-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: this.username,
          topic: this.topic,
          user_input: `Explain ${this.topic}`
        })
      })

      const data = await response.json()
      if (response.ok) {
        this.guide = data.guide || []
        localStorage.setItem(cacheKey, JSON.stringify(this.guide)) // ✅ Cache it
      } else {
        this.error = data.detail || 'Failed to fetch guide.'
      }
    } catch (err) {
      this.error = 'Server error while fetching guide.'
    } finally {
      this.loading = false
    }
  }
}
</script>


<style scoped>
.guide-panel {
  width: 70%;
  padding: 2rem;
  overflow-y: auto;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  animation: fade-in 0.4s ease-in;
}

.panel-heading {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.status-text {
  font-size: 1.1rem;
  color: #666;
}

.error-text {
  color: #e74c3c;
  font-weight: bold;
}

.guide-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.guide-card {
  background-color: #f0f4ff;
  border-left: 6px solid #4f46e5;
  padding: 1.25rem;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
}

.guide-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.guide-content {
  color: #444;
  line-height: 1.6;
}

/* Simple fade-in animation */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-in-out;
}
</style>
