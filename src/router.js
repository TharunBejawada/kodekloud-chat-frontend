import { createRouter, createWebHistory } from 'vue-router'
import UsernamePrompt from './components/UsernamePrompt.vue'
import TopicInput from './components/TopicInput.vue'
import GuideAndChat from './components/GuideAndChat.vue'

const routes = [
  {
    path: '/',
    name: 'UsernamePrompt',
    component: UsernamePrompt,
  },
  {
    path: '/topic',
    name: 'TopicInput',
    component: TopicInput,
  },
  {
    path: '/chat',
    name: 'GuideAndChat',
    component: GuideAndChat,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
