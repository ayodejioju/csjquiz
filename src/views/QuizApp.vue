<template>
  <div class="min-h-screen bg-gradient-to-br">
    <!-- Start Screen -->
    <StartScreen v-if="!quizStore.quizStarted" />

    <!-- Results Screen -->
    <ResultsScreen v-else-if="quizStore.quizCompleted && quizStore.showResults" />
    <!-- Loading Screen -->
    <div v-else-if="quizStore.loading" class="flex items-center justify-center h-screen">
      <span class="text-xl text-gray-600">Loading quiz...</span>
    </div>
    <!-- Quiz Interface -->
    <QuizInterface v-else />
  </div>
</template>

<script>
import { useQuizStore } from '../stores/quiz'
import StartScreen from '../components/StartScreen.vue'
import QuizInterface from '../components/QuizInterface.vue'
import ResultsScreen from '../components/ResultsScreen.vue'

export default {
  name: 'QuizApp',
  components: {
    StartScreen,
    QuizInterface,
    ResultsScreen,
  },
  setup() {
    const quizStore = useQuizStore()
    return { quizStore }
  },
}
</script>
