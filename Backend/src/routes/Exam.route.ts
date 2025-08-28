import { Router } from "express";
import { 
  createExam, 
  startExam, 
  submitExam, 
  GetDetailedResult,
  getAllExams,
  getExamAnalytics 
} from "../controllers/Exam/Exam.controller";
import { 
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
  getQuestionById,
  bulkCreateQuestions
} from "../controllers/Question/Question.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Debug route to test auth middleware
router.get("/debug/auth", authMiddleware, (req, res) => {
  console.log('DEBUG AUTH ROUTE - req.user:', req.user);
  res.json({ 
    message: "Auth working!", 
    user: req.user ? { id: req.user._id, email: req.user.email } : null 
  });
});

// Exam Routes
router.post("/exams", createExam);
router.get("/exams", authMiddleware, getAllExams);
router.get("/exams/:examId/start", authMiddleware, startExam);
router.post("/exams/:examId/submit", authMiddleware, submitExam);
router.get("/attempts/:attemptId/results", authMiddleware, GetDetailedResult);

// Question Routes (Admin)
router.post("/questions", createQuestion);
router.get("/admin/questions", getAllQuestions);
router.put("/admin/questions/:questionId", updateQuestion);
router.delete("/admin/questions/:questionId", deleteQuestion);
router.get("/admin/questions/:questionId", getQuestionById);
router.post("/admin/questions/bulk", bulkCreateQuestions);

// Analytics Routes (Admin)
router.get("/admin/exams/:examId/analytics", authMiddleware, getExamAnalytics);

// Seed Data Route
router.post("/seed-data", async (req, res) => {
  try {
    const Question = require("../models/Question.model").default;
    const Exam = require("../models/Exam.model").default;
    
    // Sample Questions with different types
    const sampleQuestions = [
      {
        questionText: "The Sun is a G-type main-sequence star.",
        questionType: "true_false",
        options: [
          { text: "True", isCorrect: true },
          { text: "False", isCorrect: false }
        ],
        explanation: "Great job! The Sun is indeed classified as a G-type main-sequence star, which means it is a typical star that fuses hydrogen into helium in its core.",
        category: "Solar System",
        difficulty: "easy",
        points: 1
      },
      {
        questionText: "Which of the following are gas giant planets in our solar system? (Select all that apply)",
        questionType: "multiple_choice",
        options: [
          { text: "Jupiter", isCorrect: true },
          { text: "Saturn", isCorrect: true },
          { text: "Mars", isCorrect: false },
          { text: "Uranus", isCorrect: true },
          { text: "Neptune", isCorrect: true },
          { text: "Earth", isCorrect: false }
        ],
        explanation: "Jupiter, Saturn, Uranus, and Neptune are the four gas giant planets in our solar system.",
        category: "Solar System",
        difficulty: "medium",
        points: 2
      },
      {
        questionText: "What is the largest planet in our solar system?",
        questionType: "single_choice",
        options: [
          { text: "Saturn", isCorrect: false },
          { text: "Jupiter", isCorrect: true },
          { text: "Earth", isCorrect: false },
          { text: "Mars", isCorrect: false }
        ],
        explanation: "Jupiter is the largest planet in our solar system, with a mass greater than all other planets combined.",
        category: "Solar System",
        difficulty: "easy",
        points: 1
      },
      {
        questionText: "Complete this sentence: The asteroid belt is located between _____ and _____.",
        questionType: "fill_blank",
        correctAnswer: "Mars and Jupiter",
        explanation: "The asteroid belt is a region of space located between the orbits of Mars and Jupiter.",
        category: "Solar System",
        difficulty: "medium",
        points: 2
      }
    ];

    // Insert questions
    const insertedQuestions = await Question.insertMany(sampleQuestions);

    // Sample Exam
    const sampleExam = {
      title: "Exploring the Solar System",
      description: "Test your knowledge about our solar system, planets, and celestial bodies with various question types.",
      questions: insertedQuestions.map((q: any) => q._id),
      duration: 30, // 30 minutes
      totalMarks: 100,
      passingMarks: 60
    };

    const insertedExam = await Exam.create(sampleExam);

    res.json({
      message: 'Enhanced sample data inserted successfully',
      questionsCount: insertedQuestions.length,
      questionTypes: {
        true_false: insertedQuestions.filter((q: any) => q.questionType === 'true_false').length,
        single_choice: insertedQuestions.filter((q: any) => q.questionType === 'single_choice').length,
        multiple_choice: insertedQuestions.filter((q: any) => q.questionType === 'multiple_choice').length,
        fill_blank: insertedQuestions.filter((q: any) => q.questionType === 'fill_blank').length
      },
      examId: insertedExam._id
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
