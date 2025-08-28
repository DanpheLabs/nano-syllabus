
import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  questionType: { 
    type: String, 
    enum: ['multiple_choice', 'single_choice', 'true_false', 'fill_blank'], 
    required: true,
    default: 'multiple_choice'
  },
  options: [{
    text: { type: String, required: true },
    isCorrect: { type: Boolean, required: true }
  }],
  correctAnswer: { type: String }, // For fill in the blank questions
  explanation: { type: String },
  category: { type: String },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  points: { type: Number, default: 1 }, // Points for this question
  timeLimit: { type: Number }, // Optional time limit per question in seconds
  createdAt: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', questionSchema);


export default Question;