import { defineStore } from 'pinia'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    questions: [
      {
        id: 1,
        question:
          'A government department has 235 total members voting. If Candidate A received 180 votes in 2005 and 65 votes in 2012, what is the percentage difference in votes for Candidate A between these years?',
        options: ['49%', '45%', '52%', '38%'],
        correct: 0,
      },
      {
        id: 2,
        question:
          'A region distributed USB memory sticks in 2016 (713) and 2017 (898). What was the net increase?',
        options: ['175', '185', '195', '165'],
        correct: 1,
      },
      {
        id: 3,
        question:
          'A £2,500 loan has tiered interest: first £500 at 0%, next £1,500 at 20%, remaining £500 at 40%. If repaid over 24 equal payments, what is the monthly payment?',
        options: ['£115', '£125', '£135', '£105'],
        correct: 1,
      },
      {
        id: 4,
        question:
          'Jane starts work on 17th July in a leave year running 1st April to 31st March. With 25 days annual entitlement, how many pro-rata days is she entitled to (rounded up to nearest 0.5 day)?',
        options: ['17.5 days', '18.0 days', '18.5 days', '19.0 days'],
        correct: 1,
      },
      {
        id: 5,
        question:
          'Tariq invests £25,000 in a savings bond with 5% annual compound interest for 5 years. What is the total percentage increase in value?',
        options: ['25.0%', '26.8%', '27.6%', '28.2%'],
        correct: 2,
      },
      {
        id: 6,
        question:
          'A £3,000 loan uses tiered interest: first £500 at 0%, next £1,500 at 20%, remaining £1,000 at 40%. What is the total repayment amount?',
        options: ['£3,600', '£3,700', '£3,800', '£3,900'],
        correct: 1,
      },
      {
        id: 7,
        question:
          'If 120 litres of juice A were used for Tropical Surprise (ratio A:B:C = 2:3:3), how many litres of Morning Delight (ratio A:B:C = 3:1:5) can be made with the same amount of juice A?',
        options: ['320 litres', '340 litres', '360 litres', '380 litres'],
        correct: 2,
      },
      {
        id: 8,
        question:
          'A train journey from Nantbridge to Andertown covers 209 miles total. With an off-peak rate of £0.47 per mile and journey time of 161.7 minutes, what is the price per minute?',
        options: ['59p', '61p', '63p', '65p'],
        correct: 2,
      },
      {
        id: 9,
        question:
          'Region A has 2,946 people under 5 years old out of 45,234 total population. What percentage is this (to 2 decimal places)?',
        options: ['6.49%', '6.51%', '6.53%', '6.55%'],
        correct: 1,
      },
      {
        id: 10,
        question:
          "If there's a 10% chance of snow tomorrow and 15% chance the day after (independent events), what's the probability it snows both days?",
        options: ['1.5%', '2.0%', '2.5%', '12.5%'],
        correct: 0,
      },
    ],
    currentQuestion: 0,
    selectedAnswers: {},
    timeLeft: 900, // 15 minutes for 10 questions
    quizStarted: false,
    quizCompleted: false,
    showResults: false,
  }),

  getters: {
    formatTime: (state) => {
      const minutes = Math.floor(state.timeLeft / 60)
      const seconds = state.timeLeft % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
    progress: (state) => ((state.currentQuestion + 1) / state.questions.length) * 100,
    results: (state) => {
      let correct = 0
      state.questions.forEach((question, index) => {
        if (state.selectedAnswers[index] === question.correct) {
          correct++
        }
      })
      return {
        correct,
        total: state.questions.length,
        percentage: Math.round((correct / state.questions.length) * 100),
      }
    },
  },

  actions: {
    startQuiz() {
      this.quizStarted = true
    },

    selectAnswer(questionIndex, answerIndex) {
      this.selectedAnswers[questionIndex] = answerIndex
    },

    nextQuestion() {
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++
      } else {
        this.quizCompleted = true
      }
    },

    previousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--
      }
    },

    resetQuiz() {
      this.currentQuestion = 0
      this.selectedAnswers = {}
      this.timeLeft = 900
      this.quizStarted = false
      this.quizCompleted = false
      this.showResults = false
    },

    completeQuiz() {
      this.quizCompleted = true
      this.showResults = true
    },

    decrementTime() {
      if (this.timeLeft > 0) {
        this.timeLeft--
      } else {
        this.completeQuiz()
      }
    },
  },
})
