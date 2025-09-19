<template>
  <div class="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
      <div class="mb-6">
        <img
          src="/images/logo.png"
          alt="Civil Service Quiz Logo"
          class="w-16 h-16 mx-auto mb-4 object-contain"
        />
        <h1 class="text-2xl font-bold text-black mb-2">Civil Service Numerical Test</h1>
        <p class="text-gray-600">Test your numerical reasoning skills for Civil Service roles</p>
      </div>

      <div class="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
        <div class="flex justify-between">
          <span class="text-gray-600">Questions:</span>
          <span class="font-semibold">{{ quizStore.questions.length }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Time Limit:</span>
          <span class="font-semibold">15 minutes</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Passing Score:</span>
          <span class="font-semibold">70%</span>
        </div>
      </div>

      <button
        @click="startQuiz"
        class="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
      >
        Start Quiz
      </button>
    </div>
  </div>
</template>

<script setup>
import { useQuizStore } from '../stores/quiz'
import { useRouter } from 'vue-router'

const quizStore = useQuizStore()
const router = useRouter()

const startQuiz = () => {
  quizStore.startQuiz()
  router.push({ name: 'Quiz' }) // Assumes you have a route named 'Quiz'
}
</script>

<style scoped>
/* Add component-specific styles here if needed */
</style>
