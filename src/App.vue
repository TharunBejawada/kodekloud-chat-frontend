<!-- src/App.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center">
    <component
      :is="currentComponent"
      :username="username"
      :onUsernameEntered="handleUsername"
      :onTopicEntered="handleTopic"
      :topic="topic"
    />
  </div>
</template>

<script>
import UsernamePrompt from './components/UsernamePrompt.vue'
import TopicInput from './components/TopicInput.vue'
import GuideAndChat from './components/GuideAndChat.vue'

export default {
  components: {
    UsernamePrompt,
    TopicInput,
    GuideAndChat
  },
  data() {
    return {
      currentComponent: 'UsernamePrompt',
      username: '',
      topic: ''
    }
  },
  created() {
    const savedUsername = localStorage.getItem('username')
    const savedTopic = localStorage.getItem('topic')

    if (savedUsername && savedTopic) {
      this.username = savedUsername
      this.topic = savedTopic
      this.currentComponent = 'GuideAndChat'
    } else if (savedUsername) {
      this.username = savedUsername
      this.currentComponent = 'TopicInput'
    }
  },
  methods: {
    handleUsername(name) {
      this.username = name
      localStorage.setItem('username', name)
      this.currentComponent = 'TopicInput'
    },
    handleTopic(topic) {
      this.topic = topic
      localStorage.setItem('topic', topic)
      this.currentComponent = 'GuideAndChat'
    }
  }
}
</script>

