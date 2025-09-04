import { useState } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Card,
  Badge,
  HStack,
  VStack,
  SimpleGrid,
  Progress,
  Icon,
  Flex,
  Spacer,
} from "@chakra-ui/react"
import { FiArrowLeft, FiLock, FiCheckCircle, FiBook } from "react-icons/fi"
import { useNavigate, useParams } from "react-router-dom"

interface Subject {
  id: string
  name: string
  marks: number
  isSelected?: boolean
}


export function Semester() {
  const navigate = useNavigate()
  const { courseId, semesterId } = useParams()
  const [selectedSubject, setSelectedSubject] = useState("computer-programming")

  // Sample subjects data
  const subjects: Subject[] = [
    { id: "computer-programming", name: "Computer Programming", marks: 80, isSelected: true },
    { id: "engineering-physics", name: "Engineering Physics", marks: 80 },
    { id: "basic-electrical", name: "Basic Electrical Engineering", marks: 80 },
    { id: "digital-logic", name: "Digital Logic", marks: 80 },
    { id: "engineering-math", name: "Engineering Mathematics I", marks: 80 },
    { id: "engineering-drawing", name: "Engineering Drawing", marks: 80 }
  ]

  // Sample syllabus data
  const syllabusData = {
    "computer-programming": {
      title: "Computer Programming Syllabus",
      totalChapters: 7,
      chapters: [
        {
          id: "history",
          title: "History of Computing",
          progress: 100,
          status: "completed" as const,
          icon: "✓"
        },
        {
          id: "algorithms",
          title: "Introduction to Algorithms", 
          progress: 75,
          status: "in-progress" as const,
          icon: "📚"
        },
        {
          id: "fundamentals",
          title: "Programming Fundamentals",
          progress: 0,
          status: "locked" as const,
          icon: "🔒"
        },
        {
          id: "arrays",
          title: "Arrays and Lists",
          progress: 0,
          status: "locked" as const,
          icon: "🔒"
        },
        {
          id: "stacks",
          title: "Stacks and Queues",
          progress: 0,
          status: "locked" as const,
          icon: "🔒"
        },
        {
          id: "linked-lists",
          title: "Linked Lists",
          progress: 0,
          status: "locked" as const,
          icon: "🔒"
        },
        {
          id: "hash-tables",
          title: "Hash Tables",
          progress: 0,
          status: "locked" as const,
          icon: "🔒"
        }
      ]
    }
  }

  const currentSyllabus = syllabusData[selectedSubject as keyof typeof syllabusData]
  const overallProgress = 18 // 18% Complete as shown in the image

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge colorScheme="green" bg="green.500" color="white" px={3} py={1}>
            Completed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge colorScheme="blue" bg="blue.500" color="white" px={3} py={1}>
            In Progress
          </Badge>
        )
      case "locked":
        return (
          <Badge colorScheme="gray" bg="gray.500" color="white" px={3} py={1}>
            Locked
          </Badge>
        )
      default:
        return null
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Icon as={FiCheckCircle} color="green.500" boxSize={5} />
      case "in-progress":
        return <Icon as={FiBook} color="blue.500" boxSize={5} />
      case "locked":
        return <Icon as={FiLock} color="gray.500" boxSize={5} />
      default:
        return null
    }
  }

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="full" py={6} px={6}>
        {/* Header */}
        <VStack align="stretch" gap={4}>
          <Flex align="center" gap={4}>
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              color="gray.600"
              _hover={{ bg: "gray.100" }}
            >
              <Icon as={FiArrowLeft} />
              Back to Courses
            </Button>
            <Spacer />
            <Badge
              colorScheme="blue"
              bg="blue.500"
              color="white"
              px={3}
              py={1}
              fontSize="sm"
              borderRadius="md"
            >
              {overallProgress}% Complete
            </Badge>
          </Flex>

          <Box>
            <Heading size="xl" color="gray.800" mb={1}>
              Semester 1
            </Heading>
            <Text color="gray.600" fontSize="md">
              Bachelor's in Electronics and Communication
            </Text>
          </Box>
        </VStack>

        {/* Main Content */}
        <Box mt={8}>
          <SimpleGrid columns={{ base: 1, lg: 4 }} gap={6} alignItems="start">
            {/* Subjects Sidebar */}
            <Box>
              <Heading size="md" color="gray.800" mb={4}>
                Subjects
              </Heading>
              <VStack align="stretch" gap={2}>
                {subjects.map((subject) => (
                  <Card.Root
                    key={subject.id}
                    cursor="pointer"
                    borderWidth={2}
                    borderColor={
                      selectedSubject === subject.id ? "blue.500" : "gray.200"
                    }
                    bg={selectedSubject === subject.id ? "blue.50" : "white"}
                    _hover={{
                      borderColor: "blue.300",
                      bg:
                        selectedSubject === subject.id ? "blue.50" : "gray.50",
                    }}
                    onClick={() => setSelectedSubject(subject.id)}
                    transition="all 0.2s"
                  >
                    <Card.Body py={4} px={4}>
                      <VStack align="stretch" gap={2}>
                        <Text
                          fontWeight="medium"
                          color={
                            selectedSubject === subject.id
                              ? "blue.700"
                              : "gray.800"
                          }
                          fontSize="sm"
                        >
                          {subject.name}
                        </Text>
                        <Text
                          fontSize="sm"
                          color={
                            selectedSubject === subject.id
                              ? "blue.600"
                              : "gray.600"
                          }
                        >
                          {subject.marks} Marks
                        </Text>
                      </VStack>
                    </Card.Body>
                  </Card.Root>
                ))}
              </VStack>
            </Box>

            {/* Syllabus Content */}
            <Box gridColumn={{ base: "1", lg: "2 / 5" }}>
              {currentSyllabus && (
                <Card.Root bg="white" shadow="sm" borderColor="gray.200">
                  <Card.Header
                    borderBottomWidth="1px"
                    borderColor="gray.200"
                    pb={4}
                  >
                    <HStack justify="space-between">
                      <Box>
                        <Heading size="lg" color="gray.800" mb={1}>
                          {currentSyllabus.title}
                        </Heading>
                        <Text color="gray.600" fontSize="sm">
                          {currentSyllabus.totalChapters} Chapters
                        </Text>
                      </Box>
                    </HStack>
                  </Card.Header>

                  <Card.Body pt={6}>
                    <VStack align="stretch" gap={4}>
                      {currentSyllabus.chapters.map((chapter, index) => (
                        <Card.Root
                          key={chapter.id}
                          borderWidth="1px"
                          borderColor="gray.200"
                          bg="gray.50"
                          cursor={
                            chapter.status !== "locked"
                              ? "pointer"
                              : "not-allowed"
                          }
                          opacity={chapter.status === "locked" ? 0.6 : 1}
                          _hover={
                            chapter.status !== "locked"
                              ? {
                                  shadow: "md",
                                  borderColor: "blue.300",
                                }
                              : {}
                          }
                          transition="all 0.2s"
                        >
                          <Card.Body py={4} px={6}>
                            <HStack gap={4} align="center">
                              <Box>{getStatusIcon(chapter.status)}</Box>

                              <Box flex={1}>
                                <HStack
                                  justify="space-between"
                                  align="start"
                                  mb={2}
                                >
                                  <Text
                                    fontWeight="medium"
                                    color="gray.800"
                                    fontSize="md"
                                  >
                                    {chapter.title}
                                  </Text>
                                  {getStatusBadge(chapter.status)}
                                </HStack>

                                {chapter.status !== "locked" && (
                                  <Box>
                                    <HStack justify="space-between" mb={2}>
                                      <Text fontSize="sm" color="gray.600">
                                        Progress
                                      </Text>
                                      <Text
                                        fontSize="sm"
                                        color="gray.800"
                                        fontWeight="medium"
                                      >
                                        {chapter.progress}%
                                      </Text>
                                    </HStack>
                                    <Progress.Root
                                      value={chapter.progress}
                                      size="sm"
                                      bg="gray.200"
                                    >
                                      <Progress.Track>
                                        <Progress.Range
                                          bg={
                                            chapter.status === "completed"
                                              ? "green.500"
                                              : "blue.500"
                                          }
                                        />
                                      </Progress.Track>
                                    </Progress.Root>
                                  </Box>
                                )}
                              </Box>

                              <Box>
                                {chapter.status !== "locked" && (
                                  <Button
                                    size="sm"
                                    colorScheme={
                                      chapter.status === "completed"
                                        ? "green"
                                        : "blue"
                                    }
                                    variant={
                                      chapter.status === "completed"
                                        ? "solid"
                                        : "solid"
                                    }
                                    
                                    bg={
                                      chapter.status === "completed"
                                        ? "green.500"
                                        : "blue.500"
                                    }
                                    color="white"
                                    _hover={{
                                      bg:
                                        chapter.status === "completed"
                                          ? "green.600"
                                          : "blue.600",
                                    }}
                                    px={4}
                                    onClick={() => {
                                      // Navigate to chapter learning page
                                      navigate(`/chapter/${courseId}/${semesterId}/${chapter.id}`)
                                    }}
                                  >
                                    {chapter.status === "completed"
                                      ? "Review"
                                      : "Start"}
                                  </Button>
                                )}
                              </Box>
                            </HStack>
                          </Card.Body>
                        </Card.Root>
                      ))}
                    </VStack>
                  </Card.Body>
                </Card.Root>
              )}
            </Box>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  )
}