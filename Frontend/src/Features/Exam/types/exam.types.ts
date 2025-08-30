export interface Exam {
  _id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  totalMarks: number;
  passingMarks: number;
  createdAt: string; // ISO date string
  lastSolved?: string; // ISO date string - optional, only if exam has been taken
  lastScore?: number; // percentage - optional, only if exam has been taken
}

export interface ExamAttempt {
  _id: string;
  examId: string;
  userId: string;
  score: number;
  completedAt: string;
  answers: Answer[];
}

export interface Answer {
  questionId: string;
  selectedOption: string;
  isCorrect: boolean;
}

export interface ExamCardProps {
  exam: Exam;
}

export interface ExamStats {
  totalExams: number;
  completedExams: number;
  pendingExams: number;
  averageScore?: number;
}

// Quiz interfaces for starting an exam
export interface Quiz {
  examId: string;
  title: string;
  description: string;
  duration: number;
  totalQuestions: number;
  totalMarks: number;
  totalPoints: number;
  questions: Question[];
  startTime: string; // ISO date string
}

export interface Question {
  questionNumber: number;
  questionId: string;
  questionText: string;
  questionType: "single_choice" | "true_false" | "multiple_choice";
  points: number;
  timeLimit: number | null;
  options: Option[];
}

export interface Option {
  index: number;
  text: string;
}

// Response type for startExam API (matches your JSON response)
export type StartExamResponse = Quiz;

// Submit exam interfaces
export interface SubmitAnswer {
  questionId: string
  questionType: "single_choice" | "true_false" | "multiple_choice"
  selectedOptionIndex: number
}

export interface SubmitExamRequest {
  answers: SubmitAnswer[]
  startTime: string // ISO date string
  endTime: string // ISO date string
}

export interface SubmitExamResponse {
  success: boolean
  examId: string
  score: number
  totalMarks: number
  percentage: number
  passingMarks: number
  passed: boolean
  submittedAt: string
  timeTaken: number // in minutes
  correctAnswers: number
  totalQuestions: number
  results: Array<{
    questionId: string
    isCorrect: boolean
    selectedOption: number
    correctOption: number
    points: number
  }>
}
