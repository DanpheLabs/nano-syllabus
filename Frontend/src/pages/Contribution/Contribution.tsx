import React, { useState } from "react"
import {
  Box,
  Container,
  Tabs,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  Textarea,
  Field,
  Heading,
  Badge,
  Icon,
  Alert,
  
  SimpleGrid,
  Portal,
  Select,
  createListCollection,
  Card,
} from "@chakra-ui/react"
import {
  FiUpload,
  FiFileText,
  FiCheckCircle,
  FiBook,
  FiFile,
  FiEdit,
  FiEye,
  FiDownload,
} from "react-icons/fi"

// Create collections for selects
const subjectsCollection = createListCollection({
  items: [
    { label: "Mathematics", value: "mathematics" },
    { label: "Physics", value: "physics" },
    { label: "Chemistry", value: "chemistry" },
    { label: "Biology", value: "biology" },
    { label: "Computer Science", value: "computer-science" },
  ],
})

const semestersCollection = createListCollection({
  items: [
    { label: "1st Semester", value: "1" },
    { label: "2nd Semester", value: "2" },
    { label: "3rd Semester", value: "3" },
    { label: "4th Semester", value: "4" },
    { label: "5th Semester", value: "5" },
    { label: "6th Semester", value: "6" },
  ],
})

const levelsCollection = createListCollection({
  items: [
    { label: "Undergraduate", value: "undergraduate" },
    { label: "Graduate", value: "graduate" },
    { label: "Postgraduate", value: "postgraduate" },
  ],
})

const languagesCollection = createListCollection({
  items: [
    { label: "English", value: "english" },
    { label: "Hindi", value: "hindi" },
    { label: "Other", value: "other" },
  ],
})

// Upload Question Paper Component
const UploadQuestionPaper = () => {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = () => {
    setIsUploading(true)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <VStack gap={6} align="stretch">
      <Card.Root
        bg="rgba(75, 85, 99, 0.9)"
        borderColor="gray.600"
        borderWidth="1px"
      >
        <Card.Header>
          <HStack gap={3}>
            <Icon as={FiUpload} boxSize={6} color="blue.400" />
            <Heading size="md" color="white">
              Upload Question Paper
            </Heading>
          </HStack>
        </Card.Header>
        <Card.Body>
          <VStack gap={4} align="stretch">
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <Field.Root>
                <Field.Label color="gray.300">Subject</Field.Label>
                <Select.Root collection={subjectsCollection} size="md">
                  <Select.HiddenSelect />
                  <Select.Control bg="gray.700" borderColor="gray.600">
                    <Select.Trigger>
                      <Select.ValueText
                        placeholder="Select subject"
                        color="white"
                      />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator color="gray.300" />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content bg="gray.700" borderColor="gray.600">
                        {subjectsCollection.items.map((subject) => (
                          <Select.Item
                            item={subject}
                            key={subject.value}
                            color="white"
                            _hover={{ bg: "gray.600" }}
                          >
                            {subject.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </Field.Root>

              <Field.Root>
                <Field.Label color="gray.300">Semester/Year</Field.Label>
                <Select.Root collection={semestersCollection} size="md">
                  <Select.HiddenSelect />
                  <Select.Control bg="gray.700" borderColor="gray.600">
                    <Select.Trigger>
                      <Select.ValueText
                        placeholder="Select semester"
                        color="white"
                      />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator color="gray.300" />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content bg="gray.700" borderColor="gray.600">
                        {semestersCollection.items.map((semester) => (
                          <Select.Item
                            item={semester}
                            key={semester.value}
                            color="white"
                            _hover={{ bg: "gray.600" }}
                          >
                            {semester.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </Field.Root>
            </SimpleGrid>

            <Field.Root>
              <Field.Label color="gray.300">Paper Title</Field.Label>
              <Input
                placeholder="Enter question paper title"
                bg="gray.700"
                borderColor="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label color="gray.300">Description</Field.Label>
              <Textarea
                placeholder="Brief description of the question paper"
                rows={3}
                bg="gray.700"
                borderColor="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </Field.Root>

            <Box
              border="2px dashed"
              borderColor="gray.600"
              borderRadius="md"
              p={8}
              textAlign="center"
              bg="gray.700"
              _hover={{ borderColor: "blue.400", bg: "gray.600" }}
              transition="all 0.2s"
            >
              <VStack gap={3}>
                <Icon as={FiFile} boxSize={12} color="gray.400" />
                <Text color="gray.300">Drag and drop your file here, or</Text>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  color="blue.300"
                  borderColor="blue.300"
                >
                  Browse Files
                </Button>
                <Text fontSize="sm" color="gray.500">
                  Supported formats: PDF, DOC, DOCX (Max 10MB)
                </Text>
              </VStack>
            </Box>

            {isUploading && (
              <Box>
                <Text mb={2} fontSize="sm" color="gray.300">
                  Uploading...
                </Text>
              </Box>
            )}

            <Button
              colorScheme="blue"
              size="lg"
              onClick={handleFileUpload}
              loading={isUploading}
              loadingText="Uploading"
              bg="blue.500"
              _hover={{ bg: "blue.600" }}
            >
              <FiUpload />
              Upload Question Paper
            </Button>
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  )
}

// Answer Questions Component
const AnswerQuestions = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  const mockQuestions = [
    {
      id: 1,
      title: "Mathematics - Calculus Mid-term",
      subject: "Mathematics",
      difficulty: "Medium",
      points: 50,
    },
    {
      id: 2,
      title: "Physics - Quantum Mechanics",
      subject: "Physics",
      difficulty: "Hard",
      points: 75,
    },
    {
      id: 3,
      title: "Chemistry - Organic Reactions",
      subject: "Chemistry",
      difficulty: "Easy",
      points: 25,
    },
  ]

  return (
    <VStack gap={6} align="stretch">
      <Card.Root
        bg="rgba(75, 85, 99, 0.9)"
        borderColor="gray.600"
        borderWidth="1px"
      >
        <Card.Header>
          <HStack gap={3}>
            <Icon as={FiEdit} boxSize={6} color="green.400" />
            <Heading size="md" color="white">
              Answer Questions
            </Heading>
          </HStack>
        </Card.Header>
        <Card.Body>
          <VStack gap={4} align="stretch">
            <Alert.Root status="info" bg="blue.800" borderColor="blue.600">
              {/* <Alert.Icon color="blue.300" /> */}
              <Box>
                <Alert.Title color="blue.200">Available Questions!</Alert.Title>
                <Alert.Description color="blue.100">
                  Select a question paper to start answering. Earn points for
                  each completed answer.
                </Alert.Description>
              </Box>
            </Alert.Root>

            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
              {mockQuestions.map((question) => (
                <Card.Root
                  key={question.id}
                  variant="outline"
                  cursor="pointer"
                  bg="gray.700"
                  borderColor="gray.600"
                  _hover={{ shadow: "md", borderColor: "green.300" }}
                  onClick={() => setSelectedQuestion(question)}
                >
                  <Card.Body>
                    <VStack align="start" gap={3}>
                      <HStack justify="space-between" w="full">
                        <Badge colorScheme="blue" bg="blue.600" color="white">
                          {question.subject}
                        </Badge>
                        <Badge
                          colorScheme={
                            question.difficulty === "Easy"
                              ? "green"
                              : question.difficulty === "Medium"
                              ? "yellow"
                              : "red"
                          }
                          bg={
                            question.difficulty === "Easy"
                              ? "green.600"
                              : question.difficulty === "Medium"
                              ? "yellow.600"
                              : "red.600"
                          }
                          color="white"
                        >
                          {question.difficulty}
                        </Badge>
                      </HStack>
                      <Text fontWeight="semibold" color="white">
                        {question.title}
                      </Text>
                      <HStack justify="space-between" w="full">
                        <Text fontSize="sm" color="gray.400">
                          Points: {question.points}
                        </Text>
                        <Button
                          size="sm"
                          colorScheme="green"
                          variant="outline"
                          color="green.300"
                          borderColor="green.300"
                        >
                          Start Answering
                        </Button>
                      </HStack>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>

            {selectedQuestion && (
              <Card.Root mt={6} bg="gray.700" borderColor="gray.600">
                <Card.Header>
                  <Heading size="sm" color="white">
                    Answer: {selectedQuestion.title}
                  </Heading>
                </Card.Header>
                <Card.Body>
                  <VStack gap={4} align="stretch">
                    <Field.Root>
                      <Field.Label color="gray.300">Your Answer</Field.Label>
                      <Textarea
                        placeholder="Type your detailed answer here..."
                        rows={8}
                        bg="gray.800"
                        borderColor="gray.600"
                        color="white"
                        _placeholder={{ color: "gray.400" }}
                      />
                    </Field.Root>
                    <HStack gap={3}>
                      <Button
                        colorScheme="green"
                        bg="green.500"
                        _hover={{ bg: "green.600" }}
                      >
                        <FiCheckCircle />
                        Submit Answer
                      </Button>
                      <Button
                        variant="outline"
                        color="gray.300"
                        borderColor="gray.500"
                      >
                        Save Draft
                      </Button>
                    </HStack>
                  </VStack>
                </Card.Body>
              </Card.Root>
            )}
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  )
}

// Review Answers Component (For Professors)
const ReviewAnswers = () => {
  const mockAnswers = [
    {
      id: 1,
      student: "John Doe",
      question: "Calculus Integration",
      status: "Pending",
      submittedAt: "2024-01-15",
    },
    {
      id: 2,
      student: "Jane Smith",
      question: "Quantum Physics",
      status: "Reviewed",
      submittedAt: "2024-01-14",
      score: 85,
    },
  ]

  const statusCollection = createListCollection({
    items: [
      { label: "All Status", value: "all" },
      { label: "Pending", value: "pending" },
      { label: "Reviewed", value: "reviewed" },
    ],
  })

  return (
    <VStack gap={6} align="stretch">
      <Card.Root
        bg="rgba(75, 85, 99, 0.9)"
        borderColor="gray.600"
        borderWidth="1px"
      >
        <Card.Header>
          <HStack gap={3}>
            <Icon as={FiEye} boxSize={6} color="purple.400" />
            <Heading size="md" color="white">
              Review Answers
            </Heading>
            <Badge colorScheme="purple" ml="auto" bg="purple.600" color="white">
              Professors Only
            </Badge>
          </HStack>
        </Card.Header>
        <Card.Body>
          <VStack gap={4} align="stretch">
            <Alert.Root
              status="warning"
              bg="orange.800"
              borderColor="orange.600"
            >
              {/* <Alert.Icon color="orange.300" /> */}
              <Box>
                <Alert.Title color="orange.200">
                  Professor Access Required!
                </Alert.Title>
                <Alert.Description color="orange.100">
                  This section is only available for verified professors and
                  reviewers.
                </Alert.Description>
              </Box>
            </Alert.Root>

            <HStack gap={4} mb={4}>
              <Select.Root
                collection={subjectsCollection}
                size="md"
                width="200px"
              >
                <Select.HiddenSelect />
                <Select.Control bg="gray.700" borderColor="gray.600">
                  <Select.Trigger>
                    <Select.ValueText
                      placeholder="Filter by subject"
                      color="white"
                    />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator color="gray.300" />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content bg="gray.700" borderColor="gray.600">
                      {subjectsCollection.items.map((subject) => (
                        <Select.Item
                          item={subject}
                          key={subject.value}
                          color="white"
                          _hover={{ bg: "gray.600" }}
                        >
                          {subject.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>

              <Select.Root
                collection={statusCollection}
                size="md"
                width="200px"
              >
                <Select.HiddenSelect />
                <Select.Control bg="gray.700" borderColor="gray.600">
                  <Select.Trigger>
                    <Select.ValueText
                      placeholder="Filter by status"
                      color="white"
                    />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator color="gray.300" />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content bg="gray.700" borderColor="gray.600">
                      {statusCollection.items.map((status) => (
                        <Select.Item
                          item={status}
                          key={status.value}
                          color="white"
                          _hover={{ bg: "gray.600" }}
                        >
                          {status.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </HStack>

            {mockAnswers.map((answer) => (
              <Card.Root
                key={answer.id}
                variant="outline"
                bg="gray.700"
                borderColor="gray.600"
              >
                <Card.Body>
                  <HStack justify="space-between">
                    <VStack align="start" gap={2}>
                      <Text fontWeight="semibold" color="white">
                        {answer.question}
                      </Text>
                      <Text fontSize="sm" color="gray.400">
                        Student: {answer.student}
                      </Text>
                      <Text fontSize="sm" color="gray.400">
                        Submitted: {answer.submittedAt}
                      </Text>
                    </VStack>
                    <VStack gap={2}>
                      <Badge
                        colorScheme={
                          answer.status === "Pending" ? "orange" : "green"
                        }
                        bg={
                          answer.status === "Pending"
                            ? "orange.600"
                            : "green.600"
                        }
                        color="white"
                      >
                        {answer.status}
                      </Badge>
                      {answer.score && (
                        <Badge colorScheme="blue" bg="blue.600" color="white">
                          Score: {answer.score}%
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        colorScheme="purple"
                        variant="outline"
                        color="purple.300"
                        borderColor="purple.300"
                      >
                        Review
                      </Button>
                    </VStack>
                  </HStack>
                </Card.Body>
              </Card.Root>
            ))}
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  )
}

// Upload Notes and Books Component
const UploadNotesBooks = () => {
  const [uploadType, setUploadType] = useState("notes")

  return (
    <VStack gap={6} align="stretch">
      <Card.Root
        bg="rgba(75, 85, 99, 0.9)"
        borderColor="gray.600"
        borderWidth="1px"
      >
        <Card.Header>
          <HStack gap={3}>
            <Icon as={FiBook} boxSize={6} color="orange.400" />
            <Heading size="md" color="white">
              Upload Free Notes & Book PDFs
            </Heading>
          </HStack>
        </Card.Header>
        <Card.Body>
          <VStack gap={4} align="stretch">
            <Alert.Root status="success" bg="green.800" borderColor="green.600">
              {/* <Alert.Icon color="green.300" /> */}
              <Box>
                <Alert.Title color="green.200">Share Knowledge!</Alert.Title>
                <Alert.Description color="green.100">
                  Upload your study materials to help fellow students. All
                  uploads are free and open access.
                </Alert.Description>
              </Box>
            </Alert.Root>

            <HStack gap={4}>
              <Button
                variant={uploadType === "notes" ? "solid" : "outline"}
                colorScheme="orange"
                onClick={() => setUploadType("notes")}
                bg={uploadType === "notes" ? "orange.500" : "transparent"}
                color={uploadType === "notes" ? "white" : "orange.300"}
                borderColor="orange.300"
                _hover={{
                  bg: uploadType === "notes" ? "orange.600" : "orange.800",
                }}
              >
                Upload Notes
              </Button>
              <Button
                variant={uploadType === "books" ? "solid" : "outline"}
                colorScheme="orange"
                onClick={() => setUploadType("books")}
                bg={uploadType === "books" ? "orange.500" : "transparent"}
                color={uploadType === "books" ? "white" : "orange.300"}
                borderColor="orange.300"
                _hover={{
                  bg: uploadType === "books" ? "orange.600" : "orange.800",
                }}
              >
                Upload Books
              </Button>
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <Field.Root>
                <Field.Label color="gray.300">Title</Field.Label>
                <Input
                  placeholder={`Enter ${uploadType} title`}
                  bg="gray.700"
                  borderColor="gray.600"
                  color="white"
                  _placeholder={{ color: "gray.400" }}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label color="gray.300">Subject</Field.Label>
                <Select.Root collection={subjectsCollection} size="md">
                  <Select.HiddenSelect />
                  <Select.Control bg="gray.700" borderColor="gray.600">
                    <Select.Trigger>
                      <Select.ValueText
                        placeholder="Select subject"
                        color="white"
                      />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator color="gray.300" />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content bg="gray.700" borderColor="gray.600">
                        {subjectsCollection.items.map((subject) => (
                          <Select.Item
                            item={subject}
                            key={subject.value}
                            color="white"
                            _hover={{ bg: "gray.600" }}
                          >
                            {subject.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </Field.Root>

              <Field.Root>
                <Field.Label color="gray.300">Level</Field.Label>
                <Select.Root collection={levelsCollection} size="md">
                  <Select.HiddenSelect />
                  <Select.Control bg="gray.700" borderColor="gray.600">
                    <Select.Trigger>
                      <Select.ValueText
                        placeholder="Select level"
                        color="white"
                      />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator color="gray.300" />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content bg="gray.700" borderColor="gray.600">
                        {levelsCollection.items.map((level) => (
                          <Select.Item
                            item={level}
                            key={level.value}
                            color="white"
                            _hover={{ bg: "gray.600" }}
                          >
                            {level.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </Field.Root>

              <Field.Root>
                <Field.Label color="gray.300">Language</Field.Label>
                <Select.Root collection={languagesCollection} size="md">
                  <Select.HiddenSelect />
                  <Select.Control bg="gray.700" borderColor="gray.600">
                    <Select.Trigger>
                      <Select.ValueText
                        placeholder="Select language"
                        color="white"
                      />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator color="gray.300" />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content bg="gray.700" borderColor="gray.600">
                        {languagesCollection.items.map((language) => (
                          <Select.Item
                            item={language}
                            key={language.value}
                            color="white"
                            _hover={{ bg: "gray.600" }}
                          >
                            {language.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </Field.Root>
            </SimpleGrid>

            <Field.Root>
              <Field.Label color="gray.300">Description</Field.Label>
              <Textarea
                placeholder={`Describe your ${uploadType} content, topics covered, etc.`}
                rows={4}
                bg="gray.700"
                borderColor="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label color="gray.300">Tags (comma separated)</Field.Label>
              <Input
                placeholder="calculus, integration, mathematics, study-guide"
                bg="gray.700"
                borderColor="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </Field.Root>

            <Box
              border="2px dashed"
              borderColor="gray.600"
              borderRadius="md"
              p={8}
              textAlign="center"
              bg="gray.700"
              _hover={{ borderColor: "orange.400", bg: "gray.600" }}
              transition="all 0.2s"
            >
              <VStack gap={3}>
                <Icon as={FiDownload} boxSize={12} color="gray.400" />
                <Text color="gray.300">Drop your PDF files here</Text>
                <Button
                  colorScheme="orange"
                  variant="outline"
                  color="orange.300"
                  borderColor="orange.300"
                >
                  Select Files
                </Button>
                <Text fontSize="sm" color="gray.500">
                  PDF files only (Max 50MB per file)
                </Text>
              </VStack>
            </Box>

            <Button
              colorScheme="orange"
              size="lg"
              bg="orange.500"
              _hover={{ bg: "orange.600" }}
            >
              <FiUpload />
              Upload {uploadType === "notes" ? "Notes" : "Books"}
            </Button>
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  )
}

// Main Contribution Component
const Contribution = () => {
  return (
    <Box bg="gray.800" minH="100vh">
      <Container maxW="6xl" py={8}>
        <VStack gap={6} align="stretch">
          <Box textAlign="center">
            <Heading size="xl" mb={2} color="white">
              Contribution Center
            </Heading>
            <Text color="gray.400" fontSize="lg">
              Share your knowledge and help the community grow
            </Text>
          </Box>

          <Tabs.Root
            defaultValue="upload"
            variant="enclosed"
            colorScheme="blue"
          >
            <Tabs.List bg="gray.700" borderColor="gray.600">
              <Tabs.Trigger
                value="upload"
                color="gray.300"
                _selected={{ color: "blue.300", bg: "gray.600" }}
              >
                <HStack gap={2}>
                  <Icon as={FiUpload} />
                  <Text>Upload Questions</Text>
                </HStack>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="answer"
                color="gray.300"
                _selected={{ color: "green.300", bg: "gray.600" }}
              >
                <HStack gap={2}>
                  <Icon as={FiEdit} />
                  <Text>Answer Questions</Text>
                </HStack>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="review"
                color="gray.300"
                _selected={{ color: "purple.300", bg: "gray.600" }}
              >
                <HStack gap={2}>
                  <Icon as={FiEye} />
                  <Text>Review Answers</Text>
                </HStack>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="notes"
                color="gray.300"
                _selected={{ color: "orange.300", bg: "gray.600" }}
              >
                <HStack gap={2}>
                  <Icon as={FiBook} />
                  <Text>Upload Notes & Books</Text>
                </HStack>
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="upload" px={0}>
              <UploadQuestionPaper />
            </Tabs.Content>
            <Tabs.Content value="answer" px={0}>
              <AnswerQuestions />
            </Tabs.Content>
            <Tabs.Content value="review" px={0}>
              <ReviewAnswers />
            </Tabs.Content>
            <Tabs.Content value="notes" px={0}>
              <UploadNotesBooks />
            </Tabs.Content>
          </Tabs.Root>
        </VStack>
      </Container>
    </Box>
  )
}

export default Contribution
