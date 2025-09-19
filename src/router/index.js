import { createRouter, createWebHistory } from 'vue-router'
import QuizApp from '../views/QuizApp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'quiz',
      component: QuizApp
    }
  ],
})

export default router
