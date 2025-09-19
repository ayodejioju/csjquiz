<template>
  <div class="min-h-screen bg-gradient-to-br p-4">
    <div class="max-w-2xl mx-auto">
      <!-- Header with timer and progress -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <svg
              class="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span
              :class="[
                'font-mono text-lg',
                quizStore.timeLeft <= 60 ? 'text-red-600' : 'text-green-600',
              ]"
            >
              {{ quizStore.formatTime }}
            </span>
          </div>
          <div class="text-gray-600">
            Question {{ quizStore.currentQuestion + 1 }} of {{ quizStore.questions.length }}
          </div>
        </div>

        <!-- Progress bar -->
        <ProgressBar />
      </div>

      <!-- Question card -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 class="text-xl font-semibold text-black mb-6">
          {{ currentQuestion.question }}
        </h2>

        <div class="space-y-3">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            @click="selectAnswer(index)"
            :class="[
              'w-full text-left p-4 rounded-lg border-2 transition-colors',
              isSelected(index)
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 hover:border-gray-300',
            ]"
          >
            <div class="flex items-center gap-3">
              <div
                :class="[
                  'w-4 h-4 rounded-full border-2',
                  isSelected(index) ? 'border-green-600 bg-green-600' : 'border-gray-300',
                ]"
              >
                <div
                  v-if="isSelected(index)"
                  class="w-full h-full rounded-full bg-white scale-50"
                ></div>
              </div>
              <span class="text-gray-700">{{ option }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Navigation buttons -->
      <div class="flex justify-between">
        <button
          @click="previousQuestion"
          :disabled="quizStore.currentQuestion === 0"
          class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
        >
          Previous
        </button>

        <button
          @click="nextQuestion"
          :disabled="!hasAnswered"
          class="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
        >
          {{ isLastQuestion ? 'Finish Quiz' : 'Next' }}
        </button>
      </div>
    </div>

    <!-- Timer Component -->
    <Timer />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useQuizStore } from '../stores/quiz'
import ProgressBar from './ProgressBar.vue'
import Timer from './Timer.vue'

export default {
  name: 'QuizInterface',
  components: {
    ProgressBar,
    Timer,
  },
  setup() {
    const quizStore = useQuizStore()

    const currentQuestion = computed(() => quizStore.questions[quizStore.currentQuestion] || {})

    const isLastQuestion = computed(
      () => quizStore.currentQuestion === quizStore.questions.length - 1,
    )

    const hasAnswered = computed(
      () => quizStore.selectedAnswers[quizStore.currentQuestion] !== undefined,
    )

    const isSelected = (index) => {
      return quizStore.selectedAnswers[quizStore.currentQuestion] === index
    }

    const selectAnswer = (answerIndex) => {
      quizStore.selectAnswer(quizStore.currentQuestion, answerIndex)
    }

    const nextQuestion = () => {
      if (isLastQuestion.value) {
        quizStore.completeQuiz()
      } else {
        quizStore.nextQuestion()
      }
    }

    const previousQuestion = () => {
      quizStore.previousQuestion()
    }

    return {
      quizStore,
      currentQuestion,
      isLastQuestion,
      hasAnswered,
      isSelected,
      selectAnswer,
      nextQuestion,
      previousQuestion,
    }
  },
}
</script>
