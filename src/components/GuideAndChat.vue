<template>
  <div class="guide-chat-wrapper">
    <GuidePanel :username="username" :topic="topic" />
    <ChatPanel :username="username" :topic="topic" />
  </div>
</template>

<script setup>
import GuidePanel from './GuidePanel.vue'
import ChatPanel from './ChatPanel.vue'

const props = defineProps(['username', 'topic'])
</script>

<style scoped>
.guide-chat-wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to bottom right, #f9fbfc, #e3f2fd);
  overflow: hidden;
  gap: 0.5rem;
  padding: 0.75rem;
  box-sizing: border-box;
}
</style>
