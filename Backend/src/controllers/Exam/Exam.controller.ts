import { Request, Response } from "express";
import Exam from "../../models/Exam.model";
import ExamAttempt from "../../models/ExamAttempt.model";

const createExam = async (req: Request, res: Response) => {
    try {
        const { title, description, questions, duration, totalMarks, passingMarks } = req.body;

        const exam = new Exam({
            title,
            description,
            questions,
            duration,
            totalMarks,
            passingMarks
        });

        await exam.save();
        res.status(201).json({ message: 'Exam created successfully', exam });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
}

const getAllExams = async (req: Request, res: Response) => {
    try {
        const exams = await Exam.find({ isActive: true })
            .select('title description duration totalMarks passingMarks createdAt')
            .sort({ createdAt: -1 });

        res.json({ exams });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
}

const startExam = async (req: Request, res: Response) => {
    try {
        const { examId } = req.params;

        const exam = await Exam.findById(examId)
            .populate({
                path: 'questions',
                select: 'questionText questionType options points timeLimit'
            });

        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }

        // Remove correct answer information from questions
        const questionsWithoutAnswers = exam.questions.map((question: any, index: number) => {
            let questionData: any = {
                questionNumber: index + 1,
                questionId: question._id,
                questionText: question.questionText,
                questionType: question.questionType,
                points: question.points || 1,
                timeLimit: question.timeLimit || null
            };

            // Handle different question types
            switch (question.questionType) {
                case 'multiple_choice':
                case 'single_choice':
                case 'true_false':
                    questionData.options = question.options.map((option: any, optionIndex: number) => ({
                        index: optionIndex,
                        text: option.text,
                        isCorrect: option.isCorrect
                    }));
                    break;

                case 'fill_blank':
                    questionData.options = []; // No options for fill in the blank
                    questionData.placeholder = "Enter your answer here...";
                    break;

                default:
                    questionData.options = [];
            }

            return questionData;
        });

        // Calculate total points
        const totalPoints = exam.questions.reduce((sum: number, question: any) => sum + (question.points || 1), 0);

        res.json({
            examId: exam._id,
            title: exam.title,
            description: exam.description,
            duration: exam.duration,
            totalQuestions: exam.questions.length,
            totalMarks: exam.totalMarks,
            totalPoints: totalPoints,
            questions: questionsWithoutAnswers,
            startTime: new Date()
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
}

const submitExam = async (req: Request, res: Response) => {
    try {
        console.log('=== SUBMIT EXAM DEBUG START ===');
        console.log('req.user:', req.user);
        console.log('req.user type:', typeof req.user);
        console.log('req.user._id:', req.user?._id);
        console.log('Authorization header:', req.header('Authorization'));
        console.log('=== SUBMIT EXAM DEBUG END ===');
        
        const { examId } = req.params;
        const { answers, startTime, endTime } = req.body;
        
        // Check if user is authenticated
        if (!req.user || !req.user._id) {
            console.log('ERROR: User not authenticated - req.user:', req.user);
            return res.status(401).json({ error: 'User not authenticated' });
        }
        
        const userId = req.user._id; // From auth middleware

        // Get exam with correct answers
        const exam = await Exam.findById(examId).populate('questions');
        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }

        if (!exam.questions || exam.questions.length === 0) {
            return res.status(400).json({ error: 'Exam has no questions' });
        }

        console.log('Exam found:', { id: exam._id, questionsCount: exam.questions.length });
        console.log('Answers received:', answers);

        // Validate answers array
        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ error: 'Invalid answers format' });
        }

        // Calculate score
        let correctAnswers = 0;
        let wrongAnswers = 0;
        let totalPointsEarned = 0;
        const detailedAnswers: any[] = [];

        answers.forEach((answer: any, index: number) => {
            console.log(`Processing answer ${index}:`, answer);
            
            const question = exam.questions[index] as any;
            console.log(`Question ${index}:`, question ? { id: question._id, type: question.questionType } : 'UNDEFINED');
            
            if (!question) {
                console.log(`ERROR: Question at index ${index} is undefined`);
                return; // Skip this answer
            }
            
            let isCorrect = false;
            let pointsEarned = 0;

            // Prepare answer object
            let answerObj: any = {
                questionId: question._id,
                questionType: question.questionType,
                isCorrect: false,
                pointsEarned: 0
            };
            
            console.log(`Answer object for question ${index}:`, answerObj);

            // Check answer based on question type
            switch (question.questionType) {
                case 'single_choice':
                case 'true_false':
                    if (answer.selectedOptionIndex !== undefined) {
                        const selectedOption = question.options[answer.selectedOptionIndex];
                        isCorrect = selectedOption && selectedOption.isCorrect;
                        answerObj.selectedOptionIndex = answer.selectedOptionIndex;
                    }
                    break;

                case 'multiple_choice':
                    if (answer.selectedOptionIndexes && Array.isArray(answer.selectedOptionIndexes)) {
                        // For multiple choice, all correct options must be selected and no incorrect ones
                        const correctOptionIndexes = question.options
                            .map((option: any, idx: number) => option.isCorrect ? idx : -1)
                            .filter((idx: number) => idx !== -1);

                        const selectedSet = new Set(answer.selectedOptionIndexes as number[]);
                        const correctSet = new Set(correctOptionIndexes);

                        isCorrect = selectedSet.size === correctSet.size &&
                            Array.from(selectedSet).every((idx) => correctSet.has(idx));

                        answerObj.selectedOptionIndexes = answer.selectedOptionIndexes;
                    }
                    break;

                case 'fill_blank':
                    if (answer.textAnswer !== undefined) {
                        // Case-insensitive comparison, trim whitespace
                        const userAnswer = answer.textAnswer.toString().trim().toLowerCase();
                        const correctAnswer = question.correctAnswer.toString().trim().toLowerCase();
                        isCorrect = userAnswer === correctAnswer;
                        answerObj.textAnswer = answer.textAnswer;
                    }
                    break;
            }

            // Calculate points
            if (isCorrect) {
                correctAnswers++;
                pointsEarned = question.points || 1;
                totalPointsEarned += pointsEarned;
            } else {
                wrongAnswers++;
            }

            answerObj.isCorrect = isCorrect;
            answerObj.pointsEarned = pointsEarned;
            detailedAnswers.push(answerObj);
        });

        const totalQuestions = exam.questions.length;
        const totalPossiblePoints = exam.questions.reduce((sum: number, q: any) => sum + (q.points || 1), 0);
        const score = (totalPointsEarned / totalPossiblePoints) * exam.totalMarks;
        const percentage = (totalPointsEarned / totalPossiblePoints) * 100;
        const passed = score >= exam.passingMarks;
        const timeTaken = Math.floor((new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000);

        // Save exam attempt
        const examAttempt = new ExamAttempt({
            userId: userId,
            examId: exam._id,
            answers: detailedAnswers,
            score,
            totalQuestions,
            totalPoints: totalPossiblePoints,
            pointsEarned: totalPointsEarned,
            correctAnswers,
            wrongAnswers,
            percentage,
            passed,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            timeTaken
        });

        await examAttempt.save();

        res.json({
            message: 'Exam submitted successfully',
            attemptId: examAttempt._id,
            results: {
                score: Math.round(score * 100) / 100,
                totalMarks: exam.totalMarks,
                pointsEarned: totalPointsEarned,
                totalPoints: totalPossiblePoints,
                correctAnswers,
                wrongAnswers,
                totalQuestions,
                percentage: Math.round(percentage * 100) / 100,
                passed,
                timeTaken
            }
        });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
}

const GetDetailedResult = async (req: Request, res: Response) => {
    try {
        const { attemptId } = req.params;
        
        // Check if user is authenticated
        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        
        const userId = req.user._id;

        const attempt = await ExamAttempt.findById(attemptId)
            .populate({
                path: 'examId',
                select: 'title description totalMarks passingMarks'
            })
            .populate({
                path: 'answers.questionId',
                select: 'questionText questionType options correctAnswer explanation points'
            });

        if (!attempt || attempt.userId.toString() !== userId.toString()) {
            return res.status(404).json({ error: 'Exam attempt not found' });
        }

        // Prepare detailed results
        const detailedResults = attempt.answers.map((answer: any, index: number) => {
            const question = answer.questionId;
            let result: any = {
                questionNumber: index + 1,
                questionText: question.questionText,
                questionType: question.questionType,
                isCorrect: answer.isCorrect,
                pointsEarned: answer.pointsEarned,
                totalPoints: question.points || 1,
                explanation: question.explanation || null
            };

            // Handle different question types for display
            switch (question.questionType) {
                case 'single_choice':
                case 'true_false':
                    const selectedOption = question.options[answer.selectedOptionIndex];
                    const correctOption = question.options.find((opt: any) => opt.isCorrect);

                    result.options = question.options.map((opt: any, idx: number) => ({
                        index: idx,
                        text: opt.text,
                        isCorrect: opt.isCorrect,
                        isSelected: idx === answer.selectedOptionIndex
                    }));
                    result.selectedAnswer = selectedOption ? selectedOption.text : 'No answer';
                    result.correctAnswer = correctOption ? correctOption.text : 'Unknown';
                    break;

                case 'multiple_choice':
                    const selectedIndexes = answer.selectedOptionIndexes || [];
                    const correctOptions = question.options.filter((opt: any) => opt.isCorrect);

                    result.options = question.options.map((opt: any, idx: number) => ({
                        index: idx,
                        text: opt.text,
                        isCorrect: opt.isCorrect,
                        isSelected: selectedIndexes.includes(idx)
                    }));
                    result.selectedAnswers = selectedIndexes.map((idx: number) => question.options[idx]?.text).filter(Boolean);
                    result.correctAnswers = correctOptions.map((opt: any) => opt.text);
                    break;

                case 'fill_blank':
                    result.userAnswer = answer.textAnswer || 'No answer';
                    result.correctAnswer = question.correctAnswer;
                    result.options = []; // No options for fill in the blank
                    break;
            }

            return result;
        });

        res.json({
            exam: {
                title: (attempt.examId as any).title,
                description: (attempt.examId as any).description
            },
            summary: {
                score: attempt.score,
                totalMarks: (attempt.examId as any).totalMarks,
                pointsEarned: attempt.pointsEarned || attempt.correctAnswers,
                totalPoints: attempt.totalPoints || attempt.totalQuestions,
                correctAnswers: attempt.correctAnswers,
                wrongAnswers: attempt.wrongAnswers,
                totalQuestions: attempt.totalQuestions,
                percentage: attempt.percentage,
                passed: attempt.passed,
                timeTaken: attempt.timeTaken
            },
            detailedResults,
            attemptDate: attempt.createdAt
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
}

const getExamAnalytics = async (req: Request, res: Response) => {
    try {
        const { examId } = req.params;

        const exam = await Exam.findById(examId).populate('questions');
        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }

        // Get all attempts for this exam
        const attempts = await ExamAttempt.find({ examId })
            .populate('userId', 'full_name email');

        // Calculate analytics
        const totalAttempts = attempts.length;
        const passedAttempts = attempts.filter((a: any) => a.passed).length;
        const failedAttempts = totalAttempts - passedAttempts;
        const averageScore = totalAttempts > 0 ? attempts.reduce((sum: number, a: any) => sum + a.score, 0) / totalAttempts : 0;
        const averagePercentage = totalAttempts > 0 ? attempts.reduce((sum: number, a: any) => sum + a.percentage, 0) / totalAttempts : 0;
        const averageTime = totalAttempts > 0 ? attempts.reduce((sum: number, a: any) => sum + (a.timeTaken || 0), 0) / totalAttempts : 0;

        res.json({
            exam: {
                title: exam.title,
                totalQuestions: exam.questions.length
            },
            overview: {
                totalAttempts,
                passedAttempts,
                failedAttempts,
                passRate: totalAttempts > 0 ? Math.round((passedAttempts / totalAttempts) * 100 * 100) / 100 : 0,
                averageScore: Math.round(averageScore * 100) / 100,
                averagePercentage: Math.round(averagePercentage * 100) / 100,
                averageTimeInMinutes: Math.round((averageTime / 60) * 100) / 100
            }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
}

const UserExamHistory = async (req: Request, res: Response) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        
        const userId = req.user._id;
        
        const attempts = await ExamAttempt.find({ userId })
            .populate('examId', 'title description')
            .select('examId score percentage passed createdAt timeTaken')
            .sort({ createdAt: -1 });

        res.json({ attempts });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
}

export { createExam, getAllExams, startExam, submitExam, GetDetailedResult, getExamAnalytics, UserExamHistory };