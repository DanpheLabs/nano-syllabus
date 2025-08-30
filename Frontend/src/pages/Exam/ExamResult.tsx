import React from "react"
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
import { IoCheckmarkCircle } from "react-icons/io5"
import { RxCrossCircled } from "react-icons/rx"
import {
  LuClock,
  LuUser,
  LuBookOpen,
  LuArrowLeft,
  LuTarget,
  LuTrophy,
  LuCalendar,
  LuRefreshCw,
} from "react-icons/lu"
import { useLocation, useNavigate } from "react-router-dom"

// TypeScript interfaces for the received data
interface Option {
  index: number
  text: string
  isCorrect: boolean
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

interface UserAnswer {
  questionId: string
  questionType: "single_choice" | "true_false" | "multiple_choice"
  selectedOption: number
  selectedOptions?: number[] // For multiple choice questions
  answeredAt: string
}

// Results interface based on your API response
interface ExamResults {
  score: number
  totalMarks: number
  pointsEarned: number
  totalPoints: number
  correctAnswers: number
  wrongAnswers: number
  totalQuestions: number
  percentage: number
  passed: boolean
  timeTaken: number // in seconds
}

interface SubmitResponse {
  message: string
  attemptId: string
  results: ExamResults
}

interface LocationState {
  examResults: SubmitResponse
  examTitle: string
  examQuestions: Question[]
  userAnswers: UserAnswer[]
  examDuration: number
}

const ExamResult: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LocationState

  // If no state data, redirect back
  if (!state) {
    navigate("/exam", { replace: true })
    return null
  }

  const { examResults, examTitle, examQuestions, userAnswers, examDuration } =
    state

  // Format duration from seconds to readable format
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`
    }
    return `${remainingSeconds}s`
  }

  // Get user answer for a specific question
  const getUserAnswer = (questionId: string): UserAnswer | undefined => {
    return userAnswers.find((answer) => answer.questionId === questionId)
  }

  // Remove the mock logic functions and use real data
  const isAnswerCorrect = (
    question: Question,
    userAnswer: UserAnswer
  ): boolean => {
    if (
      question.questionType === "single_choice" ||
      question.questionType === "true_false"
    ) {
      const selectedOption = question.options.find(
        (opt) => opt.index === userAnswer.selectedOption
      )
      return selectedOption?.isCorrect || false
    } else if (question.questionType === "multiple_choice") {
      // For multiple choice, check if user selected ALL and ONLY correct options
      const correctIndexes = question.options
        .filter((opt) => opt.isCorrect)
        .map((opt) => opt.index)

      // Assuming userAnswer has selectedOptions array for multiple choice
      const userSelectedIndexes = userAnswer.selectedOptions || [
        userAnswer.selectedOption,
      ]

      return (
        correctIndexes.length === userSelectedIndexes.length &&
        correctIndexes.every((index) => userSelectedIndexes.includes(index))
      )
    }
    return false
  }

  const getCorrectAnswerIndex = (question: Question): number => {
    const correctOption = question.options.find((opt) => opt.isCorrect)
    return correctOption?.index || 0
  }

  // For multiple choice, get all correct indexes
  const getCorrectAnswerIndexes = (question: Question): number[] => {
    return question.options
      .filter((opt) => opt.isCorrect)
      .map((opt) => opt.index)
  }

  const handleRetakeExam = (): void => {
    // Navigate back to exam start with the exam data
    navigate("/exam/start", {
      state: {
        examId: "exam_id_here", // You'd need to pass this from the original exam
        title: examTitle,
        questions: examQuestions,
        duration: examDuration,
        // ... other exam properties
      },
    })
  }

  const handleBackToExams = (): void => {
    navigate("/exam", { replace: true })
  }

  return (
    <Box minH="100vh" bg="gray.50">
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
                {examTitle} - Results
              </Heading>
              <HStack gap={4} color="gray.500" fontSize="sm">
                <HStack gap={1}>
                  <LuBookOpen size={16} />
                  <Text>{examResults.results.totalQuestions} Questions</Text>
                </HStack>
                <HStack gap={1}>
                  <LuClock size={16} />
                  <Text>{formatDuration(examResults.results.timeTaken)}</Text>
                </HStack>
                <Text fontSize="xs" color="gray.400">
                  Attempt ID: {examResults.attemptId}
                </Text>
              </HStack>
            </VStack>

            {/* Action Buttons */}
            <HStack gap={3}>
              <Button
                variant="outline"
                colorScheme="gray"
                onClick={handleBackToExams}
                px={4}
                borderRadius="xl"
              >
                <LuArrowLeft size={16} />
                Back to Exams
              </Button>
              <Button
                colorScheme="purple"
                onClick={handleRetakeExam}
                px={4}
                borderRadius="xl"
                fontWeight="600"
              >
                <LuRefreshCw size={16} />
                Retake Exam
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="6xl" py={8}>
        <VStack gap={8} align="stretch">
          {/* Results Overview Card */}
          <Card.Root
            bg="white"
            shadow="xl"
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.100"
            overflow="hidden"
          >
            <Box
              bg={examResults.results.passed ? "green.50" : "red.50"}
              px={8}
              py={6}
              borderBottom="1px solid"
              borderColor={examResults.results.passed ? "green.100" : "red.100"}
            >
              <HStack gap={4} align="center">
                <Box
                  p={4}
                  borderRadius="full"
                  bg={examResults.results.passed ? "green.100" : "red.100"}
                  color={examResults.results.passed ? "green.600" : "red.600"}
                >
                  <LuTrophy size={32} />
                </Box>
                <VStack align="start" gap={2}>
                  <Heading size="xl" fontWeight="800">
                    {examResults.results.passed
                      ? "Congratulations!"
                      : "Better Luck Next Time!"}
                  </Heading>
                  <Text color="gray.600" fontSize="lg">
                    {examResults.message}
                  </Text>
                </VStack>
              </HStack>
            </Box>

            <Card.Body p={8}>
              <VStack gap={6} align="stretch">
                {/* Score Overview */}
                <HStack gap={8} justify="center">
                  <VStack gap={2}>
                    <Text
                      fontSize="4xl"
                      fontWeight="900"
                      color={
                        examResults.results.passed ? "green.500" : "red.500"
                      }
                    >
                      {examResults.results.percentage}%
                    </Text>
                    <Text fontSize="sm" color="gray.600" fontWeight="600">
                      Overall Score
                    </Text>
                  </VStack>
                  <Box h="16" w="px" bg="gray.300" />
                  <VStack gap={2}>
                    <Text fontSize="3xl" fontWeight="800">
                      {examResults.results.score}/
                      {examResults.results.totalMarks}
                    </Text>
                    <Text fontSize="sm" color="gray.600" fontWeight="600">
                      Marks Earned
                    </Text>
                  </VStack>
                </HStack>

                {/* Progress Bar */}
                <Box w="full">
                  <Progress value={examResults.results.percentage} />
                </Box>

                {/* Pass/Fail Badge */}
                <Flex justify="center">
                  <Badge
                    colorScheme={examResults.results.passed ? "green" : "red"}
                    variant="solid"
                    px={6}
                    py={2}
                    borderRadius="full"
                    fontSize="lg"
                    fontWeight="700"
                  >
                    {examResults.results.passed ? "PASSED" : "FAILED"}
                  </Badge>
                </Flex>

                {/* Detailed Stats Grid */}
                <Box
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="xl"
                  overflow="hidden"
                >
                  <HStack
                    justify="space-between"
                    p={4}
                    borderBottom="1px solid"
                    borderColor="gray.100"
                  >
                    <HStack gap={3}>
                      <Box color="green.500">
                        <IoCheckmarkCircle size={20} />
                      </Box>
                      <Text fontWeight="600">Correct Answers</Text>
                    </HStack>
                    <Text fontWeight="700" color="green.500" fontSize="lg">
                      {examResults.results.correctAnswers}
                    </Text>
                  </HStack>

                  <HStack
                    justify="space-between"
                    p={4}
                    borderBottom="1px solid"
                    borderColor="gray.100"
                  >
                    <HStack gap={3}>
                      <Box color="red.500">
                        <RxCrossCircled size={20} />
                      </Box>
                      <Text fontWeight="600">Wrong Answers</Text>
                    </HStack>
                    <Text fontWeight="700" color="red.500" fontSize="lg">
                      {examResults.results.wrongAnswers}
                    </Text>
                  </HStack>

                  <HStack
                    justify="space-between"
                    p={4}
                    borderBottom="1px solid"
                    borderColor="gray.100"
                  >
                    <HStack gap={3}>
                      <Box color="purple.500">
                        <LuTarget size={20} />
                      </Box>
                      <Text fontWeight="600">Points Earned</Text>
                    </HStack>
                    <Text fontWeight="700" fontSize="lg">
                      {examResults.results.pointsEarned}/
                      {examResults.results.totalPoints}
                    </Text>
                  </HStack>

                  <HStack justify="space-between" p={4}>
                    <HStack gap={3}>
                      <Box color="orange.500">
                        <LuClock size={20} />
                      </Box>
                      <Text fontWeight="600">Time Taken</Text>
                    </HStack>
                    <Text fontWeight="700" fontSize="lg">
                      {formatDuration(examResults.results.timeTaken)}
                    </Text>
                  </HStack>
                </Box>
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Question by Question Review */}
          <Card.Root
            bg="white"
            shadow="xl"
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.100"
            overflow="hidden"
          >
            <Box
              bg="blue.50"
              px={8}
              py={6}
              borderBottom="1px solid"
              borderColor="blue.100"
            >
              <Heading size="lg" fontWeight="700" color="blue.800">
                Question Review
              </Heading>
              <Text color="blue.600" mt={2}>
                Review your answers and see the correct solutions
              </Text>
            </Box>

            <Card.Body p={0}>
              <VStack gap={0} align="stretch">
                {examQuestions.map((question, index) => {
                  const userAnswer = getUserAnswer(question.questionId)
                  const isCorrect = userAnswer
                    ? isAnswerCorrect(question, userAnswer)
                    : false
                  const correctAnswerIndex = getCorrectAnswerIndex(question)

                  return (
                    <Box
                      key={question.questionId}
                      p={8}
                      borderBottom={
                        index < examQuestions.length - 1 ? "1px solid" : "none"
                      }
                      borderColor="gray.100"
                    >
                      <VStack gap={6} align="stretch">
                        {/* Question Header */}
                        <HStack justify="space-between" align="start">
                          <HStack gap={3}>
                            <Badge
                              colorScheme="blue"
                              variant="solid"
                              px={3}
                              py={1}
                              borderRadius="full"
                              fontWeight="600"
                            >
                              Question {question.questionNumber}
                            </Badge>
                            <Badge
                              colorScheme={isCorrect ? "green" : "red"}
                              variant="subtle"
                              px={3}
                              py={1}
                              borderRadius="full"
                              fontWeight="600"
                            >
                              {isCorrect ? "Correct" : "Incorrect"}
                            </Badge>
                          </HStack>
                          <VStack align="end" gap={1}>
                            <Text fontSize="sm" fontWeight="600">
                              {question.points}{" "}
                              {question.points === 1 ? "point" : "points"}
                            </Text>
                            <Badge
                              colorScheme="gray"
                              variant="outline"
                              fontSize="xs"
                              textTransform="capitalize"
                            >
                              {question.questionType.replace("_", " ")}
                            </Badge>
                          </VStack>
                        </HStack>

                        {/* Question Text */}
                        <Text
                          fontSize="lg"
                          fontWeight="600"
                          color="gray.800"
                          lineHeight="1.6"
                        >
                          {question.questionText}
                        </Text>

                        <Separator />

                        {/* Answer Options */}
                        <VStack gap={3} align="stretch">
                          {question.options.map((option) => {
                            const isUserSelected =
                              userAnswer?.selectedOption === option.index
                            const isCorrectAnswer =
                              correctAnswerIndex === option.index

                            let cardBg = "gray.50"
                            let borderColor = "gray.200"
                            let textColor = "gray.700"

                            if (isCorrectAnswer) {
                              cardBg = "green.50"
                              borderColor = "green.300"
                              textColor = "green.800"
                            } else if (isUserSelected && !isCorrectAnswer) {
                              cardBg = "red.50"
                              borderColor = "red.300"
                              textColor = "red.800"
                            }

                            return (
                              <Card.Root
                                key={option.index}
                                bg={cardBg}
                                border="2px solid"
                                borderColor={borderColor}
                                borderRadius="xl"
                              >
                                <Card.Body p={4}>
                                  <HStack
                                    justify="space-between"
                                    align="center"
                                  >
                                    <HStack gap={4} align="center">
                                      <Box
                                        w="8"
                                        h="8"
                                        borderRadius="full"
                                        bg={
                                          isCorrectAnswer
                                            ? "green.500"
                                            : isUserSelected
                                            ? "red.500"
                                            : "gray.300"
                                        }
                                        color="white"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        fontWeight="600"
                                        fontSize="sm"
                                      >
                                        {String.fromCharCode(65 + option.index)}
                                      </Box>
                                      <Text
                                        fontSize="md"
                                        fontWeight="500"
                                        color={textColor}
                                      >
                                        {option.text}
                                      </Text>
                                    </HStack>

                                    <HStack gap={2}>
                                      {isUserSelected && (
                                        <Badge
                                          colorScheme={
                                            isCorrectAnswer ? "green" : "red"
                                          }
                                          variant="subtle"
                                          fontSize="xs"
                                        >
                                          Your Answer
                                        </Badge>
                                      )}
                                      {isCorrectAnswer && (
                                        <Box color="green.500">
                                          <IoCheckmarkCircle size={20} />
                                        </Box>
                                      )}
                                      {isUserSelected && !isCorrectAnswer && (
                                        <Box color="red.500">
                                          <RxCrossCircled size={20} />
                                        </Box>
                                      )}
                                    </HStack>
                                  </HStack>
                                </Card.Body>
                              </Card.Root>
                            )
                          })}
                        </VStack>
                      </VStack>
                    </Box>
                  )
                })}
              </VStack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Container>
    </Box>
  )
}

export default ExamResult
