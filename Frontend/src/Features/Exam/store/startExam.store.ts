// import { create } from 'zustand'
// import { devtools, persist } from 'zustand/middleware'

// // TypeScript interfaces based on your API response
// export interface Option {
//   index: number
//   text: string
// }

// export interface Question {
//   questionNumber: number
//   questionId: string
//   questionText: string
//   questionType: "single_choice" | "true_false" | "multiple_choice"
//   points: number
//   timeLimit: number | null
//   options: Option[]
// }

// export interface Quiz {
//   examId: string
//   title: string
//   description: string
//   duration: number // in minutes
//   totalQuestions: number
//   totalMarks: number
//   totalPoints: number
//   questions: Question[]
//   startTime: string // ISO date string
// }

// // User answers interface
// export interface UserAnswer {
//   questionId: string
//   questionNumber: number
//   selectedOption: number | number[] // single index or multiple indices
//   answeredAt: string // ISO date string
//   timeSpent: number // in seconds
// }

// // Store interface
// interface StartExamStore {
//   // Quiz data
//   quiz: Quiz | null
  
//   // Current exam session state
//   currentQuestionIndex: number
//   userAnswers: UserAnswer[]
//   isExamStarted: boolean
//   isExamSubmitted: boolean
//   timeRemaining: number // in seconds
  
//   // Loading and error states
//   isLoading: boolean
//   error: string | null
  
//   // Actions
//   setQuiz: (quiz: Quiz) => void
//   startExam: () => void
//   nextQuestion: () => void
//   previousQuestion: () => void
//   goToQuestion: (index: number) => void
  
//   // Answer management
//   setAnswer: (questionId: string, questionNumber: number, selectedOption: number | number[]) => void
//   getAnswer: (questionId: string) => UserAnswer | undefined
  
//   // Timer management
//   setTimeRemaining: (time: number) => void
//   decrementTime: () => void
  
//   // Exam completion
//   submitExam: () => void
  
//   // Reset and clear
//   resetExam: () => void
//   clearStore: () => void
  
//   // Loading and error management
//   setLoading: (loading: boolean) => void
//   setError: (error: string | null) => void
// }

// // Initial state
// const initialState = {
//   quiz: null,
//   currentQuestionIndex: 0,
//   userAnswers: [],
//   isExamStarted: false,
//   isExamSubmitted: false,
//   timeRemaining: 0,
//   isLoading: false,
//   error: null,
// }

// // Create the store
// export const useStartExamStore = create<StartExamStore>()(
//   devtools(
//     persist(
//       (set, get) => ({
//         ...initialState,

//         // Set quiz data from API response
//         setQuiz: (quiz: Quiz) => {
//           const durationInSeconds = quiz.duration * 60 // Convert minutes to seconds
//           set({
//             quiz,
//             timeRemaining: durationInSeconds,
//             currentQuestionIndex: 0,
//             userAnswers: [],
//             isExamStarted: false,
//             isExamSubmitted: false,
//             error: null,
//           })
//         },

//         // Start the exam
//         startExam: () => {
//           const { quiz } = get()
//           if (quiz) {
//             set({
//               isExamStarted: true,
//               timeRemaining: quiz.duration * 60, // Reset timer
//               currentQuestionIndex: 0,
//             })
//           }
//         },

//         // Navigation
//         nextQuestion: () => {
//           const { currentQuestionIndex, quiz } = get()
//           if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
//             set({ currentQuestionIndex: currentQuestionIndex + 1 })
//           }
//         },

//         previousQuestion: () => {
//           const { currentQuestionIndex } = get()
//           if (currentQuestionIndex > 0) {
//             set({ currentQuestionIndex: currentQuestionIndex - 1 })
//           }
//         },

//         goToQuestion: (index: number) => {
//           const { quiz } = get()
//           if (quiz && index >= 0 && index < quiz.questions.length) {
//             set({ currentQuestionIndex: index })
//           }
//         },

//         // Answer management
//         setAnswer: (questionId: string, questionNumber: number, selectedOption: number | number[]) => {
//           const { userAnswers } = get()
//           const existingAnswerIndex = userAnswers.findIndex(
//             (answer) => answer.questionId === questionId
//           )

//           const newAnswer: UserAnswer = {
//             questionId,
//             questionNumber,
//             selectedOption,
//             answeredAt: new Date().toISOString(),
//             timeSpent: 0, // You can calculate this based on question start time
//           }

//           if (existingAnswerIndex !== -1) {
//             // Update existing answer
//             const updatedAnswers = [...userAnswers]
//             updatedAnswers[existingAnswerIndex] = newAnswer
//             set({ userAnswers: updatedAnswers })
//           } else {
//             // Add new answer
//             set({ userAnswers: [...userAnswers, newAnswer] })
//           }
//         },

//         getAnswer: (questionId: string) => {
//           const { userAnswers } = get()
//           return userAnswers.find((answer) => answer.questionId === questionId)
//         },

//         // Timer management - FIXED: Remove the auto-submit logic to prevent infinite loops
//         setTimeRemaining: (time: number) => {
//           set({ timeRemaining: time })
//         },

//         decrementTime: () => {
//           const { timeRemaining, isExamStarted } = get()
//           if (isExamStarted && timeRemaining > 0) {
//             set({ timeRemaining: timeRemaining - 1 })
            
//             // Check if time is up after decrementing
//             if (timeRemaining - 1 <= 0) {
//               console.log("Time's up! Auto-submitting exam...")
//               get().submitExam()
//             }
//           }
//         },

//         // Exam completion
//         submitExam: () => {
//           set({
//             isExamSubmitted: true,
//             isExamStarted: false,
//           })
//           // Here you would typically call an API to submit the answers
//           console.log('Exam submitted with answers:', get().userAnswers)
//         },

//         // Reset exam (for retaking)
//         resetExam: () => {
//           const { quiz } = get()
//           if (quiz) {
//             set({
//               currentQuestionIndex: 0,
//               userAnswers: [],
//               isExamStarted: false,
//               isExamSubmitted: false,
//               timeRemaining: quiz.duration * 60,
//               error: null,
//             })
//           }
//         },

//         // Clear entire store
//         clearStore: () => {
//           set(initialState)
//         },

//         // Loading and error management
//         setLoading: (loading: boolean) => {
//           set({ isLoading: loading })
//         },

//         setError: (error: string | null) => {
//           set({ error })
//         },
//       }),
//       {
//         name: 'start-exam-storage',
//         partialize: (state) => ({
//           quiz: state.quiz,
//           userAnswers: state.userAnswers,
//           currentQuestionIndex: state.currentQuestionIndex,
//           isExamStarted: state.isExamStarted,
//           isExamSubmitted: state.isExamSubmitted,
//           timeRemaining: state.timeRemaining,
//         }),
//       }
//     ),
//     { name: 'StartExamStore' }
//   )
// )

// // Selector hooks for better performance
// export const useQuiz = () => useStartExamStore((state) => state.quiz)
// export const useCurrentQuestion = () => {
//   const quiz = useStartExamStore((state) => state.quiz)
//   const currentQuestionIndex = useStartExamStore((state) => state.currentQuestionIndex)
  
//   return quiz?.questions[currentQuestionIndex] || null
// }

// export const useExamProgress = () => {
//   const quiz = useStartExamStore((state) => state.quiz)
//   const currentQuestionIndex = useStartExamStore((state) => state.currentQuestionIndex)
//   const userAnswers = useStartExamStore((state) => state.userAnswers)
  
//   const totalQuestions = quiz?.totalQuestions || 0
//   const currentQuestion = currentQuestionIndex + 1
//   const answeredQuestions = userAnswers.length
//   const progressPercentage = totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0
  
//   return {
//     totalQuestions,
//     currentQuestion,
//     answeredQuestions,
//     progressPercentage,
//   }
// }

// export const useTimeRemaining = () => {
//   const timeRemaining = useStartExamStore((state) => state.timeRemaining)
  
//   const minutes = Math.floor(timeRemaining / 60)
//   const seconds = timeRemaining % 60
//   const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`
  
//   return {
//     timeRemaining,
//     minutes,
//     seconds,
//     formattedTime,
//     isTimeUp: timeRemaining <= 0,
//   }
// }

// // AFTER (stable references)
// export const nextQuestion = useStartExamStore((state) => state.nextQuestion)
// export const previousQuestion = useStartExamStore((state) => state.previousQuestion)
// // ... etc

// export default useStartExamStore
