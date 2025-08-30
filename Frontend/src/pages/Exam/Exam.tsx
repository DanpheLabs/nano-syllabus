import React, { useState } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Card,
  HStack,
  VStack,
  IconButton,
  Menu,
  Flex,
  Badge,
  Separator,
  Spinner,
  Alert,
} from "@chakra-ui/react"
import { FaRegCheckCircle } from "react-icons/fa"

import {
  LuExternalLink,
  LuChevronDown,
  LuTriangle,
  LuCrown,
  LuClock,
  LuTarget,
  LuTrophy,
  LuCalendar,
  LuPlay,
  LuBookOpen,
  LuCircle,
} from "react-icons/lu"
import useGetExam from "@/Features/Exam/hook/useGetExam"
import type { Exam as ExamType, ExamCardProps } from "@/Features/Exam/types/exam.types"
import {useStartExam} from "@/Features/Exam/hook/useStartExam"
import { useNavigate } from "react-router-dom"

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  const hasResults = exam.lastScore !== undefined && exam.lastSolved
  const navigate = useNavigate()
  
  // Use the mutation hook properly
  const startExamMutation = useStartExam()

  const handleExamStart = (id: string) => {
    console.log("Starting exam with ID:", id)

    startExamMutation.mutate(id, {
      onSuccess: (data) => {
        console.log("Start exam response:", data)
        console.log("Exam started successfully")
        // Navigate to exam page
        navigate(`/exam/start/${id}`, {
          state:data
        })
      },
      onError: (error) => {
        console.error("Failed to start exam:", error)
      },
    })
  }


  return (
    <Card.Root
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="xl"
      overflow="hidden"
      shadow="sm"
      _hover={{
        shadow: "lg",
        transform: "translateY(-2px)",
        borderColor: "purple.300",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    >
      <Card.Body gap={5} p={6}>
        {/* Header */}
        <HStack justify="space-between" align="start">
          <VStack align="start" gap={3} flex={1}>
            <HStack gap={3} align="center" w="full">
              <Box
                w="10"
                h="10"
                borderRadius="full"
                bg={hasResults ? "green.100" : "purple.100"}
                color={hasResults ? "green.600" : "purple.600"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {hasResults ? (
                  <FaRegCheckCircle 
 size={20} />
                ) : (
                  <LuCircle size={20} />
                )}
              </Box>
              <VStack align="start" gap={1} flex={1}>
                <Card.Title
                  fontSize="lg"
                  fontWeight="700"
                  color="gray.900"
                  lineHeight="1.3"
                >
                  {exam?.title}
                </Card.Title>
                <Text
                  color="gray.500"
                  fontSize="sm"
                  fontWeight="500"
                >
                  {exam?.description}
                </Text>
              </VStack>
            </HStack>

            <HStack gap={2} align="center" flexWrap="wrap">
              <Badge
                colorScheme={hasResults ? "green" : "gray"}
                variant="subtle"
                fontSize="xs"
              >
                {hasResults ? "Completed" : "Not Attempted"}
              </Badge>
              <HStack gap={1} color="gray.500" fontSize="xs">
                <LuCalendar size={12} />
                <Text>Created {formatDate(exam.createdAt)}</Text>
              </HStack>
            </HStack>
          </VStack>

          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton
                variant="ghost"
                size="sm"
                color="gray.400"
                _hover={{
                  color: "gray.700",
                  bg: "gray.100",
                }}
                borderRadius="lg"
              >
              </IconButton>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="duplicate">
                  <LuBookOpen size={16} />
                  Duplicate
                </Menu.Item>
                <Menu.Item value="share">
                  <LuExternalLink size={16} />
                  Share
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item value="delete" color="red.500">
                  Delete
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        </HStack>

        <Separator />

        {/* Exam Details */}
        <HStack gap={6} justify="space-between">
          <VStack align="start" gap={1} flex={1}>
            <HStack gap={2} color="gray.500" fontSize="xs">
              <LuClock size={14} />
              <Text
                fontWeight="600"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Duration
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="700" color="gray.900">
              {exam?.duration} mins
            </Text>
          </VStack>

          <Separator orientation="vertical" h="12" />

          <VStack align="start" gap={1} flex={1}>
            <HStack gap={2} color="gray.500" fontSize="xs">
              <LuTrophy size={14} />
              <Text
                fontWeight="600"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Total Marks
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="700" color="gray.900">
              {exam?.totalMarks}
            </Text>
          </VStack>

          <Separator orientation="vertical" h="12" />

          <VStack align="start" gap={1} flex={1}>
            <HStack gap={2} color="gray.500" fontSize="xs">
              <LuTarget size={14} />
              <Text
                fontWeight="600"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Pass Marks
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="700" color="gray.900">
              {exam?.passingMarks}
            </Text>
          </VStack>
        </HStack>

        {/* Results Section - Only show if exam has been taken */}
        {hasResults && (
          <>
            <Separator />
            <Box bg="gray.50" p={4} borderRadius="xl">
              <HStack justify="space-between" align="center">
                <VStack align="start" gap={1}>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    textTransform="uppercase"
                    fontWeight="600"
                    letterSpacing="wider"
                  >
                    Last Attempt
                  </Text>
                  <Text fontSize="sm" fontWeight="600" color="gray.900">
                    {formatDateTime(exam.lastSolved)}
                  </Text>
                </VStack>

                <VStack align="end" gap={1}>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    textTransform="uppercase"
                    fontWeight="600"
                    letterSpacing="wider"
                  >
                    Score Achieved
                  </Text>
                  <HStack gap={2} align="center">
                    <Box
                      bg={
                        exam.lastScore >= exam.passingMarks
                          ? exam.lastScore >= 90
                            ? "green.100"
                            : "yellow.100"
                          : "red.100"
                      }
                      color={
                        exam.lastScore >= exam.passingMarks
                          ? exam.lastScore >= 90
                            ? "green.700"
                            : "yellow.700"
                          : "red.700"
                      }
                      px={3}
                      py={1}
                      borderRadius="lg"
                      fontSize="sm"
                      fontWeight="700"
                    >
                      {exam.lastScore}%
                    </Box>
                    {exam.lastScore >= exam.passingMarks && (
                      <FaRegCheckCircle 
 size={16} color="green.500" />
                    )}
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          </>
        )}
      </Card.Body>

      <Card.Footer justifyContent="flex-end" gap={3} p={6} pt={0} bg="white">
        <Button
          variant="outline"
          size="md"
          colorScheme="gray"
          flex={1}
          borderRadius="lg"
          fontWeight="600"
          _hover={{
            bg: "gray.50",
            borderColor: "gray.400",
          }}
        >
          Edit
        </Button>
        <Button
          variant="solid"
          size="md"
          colorScheme={hasResults ? "green" : "purple"}
          flex={1}
          borderRadius="lg"
          fontWeight="600"
          _hover={{
            transform: "translateY(-1px)",
          }}
          transition="all 0.2s"
          onClick={() => {
            handleExamStart(exam?._id)
          }}
        >
          {hasResults ? <LuExternalLink size={16} /> : <LuPlay size={16} />}
          {hasResults ? "Retake" : "Start"}
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}

const Exam: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"created" | "completed" | "pending">("created")
  
  // Fetch exams using the hook
  const { data, isLoading, error, refetch } = useGetExam()
  
    const examsData = data?.exams
    console.log("exam data",examsData)
  // Handle loading state
  if (isLoading) {
    return (
      <Box minH="100vh" bg="gradient-to-br from-gray-50 to-gray-100">
        <Container maxW="7xl" py={10}>
          <Flex justify="center" align="center" minH="50vh">
            <VStack gap={4}>
              <Spinner size="xl" color="purple.500"  />
              <Text fontSize="lg" color="gray.600">Loading exams...</Text>
            </VStack>
          </Flex>
        </Container>
      </Box>
    )
  }
  
  // Handle error state
  if (error) {
    return (
      <Box minH="100vh" bg="gradient-to-br from-gray-50 to-gray-100">
        <Container maxW="7xl" py={10}>
          <Flex justify="center" align="center" minH="50vh">
            <VStack gap={4} textAlign="center">
              <Box color="red.500">
                <LuCircle size={48} />
              </Box>
              <VStack gap={2}>
                <Text fontSize="xl" fontWeight="600" color="gray.800">
                  Failed to load exams
                </Text>
                <Text fontSize="md" color="gray.600">
                  {error?.message || "Something went wrong. Please try again."}
                </Text>
              </VStack>
              <Button 
                colorScheme="purple" 
                onClick={() => refetch()}
              >
                Retry
              </Button>
            </VStack>
          </Flex>
        </Container>
      </Box>
    )
  }
  
  // Use the fetched data or fallback to empty array
  const exams: ExamType[] = examsData || []

  const completedExams = exams.filter((exam) => exam.lastScore !== undefined)
  const pendingExams = exams.filter((exam) => exam.lastScore === undefined)

  const SortIcon = () => (
    <VStack gap={0}>
      <LuTriangle size={8} style={{ transform: "rotate(0deg)" }} />
      <LuTriangle size={8} style={{ transform: "rotate(180deg)" }} />
    </VStack>
  )

  return (
    <Box minH="100vh" bg="gradient-to-br from-gray-50 to-gray-100">
      <Container maxW="7xl" py={10}>
        {/* Header */}
        <Flex justify="space-between" align="center" mb={10}>
          <VStack align="start" gap={2}>
            <Heading
              size="2xl"
              color="gray.900"
              fontWeight="800"
              letterSpacing="tight"
            >
              My Exams
            </Heading>
            <Text color="gray.600" fontSize="lg">
              Manage and track your exam performance
            </Text>
          </VStack>
          <Button
            colorScheme="yellow"
            variant="solid"
            size="lg"
            fontWeight="700"
            borderRadius="xl"
            px={6}
            _hover={{
              transform: "translateY(-2px)",
              shadow: "lg",
            }}
            transition="all 0.2s"
          >
            <LuCrown />
            Go Premium
          </Button>
        </Flex>

        {/* Stats Cards */}
    

        {/* Filter Tabs */}
        <HStack
          mb={8}
          gap={4}
          bg="white"
          p={2}
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
          shadow="sm"
        >
          <Button
            variant={activeTab === "created" ? "solid" : "ghost"}
            colorScheme={activeTab === "created" ? "purple" : "gray"}
            fontWeight="700"
            fontSize="md"
            px={6}
            py={3}
            borderRadius="lg"
            onClick={() => setActiveTab("created")}
          >
            All Exams ({exams.length})
          </Button>
          <Button
            variant={activeTab === "completed" ? "solid" : "ghost"}
            colorScheme={activeTab === "completed" ? "green" : "gray"}
            fontWeight="600"
            fontSize="md"
            px={6}
            py={3}
            borderRadius="lg"
            onClick={() => setActiveTab("completed")}
          >
            Completed ({completedExams.length})
          </Button>
          <Button
            variant={activeTab === "pending" ? "solid" : "ghost"}
            colorScheme={activeTab === "pending" ? "orange" : "gray"}
            fontWeight="600"
            fontSize="md"
            px={6}
            py={3}
            borderRadius="lg"
            onClick={() => setActiveTab("pending")}
          >
            Pending ({pendingExams.length})
          </Button>
        </HStack>

        {/* Content */}
        <VStack gap={4} align="stretch">
          {activeTab === "created" &&
            exams.map((exam) => <ExamCard key={exam._id} exam={exam} />)}

          {activeTab === "completed" &&
            completedExams.map((exam) => (
              <ExamCard key={exam._id} exam={exam} />
            ))}

          {activeTab === "pending" &&
            pendingExams.map((exam) => <ExamCard key={exam._id} exam={exam} />)}

          {/* Empty State */}
          {((activeTab === "completed" && completedExams.length === 0) ||
            (activeTab === "pending" && pendingExams.length === 0)) && (
            <Card.Root
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="xl"
              shadow="sm"
            >
              <Card.Body gap={6} p={12} textAlign="center">
                <VStack gap={4}>
                  <Box
                    w="16"
                    h="16"
                    bg="gray.100"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mx="auto"
                  >
                    <LuBookOpen size={32} color="gray.400" />
                  </Box>
                  <VStack gap={2}>
                    <Text fontSize="xl" color="gray.800" fontWeight="600">
                      No {activeTab} exams found
                    </Text>
                    <Text fontSize="md" color="gray.500">
                      {activeTab === "completed"
                        ? "Complete some exams to see your results here"
                        : "All exams have been completed"}
                    </Text>
                  </VStack>
                </VStack>
              </Card.Body>
            </Card.Root>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

export default Exam
