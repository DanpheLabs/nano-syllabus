import React from "react"
import {
  Box,
  Card,
  Button,
  Progress,
  Text,
  Heading,
  VStack,
  HStack,
  Grid,
  Icon,
  Flex,
  Badge,
  Avatar,
} from "@chakra-ui/react"
import {
  TrendingUp,
  BookOpen,
  Clock,
  Trophy,
  Calendar,
  Brain,
  Zap,
  Target,
  ArrowRight,
  Flame,
  Star,
  Award,
  Activity,
  Play,
  ChevronRight,
} from "lucide-react"

export function Dashboard() {
  const recentActivity = [
    {
      subject: "Data Structures",
      topic: "Binary Trees & Traversal",
      progress: 85,
      time: "2h ago",
      color: "purple.500",
      bg: "purple.50",
    },
    {
      subject: "Machine Learning",
      topic: "Neural Networks",
      progress: 60,
      time: "1d ago",
      color: "blue.500",
      bg: "blue.50",
    },
    {
      subject: "System Design",
      topic: "Microservices Architecture",
      progress: 95,
      time: "2d ago",
      color: "green.500",
      bg: "green.50",
    },
  ]

  const stats = [
    {
      label: "Learning Streak",
      value: "28",
      unit: "days",
      icon: Flame,
      color: "orange.500",
      bg: "orange.50",
      trend: "+5 from last week",
    },
    {
      label: "Courses Active",
      value: "8",
      unit: "courses",
      icon: BookOpen,
      color: "blue.500",
      bg: "blue.50",
      trend: "2 completed this month",
    },
    {
      label: "Study Time",
      value: "142",
      unit: "hours",
      icon: Clock,
      color: "green.500",
      bg: "green.50",
      trend: "32h this week",
    },
    {
      label: "Global Rank",
      value: "#23",
      unit: "top 5%",
      icon: Trophy,
      color: "purple.500",
      bg: "purple.50",
      trend: "↑12 positions",
    },
  ]

  const quickActions = [
    {
      title: "AI Study Assistant",
      description: "Get personalized learning recommendations",
      icon: Brain,
      color: "blue.500",
      bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      buttonText: "Start Session",
      isNew: true,
    },
    {
      title: "Practice Arena",
      description: "Solve coding challenges and compete",
      icon: Target,
      color: "green.500",
      bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      buttonText: "Enter Arena",
    },
    {
      title: "Memory Palace",
      description: "Master complex topics with visual techniques",
      icon: Zap,
      color: "orange.500",
      bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      buttonText: "Explore",
    },
  ]

  return (
    <Box p={6} maxW="7xl" mx="auto" bg="gray.50" minH="100vh">
      {/* Welcome Header */}
      <Card.Root mb={8} overflow="hidden" shadow="xl" border="none">
        <Box
          bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          color="white"
          position="relative"
        >
          <Box
            position="absolute"
            top="0"
            right="0"
            w="200px"
            h="200px"
            opacity="0.1"
          >
            <Icon as={Star} w="full" h="full" />
          </Box>
          <Card.Body p={8} position="relative" zIndex={1}>
            <Flex justify="space-between" align="center">
              <VStack align="start" gap={3}>
                <HStack gap={3}>
                  <Avatar.Root size="lg">
                    <Avatar.Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Prashant" />
                    <Avatar.Fallback>P</Avatar.Fallback>
                  </Avatar.Root>
                  <VStack align="start" gap={1}>
                    <Heading size="xl" fontWeight="bold">
                      Welcome back, Prashant! 👋
                    </Heading>
                    <Text opacity={0.9} fontSize="lg">
                      Ready to level up your skills today?
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
              <VStack align="end" gap={2}>
                <HStack gap={2}>
                  <Icon as={Flame} w={6} h={6} color="orange.300" />
                  <VStack gap={0} align="end">
                    <Text fontSize="3xl" fontWeight="black" lineHeight="1">
                      28
                    </Text>
                    <Text fontSize="sm" opacity={0.9} lineHeight="1">
                      day streak
                    </Text>
                  </VStack>
                </HStack>
                <Badge
                  colorScheme="orange"
                  variant="solid"
                  rounded="full"
                  px={3}
                  py={1}
                >
                  🔥 On Fire!
                </Badge>
              </VStack>
            </Flex>
          </Card.Body>
        </Box>
      </Card.Root>

      {/* Stats Grid */}
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
        mb={8}
      >
        {stats.map((stat, index) => (
          <Card.Root
            key={index}
            bg="white"
            shadow="lg"
            border="none"
            _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
            transition="all 0.3s"
            cursor="pointer"
          >
            <Card.Body p={6} gap={4}>
              <HStack justify="space-between">
                <Box
                  w={12}
                  h={12}
                  bg={stat.bg}
                  rounded="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={stat.icon} w={6} h={6} color={stat.color} />
                </Box>
                <Icon as={TrendingUp} w={4} h={4} color="green.500" />
              </HStack>
              <VStack align="start" gap={1}>
                <HStack align="baseline" gap={1}>
                  <Text fontSize="3xl" fontWeight="black" color="gray.900">
                    {stat.value}
                  </Text>
                  <Text fontSize="sm" color="gray.500" fontWeight="medium">
                    {stat.unit}
                  </Text>
                </HStack>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  {stat.label}
                </Text>
                <Text fontSize="xs" color="green.600" fontWeight="semibold">
                  {stat.trend}
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>
        ))}
      </Grid>

      {/* Main Content Grid */}
      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8} mb={8}>
        {/* Recent Activity */}
        <Card.Root bg="white" shadow="lg" border="none">
          <Card.Header p={6} pb={4}></Card.Header>
          <Card.Body px={6} pb={6} gap={4}>
            {/* Quick Actions */}
            <VStack gap={6}>
              {quickActions.map((action, index) => (
                <Card.Root
                  key={index}
                  overflow="hidden"
                  shadow="xl"
                  border="none"
                  _hover={{ transform: "translateY(-4px)", shadow: "2xl" }}
                  transition="all 0.3s"
                  cursor="pointer"
                  position="relative"
                  w="full"
                >
                  <Box bg={action.bg} color="white" position="relative">
                    {action.isNew && (
                      <Badge
                        position="absolute"
                        top={4}
                        right={4}
                        colorScheme="red"
                        variant="solid"
                        rounded="full"
                        fontSize="xs"
                        zIndex={2}
                      >
                        NEW
                      </Badge>
                    )}
                    <Box
                      position="absolute"
                      top="0"
                      right="0"
                      w="80px"
                      h="80px"
                      opacity="0.2"
                    >
                      <Icon as={action.icon} w="full" h="full" />
                    </Box>
                    <Card.Body p={6} gap={3} position="relative" zIndex={1}>
                      <Icon as={action.icon} w={8} h={8} color="white" />
                      <VStack align="start" gap={2}>
                        <Card.Title
                          fontSize="md"
                          fontWeight="bold"
                          color="white"
                        >
                          {action.title}
                        </Card.Title>
                        <Card.Description
                          color="white"
                          opacity="0.9"
                          fontSize="sm"
                        >
                          {action.description}
                        </Card.Description>
                      </VStack>
                      <Button
                        variant="solid"
                        bg="white"
                        color="gray.900"
                        size="sm"
                        w="full"
                        fontWeight="bold"
                        _hover={{ bg: "gray.100" }}
                        mt={2}
                      >
                        <Play size={16} />
                        {action.buttonText}
                      </Button>
                    </Card.Body>
                  </Box>
                </Card.Root>
              ))}
            </VStack>
          </Card.Body>
        </Card.Root>

        {/* Quick Actions */}
        <VStack gap={4} align="stretch" backgroundColor={"white"} padding={4}>
          <HStack justify="space-between">
            <HStack gap={3}>
              <Box
                w={10}
                h={10}
                bg="blue.50"
                rounded="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={Activity} w={5} h={5} color="blue.500" />
              </Box>
              <Text fontSize="xl" fontWeight="bold">
                Recent Progress
              </Text>
            </HStack>
            <Button size="sm" variant="ghost">
              <ArrowRight size={16} />
              View All
            </Button>
          </HStack>
          {recentActivity.map((activity, index) => (
            <Box
              key={index}
              p={5}
              rounded="xl"
              bg={activity.bg}
              border="1px"
              borderColor="gray.100"
              _hover={{ shadow: "md" }}
              transition="all 0.2s"
            >
              <HStack justify="space-between" align="center" mb={3}>
                <VStack align="start" gap={1} flex="1">
                  <HStack gap={2}>
                    <Badge
                      colorScheme={activity.color.split(".")[0]}
                      variant="solid"
                      rounded="full"
                      px={2}
                      py={1}
                      fontSize="xs"
                    >
                      {activity.subject}
                    </Badge>
                    <Text fontSize="xs" color="gray.500">
                      {activity.time}
                    </Text>
                  </HStack>
                  <Text fontWeight="bold" fontSize="md" color="gray.900">
                    {activity.topic}
                  </Text>
                </VStack>
                <Button
                  size="sm"
                  colorScheme={activity.color.split(".")[0]}
                  variant="solid"
                  rounded="full"
                >
                  Continue
                </Button>
              </HStack>
              <HStack gap={3}>
                <Progress.Root
                  value={activity.progress}
                  flex="1"
                  size="md"
                  colorScheme={activity.color.split(".")[0]}
                >
                  <Progress.Track bg="white" rounded="full">
                    <Progress.Range rounded="full" />
                  </Progress.Track>
                </Progress.Root>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color={activity.color}
                  minW="45px"
                >
                  {activity.progress}%
                </Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Grid>
    </Box>
  )
}
