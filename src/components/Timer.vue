<template>
  <div></div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import { useQuizStore } from '../stores/quiz'

export default {
  name: 'QuizTimer',
  setup() {
    const quizStore = useQuizStore()
    let timerInterval = null

    onMounted(() => {
      if (quizStore.quizStarted && !quizStore.quizCompleted) {
        timerInterval = setInterval(() => {
          if (quizStore.timeLeft > 0) {
            quizStore.decrementTime()
          } else {
            clearInterval(timerInterval)
          }
        }, 1000)
      }
    })

    onUnmounted(() => {
      if (timerInterval) {
        clearInterval(timerInterval)
      }
    })

    return {}
  },
}
</script>
