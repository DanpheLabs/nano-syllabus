import { useState } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Card,
  HStack,
  VStack,
  SimpleGrid,
  Progress,
  Tabs,
  Icon,
  Flex,
  Dialog,
  Portal,
} from "@chakra-ui/react"
import { FiPlay, FiBook, FiSettings } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

interface MyCoursesProps {
  onCourseSelect?: (courseId: string) => void
  onCreateCourse?: () => void
}

export function MyCourses({ onCourseSelect, onCreateCourse }: MyCoursesProps) {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [currentSemesters, setCurrentSemesters] = useState<{
    [courseId: string]: string
  }>({
    "1": "sem1", // Default current semester for course 1
    "2": "sem1", // Default current semester for course 2
  })

  const data = Cookies.get("token")
  console.log("data", data)

  // Available semesters 1-8
  const availableSemesters = Array.from({ length: 8 }, (_, i) => ({
    id: `sem${i + 1}`,
    name: `Semester ${i + 1}`,
    number: i + 1,
  }))

  const courses = [
    {
      id: "1",
      title: "B.E Electronics and Communication",
      department: "Engineering",
      semesters: availableSemesters.map((sem, index) => ({
        id: sem.id,
        name: sem.name,
        progress: index === 0 ? 20 : index === 1 ? 85 : index <= 3 ? 100 : 0,
        topicsCompleted:
          index === 0 ? 18 : index === 1 ? 95 : index <= 3 ? 100 : 0,
        status: getCurrentStatus(sem.id, "1", index),
      })),
    },
    {
      id: "2",
      title: "B.Tech Computer Science",
      department: "Engineering",
      semesters: availableSemesters.map((sem, index) => ({
        id: sem.id,
        name: sem.name,
        progress: index === 0 ? 45 : index === 1 ? 30 : 0,
        topicsCompleted: index === 0 ? 60 : index === 1 ? 40 : 0,
        status: getCurrentStatus(sem.id, "2", index),
      })),
    },
  ]

  function getCurrentStatus(semId: string, courseId: string, index: number) {
    const currentSem = currentSemesters[courseId]
    if (semId === currentSem) return "current"

    const currentSemNumber = parseInt(currentSem.replace("sem", ""))
    const thisSemNumber = index + 1

    if (thisSemNumber < currentSemNumber) return "completed"
    return "not-started"
  }

  // Get tab counts
  const getCurrentSemesters = () =>
    courses.flatMap((course) =>
      course.semesters.filter((sem) => sem.status === "current")
    )

  const getCompletedSemesters = () =>
    courses.flatMap((course) =>
      course.semesters.filter((sem) => sem.status === "completed")
    )

  const getAllSemesters = () => courses.flatMap((course) => course.semesters)

  const currentSemestersList = getCurrentSemesters()
  const completedSemestersList = getCompletedSemesters()
  const allSemestersList = getAllSemesters()

  // Handle semester selection
  const handleSemesterCardClick = (courseId: string) => {
    setSelectedCourse(courseId)
    setIsModalOpen(true)
  }

  const handleSemesterSelect = (semesterId: string) => {
    if (selectedCourse) {
      setCurrentSemesters((prev) => ({
        ...prev,
        [selectedCourse]: semesterId,
      }))
    }
    setIsModalOpen(false)
    setSelectedCourse(null)
  }

  // Semester Card Component
  const SemesterCard = ({
    semester,
    courseName,
    courseId,
  }: {
    semester: any
    courseName: string
    courseId: string
  }) => (
    <Card.Root
      maxW="400px"
      bg="white"
      borderColor="gray.200"
      borderWidth="1px"
      shadow="sm"
      cursor="pointer"
      _hover={{
        shadow: "lg",
        transform: "translateY(-2px)",
        borderColor: "blue.400",
      }}
      transition="all 0.2s"
    >
      <Card.Header pb={3}>
        <Heading size="lg" color="gray.800" mb={1}>
          {courseName}
        </Heading>
      </Card.Header>

      <Card.Body pt={0}>
        <VStack align="stretch" gap={4}>
          <Box>
            <Heading size="md" color="gray.800" mb={2}>
              {semester.name}
            </Heading>

            <Box mb={3}>
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" color="gray.600">
                  Progress
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="gray.800">
                  {semester.progress}%
                </Text>
              </HStack>
              <Progress.Root value={semester.progress} size="sm" bg="gray.200">
                <Progress.Track bg="gray.200">
                  <Progress.Range bg="blue.500" />
                </Progress.Track>
              </Progress.Root>
              <Text fontSize="xs" color="gray.500" mt={1}>
                {semester.topicsCompleted}% topics completed
              </Text>
            </Box>

            <Button
              w="full"
              colorScheme="blue"
              size="md"
              bg="blue.500"
              _hover={{ bg: "blue.600" }}
              onClick={() => {
                // Navigate to semester page
                navigate(`/semester/${courseId}/${semester.id}`)
                // Also call the callback if provided
                onCourseSelect?.(semester.id)
              }}
            >
              <Icon as={FiPlay} mr={2} />
              Continue
            </Button>
          </Box>
        </VStack>
      </Card.Body>
    </Card.Root>
  )

  return (
    <Box bg="white" minH="100vh" color="gray.800">
      <Container maxW="6xl" py={6}>
        <VStack gap={6} align="stretch">
          {/* Header */}
          <Flex align="center" justify="space-between">
            <Box>
              <Heading size="xl" color="gray.800" mb={1}>
                My Courses
              </Heading>
              <Text color="gray.600" fontSize="md">
                Manage your learning journey
              </Text>
            </Box>
            <Button
              colorScheme="blue"
              bg="blue.500"
              _hover={{ bg: "blue.600" }}
              onClick={() => {
                // Show dialog for first course by default, or could be enhanced to select course first
                setSelectedCourse("1")
                setIsModalOpen(true)
              }}
              px={4}
            >
              <Icon as={FiSettings} mr={2} />
              Set Current Semester
            </Button>
          </Flex>

          {/* Course Tabs */}
          <Tabs.Root
            defaultValue="current"
            variant="enclosed"
            colorScheme="blue"
          >
            <Tabs.List bg="gray.100" borderColor="gray.300" gap={2}>
              <Tabs.Trigger
                value="current"
                color="gray.600"
                _selected={{ color: "blue.600", bg: "white", borderColor: "blue.500" }}
                fontSize="sm"
                px={4}
                py={2}
              >
                Current ({currentSemestersList.length})
              </Tabs.Trigger>
              <Tabs.Trigger
                value="completed"
                color="gray.600"
                _selected={{ color: "blue.600", bg: "white", borderColor: "blue.500" }}
                fontSize="sm"
                px={4}
                py={2}
              >
                Completed ({completedSemestersList.length})
              </Tabs.Trigger>
              <Tabs.Trigger
                value="all"
                color="gray.600"
                _selected={{ color: "blue.600", bg: "white", borderColor: "blue.500" }}
                fontSize="sm"
                px={4}
                py={2}
              >
                All ({allSemestersList.length})
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="current" px={0} py={4}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                {courses.map((course) =>
                  course.semesters
                    .filter((sem) => sem.status === "current")
                    .map((semester) => (
                      <SemesterCard
                        key={`${course.id}-${semester.id}`}
                        semester={semester}
                        courseName={course.title}
                        courseId={course.id}
                      />
                    ))
                )}
              </SimpleGrid>
            </Tabs.Content>

            <Tabs.Content value="completed" px={0} py={4}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                {courses.map((course) =>
                  course.semesters
                    .filter((sem) => sem.status === "completed")
                    .map((semester) => (
                      <SemesterCard
                        key={`${course.id}-${semester.id}`}
                        semester={semester}
                        courseName={course.title}
                        courseId={course.id}
                      />
                    ))
                )}
              </SimpleGrid>
            </Tabs.Content>

            <Tabs.Content value="all" px={0} py={4}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                {courses.map((course) =>
                  course.semesters.map((semester) => (
                    <SemesterCard
                      courseId="1"
                      key={`${course.id}-${semester.id}`}
                      semester={semester}
                      courseName={course.title}
                    />
                  ))
                )}
              </SimpleGrid>
            </Tabs.Content>
          </Tabs.Root>

          {/* Empty State */}
          {courses.length === 0 && (
            <VStack py={12} gap={4}>
              <Icon as={FiBook} boxSize={16} color="gray.500" />
              <Heading size="md" color="white">
                No courses found
              </Heading>
              <Text color="gray.400" textAlign="center">
                Start your learning journey by enrolling in your first course
              </Text>
              <Button
                onClick={onCreateCourse}
                colorScheme="blue"
                bg="blue.500"
                _hover={{ bg: "blue.600" }}
              >
                Explore Courses
              </Button>
            </VStack>
          )}
        </VStack>
      </Container>

      {/* Semester Selection Dialog */}
      <Dialog.Root
        open={isModalOpen}
        onOpenChange={({ open }) => setIsModalOpen(open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              bg="gray.800"
              borderColor="gray.600"
              borderWidth="1px"
              maxW="md"
              borderRadius="md"
            >
              <Dialog.Header>
                <Dialog.Title color="white" fontSize="lg">
                  Select Current Semester
                </Dialog.Title>
                <Dialog.CloseTrigger
                  color="gray.400"
                  _hover={{ color: "white" }}
                />
              </Dialog.Header>

              <Dialog.Body py={4}>
                <VStack gap={3} align="stretch">
                  <Text color="gray.300" fontSize="sm" mb={2}>
                    Choose which semester you want to set as current:
                  </Text>

                  <SimpleGrid columns={2} gap={3}>
                    {availableSemesters.map((sem) => (
                      <Button
                        key={sem.id}
                        variant="outline"
                        borderColor="gray.600"
                        color="white"
                        _hover={{
                          borderColor: "blue.400",
                          bg: "blue.500",
                          color: "white",
                        }}
                        onClick={() => handleSemesterSelect(sem.id)}
                        bg={
                          selectedCourse &&
                          currentSemesters[selectedCourse] === sem.id
                            ? "blue.500"
                            : "transparent"
                        }
                      >
                        {sem.name}
                      </Button>
                    ))}
                  </SimpleGrid>
                </VStack>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  )
}
