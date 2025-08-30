import React, { useState, useEffect } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  VStack,
  HStack,
  Card,
  Badge,
  Separator,
} from "@chakra-ui/react"
import { Progress } from "@/components/ui/progress"
import {
  LuClock,
  LuUser,
  LuBookOpen,
  LuArrowRight,
  LuTarget,
} from "react-icons/lu"
import { FaRegCheckCircle } from "react-icons/fa"
import { useLocation, useNavigate } from "react-router-dom"
import { useSubmitExam } from "@/Features/Exam/hook/useSubmitExam"
import type {
  SubmitExamRequest,
  SubmitAnswer,
} from "@/Features/Exam/types/exam.types"

// TypeScript interfaces for the received data
interface Option {
  index: number
  text: string
  isCorrect: boolean // Add this field
}

interface Question {
  questionNumber: number
  questionId: string
  questionText: string
  questionType: "single_choice" | "true_false" | "multiple_choice"
  points: number
  timeLimit: number | null
  options: Option[]
}

interface Quiz {
  examId: string
  title: string
  description: string
  duration: number // in minutes
  totalQuestions: number
  totalMarks: number
  totalPoints: number
  questions: Question[]
  startTime: string // ISO date string
}

// The state contains the quiz data directly
interface LocationState {
  examId: string
  title: string
  description: string
  duration: number
  totalQuestions: number
  totalMarks: number
  totalPoints: number
  questions: Question[]
  startTime: string
}

const ExamStarted: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [examStartTime, setExamStartTime] = useState<string>("")
  const [userAnswers, setUserAnswers] = useState<
    Array<{
      questionId: string
      questionType: "single_choice" | "true_false" | "multiple_choice"
      selectedOption: number
      answeredAt: string
    }>
  >([])

  const location = useLocation()
  const navigate = useNavigate()
  const quiz = location.state as LocationState

  // Submit exam mutation
  const {
    mutate: submitExamMutation,
    isPending: isSubmitting,
    error: submitError,
  } = useSubmitExam()

  // Initialize timer and start time when component mounts
  useEffect(() => {
    if (quiz) {
      setTimeRemaining(quiz.duration * 60) // Convert minutes to seconds
      setExamStartTime(new Date().toISOString()) // Record when exam actually started
    }
  }, [quiz])

  // Timer countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleAutoSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [timeRemaining])

  // FIXED: Restore selected answer when currentQuestionIndex changes
  useEffect(() => {
    if (quiz && quiz.questions[currentQuestionIndex]) {
      const currentQuestionId = quiz.questions[currentQuestionIndex].questionId
      const existingAnswer = userAnswers.find(
        (answer) => answer.questionId === currentQuestionId
      )

      if (existingAnswer) {
        setSelectedAnswer(existingAnswer.selectedOption)
        console.log(
          `Restored answer for question ${currentQuestionIndex + 1}:`,
          existingAnswer.selectedOption
        )
      } else {
        setSelectedAnswer(null)
        console.log(
          `No existing answer for question ${currentQuestionIndex + 1}`
        )
      }
    }
  }, [currentQuestionIndex, quiz, userAnswers]) // Added userAnswers back to dependencies

  // Handle auto-submit when time runs out
  const handleAutoSubmit = (): void => {
    console.log("Time's up! Auto-submitting exam...")
    handleSubmitExam()
  }

  // Prepare submit data according to your interface
  const prepareSubmitData = (): SubmitExamRequest => {
    const answers: SubmitAnswer[] = userAnswers.map((answer) => ({
      questionId: answer.questionId,
      questionType: answer.questionType,
      selectedOptionIndex: answer.selectedOption,
    }))

    return {
      answers,
      startTime: examStartTime,
      endTime: new Date().toISOString(),
    }
  }

  // Handle exam submission
  const handleSubmitExam = (): void => {
    if (!quiz) return

    const submitData = prepareSubmitData()
    console.log("Submitting exam with data:", submitData)

    submitExamMutation(
      {
        examId: quiz.examId,
        submitData,
      },
      {
        onSuccess: (response) => {
          console.log("Exam submitted successfully:", response)
          // Navigate to results page with all necessary data
          navigate("/exam/result", {
            state: {
              examResults: response,
              examTitle: quiz.title,
              examQuestions: quiz.questions,
              userAnswers: userAnswers,
              examDuration: quiz.duration,
            },
          })
        },
        onError: (error) => {
          console.error("Failed to submit exam:", error)
        },
      }
    )
  }

  // Loading state - if no quiz data
  if (!quiz) {
    return (
      <Box minH="100vh" bg="white">
        <Flex align="center" justify="center" minH="100vh">
          <VStack gap={4}>
            <Text fontSize="xl" color="gray.600">
              Loading exam...
            </Text>
            <Text fontSize="md" color="gray.500">
              Please wait while we prepare your exam.
            </Text>
          </VStack>
        </Flex>
      </Box>
    )
  }

  // Get current question
  const currentQuestion: Question | undefined =
    quiz.questions[currentQuestionIndex]

  // No current question (shouldn't happen but good to check)
  if (!currentQuestion) {
    return (
      <Box minH="100vh" bg="white">
        <Flex align="center" justify="center" minH="100vh">
          <Text fontSize="xl" color="red.500">
            Question not found
          </Text>
        </Flex>
      </Box>
    )
  }

  // Helper functions
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (optionIndex: number): void => {
    setSelectedAnswer(optionIndex)
  }

  const handleContinue = (): void => {
    if (selectedAnswer !== null && currentQuestion) {
      // Store the answer with proper typing
      const newAnswer = {
        questionId: currentQuestion.questionId,
        questionType: currentQuestion.questionType,
        selectedOption: selectedAnswer,
        answeredAt: new Date().toISOString(),
      }

      console.log("Storing answer:", newAnswer)

      setUserAnswers((prev) => {
        const existing = prev.find(
          (answer) => answer.questionId === currentQuestion.questionId
        )
        if (existing) {
          // Update existing answer
          const updatedAnswers = prev.map((answer) =>
            answer.questionId === currentQuestion.questionId
              ? newAnswer
              : answer
          )
          console.log("Updated userAnswers:", updatedAnswers)
          return updatedAnswers
        } else {
          // Add new answer
          const newAnswers = [...prev, newAnswer]
          console.log("New userAnswers:", newAnswers)
          return newAnswers
        }
      })

      // Move to next question or submit exam
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
      } else {
        // Last question - submit exam
        handleSubmitExam()
      }
    }
  }

  const handlePrevious = (): void => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  // Calculate progress
  const currentQuestionNumber = currentQuestionIndex + 1
  const progressPercentage = (currentQuestionNumber / quiz.totalQuestions) * 100
  const answeredCount = userAnswers.length

  // Check if answer is selected
  const isAnswerSelected = selectedAnswer !== null

  // Determine if timer should show warning (less than 5 minutes)
  const isLowTime = timeRemaining < 300

  return (
    <Box minH="100vh" bg="white">
      {/* Header */}
      <Box
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        shadow="sm"
      >
        <Container maxW="7xl" py={4}>
          <Flex justify="space-between" align="center">
            <VStack align="start" gap={1}>
              <Heading size="lg" color="gray.800" fontWeight="700">
                {quiz.title}
              </Heading>
              <HStack gap={4} color="gray.500" fontSize="sm">
                <HStack gap={1}>
                  <LuBookOpen size={16} />
                  <Text>{quiz.totalQuestions} Questions</Text>
                </HStack>
                <HStack gap={1}>
                  <LuUser size={16} />
                  <Text>Practice Mode</Text>
                </HStack>
                <Text fontSize="xs" color="gray.400">
                  {quiz.description}
                </Text>
              </HStack>
            </VStack>

            {/* Timer and Progress */}
            <VStack align="end" gap={2}>
              <HStack gap={3} align="center">
                <Badge
                  colorScheme={isLowTime ? "red" : "orange"}
                  variant="subtle"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="600"
                >
                  <HStack gap={1}>
                    <LuClock size={14} />
                    <Text>{formatTime(timeRemaining)}</Text>
                  </HStack>
                </Badge>
                <Badge
                  colorScheme="purple"
                  variant="subtle"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="600"
                >
                  <HStack gap={1}>
                    <LuTarget size={14} />
                    <Text>
                      {currentQuestionNumber}/{quiz.totalQuestions}
                    </Text>
                  </HStack>
                </Badge>
              </HStack>
              <Box w="200px">
                <Progress value={progressPercentage} />
                <Text fontSize="xs" color="gray.500" mt={1} textAlign="center">
                  {answeredCount} of {quiz.totalQuestions} answered
                </Text>
              </Box>
            </VStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content - Centered Container */}
      <Flex
        minH="calc(100vh - 120px)"
        align="center"
        justify="center"
        p={8}
        bg="gray.50"
      >
        <Container maxW="4xl">
          <Flex align="center" justify="center">
            <Card.Root
              bg="white"
              shadow="2xl"
              borderRadius="2xl"
              border="1px solid"
              borderColor="gray.100"
              overflow="hidden"
              w="full"
              maxW="3xl"
            >
              {/* Question Header */}
              <Box
                bg="purple.50"
                px={8}
                py={6}
                borderBottom="1px solid"
                borderColor="purple.100"
              >
                <VStack align="start" gap={3}>
                  <HStack justify="space-between" w="full">
                    <Badge
                      colorScheme="purple"
                      variant="solid"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontWeight="600"
                    >
                      Question {currentQuestion.questionNumber} of{" "}
                      {quiz.totalQuestions}
                    </Badge>
                    <VStack align="end" gap={1}>
                      <Text fontSize="sm" color="purple.600" fontWeight="600">
                        {Math.round(progressPercentage)}% Complete
                      </Text>
                      <Text fontSize="xs" color="purple.500">
                        {currentQuestion.points}{" "}
                        {currentQuestion.points === 1 ? "point" : "points"}
                      </Text>
                    </VStack>
                  </HStack>

                  <Box w="full">
                    <Progress value={progressPercentage} />
                  </Box>
                </VStack>
              </Box>

              <Card.Body p={8}>
                <VStack gap={8} align="stretch">
                  {/* Question Text */}
                  <Box>
                    <VStack align="start" gap={2}>
                      <Badge
                        colorScheme="blue"
                        variant="outline"
                        fontSize="xs"
                        textTransform="capitalize"
                      >
                        {currentQuestion.questionType.replace("_", " ")}
                      </Badge>
                      <Text
                        fontSize="xl"
                        lineHeight="1.6"
                        color="gray.800"
                        fontWeight="500"
                        textAlign="left"
                      >
                        {currentQuestion.questionText}
                      </Text>
                    </VStack>
                  </Box>

                  <Separator />

                  {/* Answer Options */}
                  <VStack gap={4} align="stretch">
                    <Text
                      fontSize="lg"
                      fontWeight="600"
                      color="gray.700"
                      mb={2}
                    >
                      Choose your answer:
                    </Text>

                    {currentQuestion.options.map((option) => (
                      <Card.Root
                        key={option.index}
                        bg={
                          selectedAnswer === option.index
                            ? "purple.50"
                            : "gray.50"
                        }
                        border="2px solid"
                        borderColor={
                          selectedAnswer === option.index
                            ? "purple.300"
                            : "gray.200"
                        }
                        cursor="pointer"
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        _hover={{
                          borderColor: "purple.300",
                          bg: "purple.50",
                          transform: "translateY(-1px)",
                          shadow: "md",
                        }}
                        onClick={() => handleAnswerSelect(option.index)}
                        borderRadius="xl"
                      >
                        <Card.Body p={6}>
                          <HStack justify="space-between" align="center">
                            <HStack gap={4} align="center">
                              <Box
                                w="8"
                                h="8"
                                borderRadius="full"
                                bg={
                                  selectedAnswer === option.index
                                    ? "purple.500"
                                    : "gray.300"
                                }
                                color="white"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                fontWeight="600"
                                fontSize="sm"
                                transition="all 0.2s"
                              >
                                {String.fromCharCode(65 + option.index)}
                              </Box>
                              <Text
                                fontSize="lg"
                                fontWeight="500"
                                color={
                                  selectedAnswer === option.index
                                    ? "purple.700"
                                    : "gray.700"
                                }
                              >
                                {option.text}
                              </Text>
                            </HStack>

                            {selectedAnswer === option.index && (
                              <Box color="purple.500">
                                <FaRegCheckCircle size={20} />
                              </Box>
                            )}
                          </HStack>
                        </Card.Body>
                      </Card.Root>
                    ))}
                  </VStack>
                </VStack>
              </Card.Body>

              {/* Footer */}
              <Box
                bg="gray.50"
                px={8}
                py={6}
                borderTop="1px solid"
                borderColor="gray.200"
              >
                <Flex justify="space-between" align="center">
                  <Text fontSize="sm" color="gray.500">
                    {isAnswerSelected
                      ? "Ready to continue"
                      : "Select an answer to continue"}
                  </Text>

                  <HStack gap={3}>
                    {/* Previous Button */}
                    {currentQuestionIndex > 0 && (
                      <Button
                        size="md"
                        variant="outline"
                        colorScheme="gray"
                        fontWeight="600"
                        px={6}
                        borderRadius="xl"
                        onClick={handlePrevious}
                      >
                        Previous
                      </Button>
                    )}

                    {/* Continue/Submit Button */}
                    <Button
                      size="lg"
                      colorScheme="purple"
                      fontWeight="600"
                      px={8}
                      py={3}
                      borderRadius="xl"
                      disabled={!isAnswerSelected || isSubmitting}
                      loading={isSubmitting}
                      _hover={{
                        transform:
                          isAnswerSelected && !isSubmitting
                            ? "translateY(-1px)"
                            : "none",
                        shadow:
                          isAnswerSelected && !isSubmitting ? "lg" : "none",
                      }}
                      _disabled={{
                        opacity: 0.5,
                        cursor: "not-allowed",
                        transform: "none",
                      }}
                      onClick={handleContinue}
                      transition="all 0.2s"
                    >
                      <HStack gap={2}>
                        <Text>
                          {currentQuestionIndex === quiz.questions.length - 1
                            ? isSubmitting
                              ? "Submitting..."
                              : "Submit Exam"
                            : "Continue"}
                        </Text>
                        {!isSubmitting && <LuArrowRight size={18} />}
                      </HStack>
                    </Button>
                  </HStack>
                </Flex>
              </Box>
            </Card.Root>
          </Flex>
        </Container>
      </Flex>

      {/* Debug info - remove in production */}
      <Box
        position="fixed"
        bottom={4}
        left={4}
        bg="black"
        color="white"
        p={4}
        borderRadius="md"
        fontSize="xs"
        maxW="300px"
        opacity={0.8}
        zIndex={1000}
      >
        <VStack align="start" gap={1}>
          <Text>Current Question: {currentQuestionIndex + 1}</Text>
          <Text>Selected Answer: {selectedAnswer}</Text>
          <Text>
            User Answers:{" "}
            {JSON.stringify(
              userAnswers.map((a) => ({
                q: a.questionId.slice(-4),
                opt: a.selectedOption,
              }))
            )}
          </Text>
        </VStack>
      </Box>

      {/* Show loading overlay when submitting */}
      {isSubmitting && (
        <Box
          position="fixed"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bg="blackAlpha.600"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={9999}
        >
          <VStack gap={4} bg="white" p={8} borderRadius="xl" shadow="2xl">
            <Text fontSize="lg" fontWeight="600">
              Submitting your exam...
            </Text>
            <Text fontSize="sm" color="gray.600" textAlign="center">
              Please wait while we process your answers
            </Text>
          </VStack>
        </Box>
      )}

      {/* Show error message if submit fails */}
      {submitError && (
        <Box
          position="fixed"
          top={4}
          right={4}
          bg="red.50"
          border="1px solid"
          borderColor="red.200"
          borderRadius="lg"
          p={4}
          shadow="lg"
          maxW="400px"
          zIndex={1000}
        >
          <VStack align="start" gap={2}>
            <Text fontSize="sm" fontWeight="600" color="red.600">
              Failed to submit exam
            </Text>
            <Text fontSize="xs" color="red.500">
              {submitError.message}
            </Text>
          </VStack>
        </Box>
      )}
    </Box>
  )
}

export default ExamStarted
