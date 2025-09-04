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
  Icon,
  Flex,
  Spacer,
  Separator,
  List,
  Stack,
} from "@chakra-ui/react"
import {
  FiArrowLeft,
  FiChevronDown,
  FiChevronRight,
  FiThumbsUp,
  FiThumbsDown,
  FiMessageCircle,
  FiBookOpen,
} from "react-icons/fi"
import { useNavigate, useParams } from "react-router-dom"

interface Topic {
  id: string
  title: string
  questions: number
  isExpanded?: boolean
  subtopics?: string[]
}

interface MemorizationTechnique {
  id: string
  title: string
  description: string
  likes: number
  dislikes: number
}

export function ChapterLearning() {
  const navigate = useNavigate()
  const { courseId, semesterId, chapterId } = useParams()
  const [selectedTopic, setSelectedTopic] = useState("what-is-bst")
  const [isNepali, setIsNepali] = useState(false)

  // Sample navigation data
  const topics: Topic[] = [
    {
      id: "introduction",
      title: "Introduction",
      questions: 0,
      isExpanded: true,
      subtopics: [
        "What is a BST? (5 questions)",
        "Why use BSTs? (3 questions)",
        "Applications (4 questions)",
      ],
    },
    {
      id: "operations", 
      title: "Operations",
      questions: 0,
      isExpanded: false,
    },
    {
      id: "advanced-concepts",
      title: "Advanced Concepts", 
      questions: 0,
      isExpanded: false,
    },
  ]

  // Sample memorization techniques
  const memorizationTechniques: MemorizationTechnique[] = [
    {
      id: "1",
      title: "BST Memory Trick: Left Young, Right Old, Everyone at Max Tree Level",
      description: "Left Tree: Left → Younger → smaller numbers, Right → Older → bigger numbers. Max Tree → every child is a new BST. SearchInsertDelete: Average log n, Worst n.",
      likes: 12,
      dislikes: 2,
    },
    {
      id: "2", 
      title: "BST Memory Trick: Left Young, Right Old, Everyone at Max Tree Level",
      description: "Left Tree: Left → Younger → smaller numbers, Right → Older → bigger numbers. Max Tree → every child is a new BST. SearchInsertDelete: Average log n, Worst n.",
      likes: 8,
      dislikes: 1,
    },
  ]

  const toggleTopic = (topicId: string) => {
    // Toggle expansion logic would go here
  }

  // Content in both languages
  const content = {
    english: {
      title: "Binary Search Trees - Data Structures",
      subtitle: "Chapter 5: Tree Data Structures",
      question: "What is a Binary Search Tree (BST)? Explain its properties and time complexity",
      description: "A Binary Search Tree (BST) is a hierarchical data structure that maintains its elements in sorted order, enabling efficient searching, insertion, and deletion operations.",
      keyProperties: "Key Properties",
      properties: [
        {
          title: "Left Subtree Property",
          description: "All values in the left subtree are less than the root node's value"
        },
        {
          title: "Right Subtree Property", 
          description: "All values in the right subtree are greater than the root node's value"
        },
        {
          title: "Recursive Structure",
          description: "Each subtree is also a valid BST"
        }
      ],
      timeComplexity: "Time Complexity",
      complexities: [
        {
          operation: "Search",
          complexity: "O(log n) average case, O(n) worst case"
        },
        {
          operation: "Insertion",
          complexity: "O(log n) average case, O(n) worst case"
        },
        {
          operation: "Deletion", 
          complexity: "O(log n) average case, O(n) worst case"
        }
      ]
    },
    nepali: {
      title: "बाइनरी खोज रूखहरू - डेटा संरचनाहरू",
      subtitle: "अध्याय ५: रूख डेटा संरचनाहरू",
      question: "बाइनरी खोज रूख (BST) भनेको के हो? यसका गुणहरू र समय जटिलता व्याख्या गर्नुहोस्",
      description: "बाइनरी खोज रूख (BST) एक पदानुक्रमित डेटा संरचना हो जसले आफ्ना तत्वहरूलाई क्रमबद्ध क्रममा राख्छ, कुशल खोजी, सम्मिलन र मेटाउने कार्यहरू सक्षम गर्दै।",
      keyProperties: "मुख्य गुणहरू",
      properties: [
        {
          title: "बायाँ सबरूखको गुण",
          description: "बायाँ सबरूखमा सबै मानहरू मूल नोडको मान भन्दा कम छन्"
        },
        {
          title: "दायाँ सबरूखको गुण",
          description: "दायाँ सबरूखमा सबै मानहरू मूल नोडको मान भन्दा बढी छन्"
        },
        {
          title: "पुनरावर्ती संरचना",
          description: "प्रत्येक सबरूख पनि एक मान्य BST हो"
        }
      ],
      timeComplexity: "समय जटिलता",
      complexities: [
        {
          operation: "खोजी",
          complexity: "O(log n) औसत अवस्था, O(n) सबैभन्दा खराब अवस्था"
        },
        {
          operation: "सम्मिलन",
          complexity: "O(log n) औसत अवस्था, O(n) सबैभन्दा खराब अवस्था"
        },
        {
          operation: "मेटाउने",
          complexity: "O(log n) औसत अवस्था, O(n) सबैभन्दा खराब अवस्था"
        }
      ]
    }
  }

  const currentContent = isNepali ? content.nepali : content.english

  return (
    <Box bg="white" minH="100vh">
      <Container maxW="full" py={4} px={4}>
        {/* Header */}
        <Flex align="center" gap={4} mb={6}>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            color="gray.600"
            _hover={{ bg: "gray.100" }}
            leftIcon={<Icon as={FiArrowLeft} />}
            size="sm"
          >
            Back to Course
          </Button>
          <Spacer />
          <HStack gap={2}>
            <Button
              colorScheme="blue"
              size="sm"
              leftIcon={<Icon as={FiBookOpen} />}
            >
              Take Practice exam
            </Button>
            <Button
              colorScheme="purple"
              variant="outline"
              size="sm"
              leftIcon={<Icon as={FiMessageCircle} />}
            >
              Ask Forum
            </Button>
          </HStack>
        </Flex>

        {/* Main Content Layout */}
        <Box>
          <HStack align="start" gap={6} spacing={6}>
            {/* Left Sidebar - Navigation */}
            <Box w="280px" flexShrink={0}>
              <VStack align="stretch" gap={2}>
                {topics.map((topic) => (
                  <Box key={topic.id}>
                    <Button
                      variant="ghost"
                      justifyContent="flex-start"
                      w="full"
                      h="auto"
                      py={2}
                      px={3}
                      onClick={() => toggleTopic(topic.id)}
                      _hover={{ bg: "gray.50" }}
                      leftIcon={
                        <Icon
                          as={topic.isExpanded ? FiChevronDown : FiChevronRight}
                          boxSize={4}
                        />
                      }
                    >
                      <Text fontSize="sm" fontWeight="medium" color="gray.700">
                        {topic.title}
                      </Text>
                    </Button>
                    
                    {topic.isExpanded && topic.subtopics && (
                      <VStack align="stretch" gap={1} pl={6} mt={1}>
                        {topic.subtopics.map((subtopic, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            justifyContent="flex-start"
                            w="full"
                            h="auto"
                            py={1.5}
                            px={2}
                            bg={index === 0 ? "blue.50" : "transparent"}
                            color={index === 0 ? "blue.700" : "gray.600"}
                            borderLeft={index === 0 ? "3px solid" : "none"}
                            borderColor={index === 0 ? "blue.500" : "transparent"}
                            _hover={{ bg: "gray.50" }}
                            borderRadius="md"
                            fontSize="xs"
                          >
                            {subtopic}
                          </Button>
                        ))}
                      </VStack>
                    )}
                  </Box>
                ))}
              </VStack>
            </Box>

            {/* Center Content - Main Question/Content */}
            <Box flex={1}>
              <Card.Root>
                <Card.Header>
                  <HStack justify="space-between">
                    <Box>
                      <Heading size="lg" color="gray.800" mb={1}>
                        {currentContent.title}
                      </Heading>
                      <Text color="gray.600" fontSize="sm">
                        {currentContent.subtitle}
                      </Text>
                    </Box>
                    <HStack gap={3}>
                      <Badge colorScheme="blue" px={2} py={1} fontSize="xs">
                        Question 1/15
                      </Badge>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        variant="solid"
                        bg="blue.500"
                        color="white"
                        _hover={{ bg: "blue.600" }}
                        leftIcon={<Icon as={FiBookOpen} boxSize={3} />}
                        onClick={() => setIsNepali(!isNepali)}
                        px={4}
                      >
                        {isNepali ? "Enable English" : "Enable Nepali"}
                      </Button>
                    </HStack>
                  </HStack>
                </Card.Header>

                <Separator />

                <Card.Body py={6}>
                  <VStack align="stretch" gap={6}>
                    {/* Question Section */}
                    <Box
                      bg="blue.50"
                      p={4}
                      borderRadius="md"
                      borderLeft="4px solid"
                      borderColor="blue.500"
                    >
                      <Text
                        fontSize="md"
                        fontWeight="medium"
                        color="blue.800"
                        mb={3}
                      >
                        {currentContent.question}
                      </Text>
                    </Box>

                    {/* Answer Content */}
                    <Box>
                      <Text fontSize="md" color="gray.800" mb={4} lineHeight="1.6">
                        {currentContent.description}
                      </Text>

                      <Heading size="sm" color="gray.800" mb={3}>
                        {currentContent.keyProperties}
                      </Heading>
                      <List.Root spacing={2} color="gray.700" mb={4} pl={4}>
                        {currentContent.properties.map((property, index) => (
                          <List.Item key={index}>
                            <strong>"{property.title}":</strong> {property.description}
                          </List.Item>
                        ))}
                      </List.Root>

                      <Heading size="sm" color="gray.800" mb={3}>
                        {currentContent.timeComplexity}
                      </Heading>
                      <List.Root spacing={2} color="gray.700" mb={4} pl={4}>
                        {currentContent.complexities.map((complexity, index) => (
                          <List.Item key={index}>
                            <strong>"{complexity.operation}":</strong> {complexity.complexity}
                          </List.Item>
                        ))}
                      </List.Root>
                    </Box>
                  </VStack>
                </Card.Body>

                {/* Navigation Footer */}
                <Card.Footer>
                  <HStack justify="space-between" w="full">
                    <Button
                      variant="outline"
                      leftIcon={<Icon as={FiArrowLeft} />}
                      isDisabled
                    >
                      Previous Question
                    </Button>
                    <Button
                      colorScheme="blue"
                      rightIcon={<Icon as={FiChevronRight} />}
                    >
                      Next Question
                    </Button>
                  </HStack>
                </Card.Footer>
              </Card.Root>
            </Box>

            {/* Right Sidebar - Memorization Techniques */}
            <Box w="320px" flexShrink={0}>
              <Card.Root>
                <Card.Header>
                  <Heading size="md" color="gray.800">
                    Memorization Techniques
                  </Heading>
                </Card.Header>

                <Card.Body>
                  <VStack align="stretch" gap={4}>
                    {memorizationTechniques.map((technique) => (
                      <Box
                        key={technique.id}
                        p={3}
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="md"
                        bg="gray.50"
                      >
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.800"
                          mb={2}
                        >
                          {technique.title}
                        </Text>
                        <Text fontSize="xs" color="gray.600" mb={3} lineHeight="1.4">
                          {technique.description}
                        </Text>
                        <HStack justify="space-between">
                          <HStack gap={3}>
                            <Button
                              size="xs"
                              variant="ghost"
                              leftIcon={<Icon as={FiThumbsUp} boxSize={3} />}
                              color="green.600"
                              _hover={{ bg: "green.50" }}
                            >
                              {technique.likes}
                            </Button>
                            <Button
                              size="xs"
                              variant="ghost"
                              leftIcon={<Icon as={FiThumbsDown} boxSize={3} />}
                              color="red.600"
                              _hover={{ bg: "red.50" }}
                            >
                              {technique.dislikes}
                            </Button>
                          </HStack>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                </Card.Body>

                <Card.Footer>
                  <VStack align="stretch" w="full" gap={2}>
                    <Heading size="sm" color="gray.800">
                      Examples and Use-case
                    </Heading>
                    <Box
                      p={3}
                      bg="purple.50"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="purple.200"
                    >
                      <Text fontSize="xs" color="purple.800" mb={2} fontWeight="medium">
                        BST Memory Trick: Left Young, Right Old, Everyone at Max Tree Level
                      </Text>
                      <Text fontSize="xs" color="purple.700" lineHeight="1.4">
                        Left Tree: Left → Younger → smaller numbers, Right → Older → bigger numbers. Max Tree → every child is a new BST. SearchInsertDelete: Average log n, Worst n.
                      </Text>
                      <HStack justify="space-between" mt={2}>
                        <HStack gap={2}>
                          <Button
                            size="xs"
                            variant="ghost"
                            leftIcon={<Icon as={FiThumbsUp} boxSize={3} />}
                            color="green.600"
                            _hover={{ bg: "green.50" }}
                          >
                            5
                          </Button>
                          <Button
                            size="xs"
                            variant="ghost"
                            leftIcon={<Icon as={FiThumbsDown} boxSize={3} />}
                            color="red.600"
                            _hover={{ bg: "red.50" }}
                          >
                            0
                          </Button>
                        </HStack>
                      </HStack>
                    </Box>
                  </VStack>
                </Card.Footer>
              </Card.Root>
            </Box>
          </HStack>
        </Box>
      </Container>
    </Box>
  )
}