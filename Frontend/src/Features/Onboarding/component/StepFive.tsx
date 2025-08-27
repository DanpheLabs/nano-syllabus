import { useState } from "react"
import { VStack, HStack, Text, Box, Badge, Button } from "@chakra-ui/react"
import { Target, BookOpen, Trophy, Brain, Globe, Briefcase } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function LearningGoalSelector({
  progress,
  currentStep,
  onNext,
  onBack,
}: {
  progress: any
  currentStep: any
  onNext?: (data: any) => void
  onBack?: () => void
}) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    )
  }

  const handleNext = () => {
    if (onNext) {
      onNext({ learningGoals: selectedGoals })
    }
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    }
  }

 const learningGoals = [
   {
     id: "academic",
     label: "Academic Success",
     description: "Improve grades & test scores",
     icon: Trophy,
   },
   {
     id: "skill",
     label: "Skill Development",
     description: "Learn new abilities",
     icon: Brain,
   },
   {
     id: "career",
     label: "Career Growth",
     description: "Advance professionally",
     icon: Briefcase,
   },
   {
     id: "personal",
     label: "Personal Interest",
     description: "Learn for fun & curiosity",
     icon: BookOpen,
   },
 ]

  return (
    <VStack
      justify="center"
      align="center"
      p={8}
      gap={8}
      bg="gray.50"
      minH="100vh"
    >
      <VStack maxW="4xl" w="full" gap={8}>
        {/* Step indicator */}
        <Badge
          colorScheme="purple"
          variant="subtle"
          px={4}
          py={2}
          borderRadius="full"
          fontSize="sm"
          fontWeight="medium"
        >
          Step {currentStep}
        </Badge>

        {/* Main heading */}
        <VStack gap={4} textAlign="center">
          <Text
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="bold"
            color="gray.900"
            lineHeight="shorter"
          >
            What's your learning goal?
          </Text>
          <Text fontSize="xl" color="gray.600" maxW="2xl">
            Tell us what you want to achieve so we can personalize your learning
            experience.
          </Text>
        </VStack>

        {/* Learning goal options */}
        <VStack gap={6} w="full">
          {/* First row - 3 items */}
          <HStack gap={6} justify="center" wrap="wrap">
            {learningGoals.slice(0, 3).map((goal) => {
              const Icon = goal.icon
              const isSelected = selectedGoals.includes(goal.id)

              return (
                <Box
                  key={goal.id}
                  as="button"
                  onClick={() => toggleGoal(goal.id)}
                  w="200px"
                  h="180px"
                  borderRadius="xl"
                  border="2px solid"
                  borderColor={isSelected ? "#8B5CF6" : "gray.300"}
                  bg={isSelected ? "#8B5CF6" : "white"}
                  color={isSelected ? "white" : "gray.600"}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-4px)",
                    borderColor: isSelected ? "#8B5CF6" : "#8B5CF6",
                    color: isSelected ? "white" : "#8B5CF6",
                    boxShadow: "xl",
                  }}
                  _active={{
                    transform: "translateY(-2px)",
                  }}
                  boxShadow={isSelected ? "xl" : "md"}
                  p={6}
                >
                  <VStack gap={3}>
                    <Icon
                      size={36}
                      color={isSelected ? "white" : "currentColor"}
                    />
                    <VStack gap={1}>
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color={isSelected ? "white" : "gray.800"}
                      >
                        {goal.label}
                      </Text>
                      <Text
                        fontSize="sm"
                        color={isSelected ? "white" : "gray.600"}
                        textAlign="center"
                      >
                        {goal.description}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              )
            })}
          </HStack>

          {/* Second row - 3 items */}
          <HStack gap={6} justify="center" wrap="wrap">
            {learningGoals.slice(3, 6).map((goal) => {
              const Icon = goal.icon
              const isSelected = selectedGoals.includes(goal.id)

              return (
                <Box
                  key={goal.id}
                  as="button"
                  onClick={() => toggleGoal(goal.id)}
                  w="200px"
                  h="180px"
                  borderRadius="xl"
                  border="2px solid"
                  borderColor={isSelected ? "#8B5CF6" : "gray.300"}
                  bg={isSelected ? "#8B5CF6" : "white"}
                  color={isSelected ? "white" : "gray.600"}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-4px)",
                    borderColor: isSelected ? "#8B5CF6" : "#8B5CF6",
                    color: isSelected ? "white" : "#8B5CF6",
                    boxShadow: "xl",
                  }}
                  _active={{
                    transform: "translateY(-2px)",
                  }}
                  boxShadow={isSelected ? "xl" : "md"}
                  p={6}
                >
                  <VStack gap={3}>
                    <Icon
                      size={36}
                      color={isSelected ? "white" : "currentColor"}
                    />
                    <VStack gap={1}>
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color={isSelected ? "white" : "gray.800"}
                      >
                        {goal.label}
                      </Text>
                      <Text
                        fontSize="sm"
                        color={isSelected ? "white" : "gray.600"}
                        textAlign="center"
                      >
                        {goal.description}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              )
            })}
          </HStack>
        </VStack>

        {/* Progress bar */}
        <Box w="full" maxW="md">
          <Progress value={progress} className="h-2" />
        </Box>

        <HStack justify="space-between" width="100%" mt={8}>
          <Button variant="ghost" onClick={handleBack}>
            Back
          </Button>
          <Button 
            colorScheme="blue" 
            onClick={handleNext}
            disabled={selectedGoals.length === 0}
          >
            Complete
          </Button>
        </HStack>
      </VStack>
    </VStack>
  )
}
