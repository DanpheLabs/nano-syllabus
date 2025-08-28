import mongoose from "mongoose";

const examAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  answers: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    questionType: { type: String, required: true },
    selectedOptionIndex: { type: Number }, // For multiple choice/single choice
    selectedOptionIndexes: [{ type: Number }], // For multiple choice (multiple selections)
    textAnswer: { type: String }, // For fill in the blank
    booleanAnswer: { type: Boolean }, // For true/false
    isCorrect: { type: Boolean, required: true },
    pointsEarned: { type: Number, default: 0 }
  }],
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  totalPoints: { type: Number, required: true },
  pointsEarned: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  wrongAnswers: { type: Number, required: true },
  percentage: { type: Number, required: true },
  passed: { type: Boolean, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  timeTaken: { type: Number }, // in seconds
  createdAt: { type: Date, default: Date.now }
});

const ExamAttempt = mongoose.model('ExamAttempt', examAttemptSchema);

export default ExamAttempt;
