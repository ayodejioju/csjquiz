<template>
  <div class="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
      <div class="mb-6">
        <div
          :class="[
            'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4',
            passed ? 'bg-green-600' : 'bg-red-600',
          ]"
        >
          <svg
            v-if="passed"
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <svg
            v-else
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-black mb-2">
          {{ passed ? 'Congratulations!' : 'Quiz Complete' }}
        </h1>
        <p class="text-gray-600">
          {{
            passed
              ? 'You passed the Civil Service quiz!'
              : 'You can try again to improve your score.'
          }}
        </p>
      </div>

      <div class="bg-gray-50 rounded-lg p-6 mb-6 space-y-4">
        <div class="text-center">
          <div :class="['text-4xl font-bold mb-2', passed ? 'text-green-600' : 'text-red-600']">
            {{ quizStore.results.percentage }}%
          </div>
          <div class="text-gray-600">
            {{ quizStore.results.correct }} out of {{ quizStore.results.total }} correct
          </div>
        </div>

        <div class="space-y-2">
          <div
            v-for="(question, index) in quizStore.questions"
            :key="index"
            class="flex items-center justify-between text-sm"
          >
            <span>Question {{ index + 1 }}</span>
            <svg
              v-if="isCorrect(index)"
              class="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <svg
              v-else
              class="w-4 h-4 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <button
        @click="resetQuiz"
        class="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
        Try Again
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useQuizStore } from '../stores/quiz'

export default {
  name: 'ResultsScreen',
  setup() {
    const quizStore = useQuizStore()

    const passed = computed(() => quizStore.results.percentage >= 70)

    const isCorrect = (questionIndex) => {
      return quizStore.selectedAnswers[questionIndex] === quizStore.questions[questionIndex].correct
    }

    const resetQuiz = () => {
      quizStore.resetQuiz()
    }

    return {
      quizStore,
      passed,
      isCorrect,
      resetQuiz,
    }
  },
}
</script>
