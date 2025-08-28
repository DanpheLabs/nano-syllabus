
import {
    Response, Request
} from "express"
import Question from "../../models/Question.model";

const createQuestion = async (req: Request, res: Response) => {
    try {
        const { questionText, questionType, options, correctAnswer, explanation, category, difficulty, points, timeLimit } = req.body;

        // Validate question type and required fields
        if (!['multiple_choice', 'single_choice', 'true_false', 'fill_blank'].includes(questionType)) {
            return res.status(400).json({ error: 'Invalid question type' });
        }

        let questionData: any = {
            questionText,
            questionType,
            explanation,
            category,
            difficulty: difficulty || 'medium',
            points: points || 1,
            timeLimit
        };

        // Handle different question types
        switch (questionType) {
            case 'multiple_choice':
            case 'single_choice':
                if (!options || !Array.isArray(options) || options.length < 2) {
                    return res.status(400).json({ error: 'At least 2 options required for multiple/single choice questions' });
                }

                // Validate that at least one option is correct
                const hasCorrectOption = options.some((option: any) => option.isCorrect);
                if (!hasCorrectOption) {
                    return res.status(400).json({ error: 'At least one option must be marked as correct' });
                }

                // For single choice, ensure only one option is correct
                if (questionType === 'single_choice') {
                    const correctOptions = options.filter((option: any) => option.isCorrect);
                    if (correctOptions.length !== 1) {
                        return res.status(400).json({ error: 'Single choice questions must have exactly one correct option' });
                    }
                }

                questionData.options = options;
                break;

            case 'true_false':
                // Create predefined True/False options
                questionData.options = [
                    { text: 'True', isCorrect: correctAnswer === 'True' || correctAnswer === true },
                    { text: 'False', isCorrect: correctAnswer === 'False' || correctAnswer === false }
                ];
                break;

            case 'fill_blank':
                if (!correctAnswer || typeof correctAnswer !== 'string') {
                    return res.status(400).json({ error: 'Correct answer is required for fill in the blank questions' });
                }
                questionData.correctAnswer = correctAnswer.trim();
                questionData.options = []; // No options for fill in the blank
                break;

            default:
                return res.status(400).json({ error: 'Invalid question type' });
        }

        const question = new Question(questionData);
        await question.save();

        res.status(201).json({
            message: 'Question created successfully',
            question: {
                _id: question._id,
                questionText: question.questionText,
                questionType: question.questionType,
                options: question.options,
                category: question.category,
                difficulty: question.difficulty,
                points: question.points
            }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
}

const getAllQuestions = async (req: Request, res: Response) => {
    try {
        const { category, difficulty, questionType, page = 1, limit = 10 } = req.query;

        // Build filter object
        let filter: any = {};
        if (category) filter.category = category;
        if (difficulty) filter.difficulty = difficulty;
        if (questionType) filter.questionType = questionType;

        // Calculate pagination
        const skip = (Number(page) - 1) * Number(limit);

        const questions = await Question.find(filter)
            .select('questionText questionType category difficulty points createdAt')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const total = await Question.countDocuments(filter);

        res.json({
            questions,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / Number(limit)),
                totalQuestions: total,
                hasNext: Number(page) * Number(limit) < total,
                hasPrev: Number(page) > 1
            }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
}

const updateQuestion = async (req: Request, res: Response) => {
    try {
        const { questionId } = req.params;
        const updateData = req.body;

        // Validate question type if provided
        if (updateData.questionType && !['multiple_choice', 'single_choice', 'true_false', 'fill_blank'].includes(updateData.questionType)) {
            return res.status(400).json({ error: 'Invalid question type' });
        }

        const question = await Question.findByIdAndUpdate(questionId, updateData, { new: true });

        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        res.json({ message: 'Question updated successfully', question });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
}

const deleteQuestion = async (req: Request, res: Response) => {
    try {
        const { questionId } = req.params;
        const Exam = require("../../models/Exam.model").default;

        // Check if question is used in any exam
        const examWithQuestion = await Exam.findOne({ questions: questionId });
        if (examWithQuestion) {
            return res.status(400).json({ error: 'Cannot delete question as it is used in an exam' });
        }

        const question = await Question.findByIdAndDelete(questionId);

        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        res.json({ message: 'Question deleted successfully' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
}

const getQuestionById = async (req: Request, res: Response) => {
    try {
        const { questionId } = req.params;

        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        res.json({ question });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
}

const bulkCreateQuestions = async (req: Request, res: Response) => {
    try {
        const { questions } = req.body;

        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ error: 'Questions array is required' });
        }

        // Validate each question
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            if (!q.questionText || !q.questionType) {
                return res.status(400).json({ error: `Question ${i + 1}: questionText and questionType are required` });
            }
        }

        const insertedQuestions = await Question.insertMany(questions);

        res.status(201).json({
            message: `${insertedQuestions.length} questions created successfully`,
            questions: insertedQuestions.map((q: any) => ({
                _id: q._id,
                questionText: q.questionText,
                questionType: q.questionType,
                category: q.category
            }))
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
}

export { 
    createQuestion, 
    getAllQuestions, 
    updateQuestion, 
    deleteQuestion, 
    getQuestionById, 
    bulkCreateQuestions 
};