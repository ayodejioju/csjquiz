<template>
  <div class="w-full bg-gray-200 rounded-full h-2">
    <div
      class="bg-green-600 h-2 rounded-full transition-all duration-300"
      :style="{ width: `${quizStore.progress}%` }"
    ></div>
  </div>
</template>

<script>
import { useQuizStore } from '../stores/quiz'

export default {
  name: 'ProgressBar',
  setup() {
    const quizStore = useQuizStore()

    return {
      quizStore,
    }
  },
}
</script>

<style scoped>
.progress-bar {
  width: 100%;
  height: 20px;
  background: #eee;
  border-radius: 10px;
  overflow: hidden;
}
.progress-bar__fill {
  height: 100%;
  background: #42b983;
  transition: width 0.3s;
}
</style>
