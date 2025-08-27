import { useState } from "react"
import { VStack, HStack, Text, Box, Badge, Button } from "@chakra-ui/react"
import { BookOpen, GraduationCap } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function LearningLevelSelector({
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
  const [selectedLevel, setSelectedLevel] = useState("bachelor")

  const handleNext = () => {
    if (onNext) {
      onNext({ learningLevel: selectedLevel })
    }
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    }
  }

  const levels = [
    { value: "high-school", label: "High School" },
    { value: "bachelor", label: "Bachelor's Degree" },
    { value: "master", label: "Master's Degree" },
    { value: "phd", label: "PhD" },
  ]

  // Map levels to display options with icons and labels
  const levelOptions = [
    {
      value: "high-school",
      label: "K-12 (School)",
      icon: BookOpen,
      description: "Elementary to High School",
    },
    {
      value: "bachelor",
      label: "Academia (University)",
      icon: GraduationCap,
      description: "Bachelor's to PhD level",
    },
  ]

  return (
    <VStack justify="center" align="center" p={8} gap={8}>
      <VStack maxW="3xl" w="full" gap={8}>
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
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            color="gray.900"
            lineHeight="1.2"
          >
            What's the learning level for the account?
          </Text>
          <Text fontSize="lg" color="gray.600" maxW="2xl">
            This helps us tailor the depth of the content to your needs.
          </Text>
        </VStack>

        {/* Learning level options */}
        <HStack gap={8} justify="center" wrap="wrap">
          {levelOptions.map((option) => {
            const Icon = option.icon
            const isSelected =
              selectedLevel === option.value ||
              ((selectedLevel === "master" || selectedLevel === "phd") &&
                option.value === "bachelor")

            return (
              <Box
                key={option.value}
                as="button"
                onClick={() => setSelectedLevel(option.value)}
                w="200px"
                h="200px"
                borderRadius="full"
                border="3px solid"
                borderColor={isSelected ? "#4540ee" : "gray.300"}
                bg={isSelected ? "#4540ee" : "white"}
                color={isSelected ? "white" : "gray.600"}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                transition="all 0.3s ease"
                _hover={{
                  transform: "scale(1.05)",
                  borderColor: isSelected ? "#4540ee" : "#4540ee",
                  color: isSelected ? "white" : "#4540ee",
                  boxShadow: "lg",
                }}
                _active={{
                  transform: "scale(0.95)",
                }}
                boxShadow={isSelected ? "lg" : "none"}
              >
                <VStack gap={3}>
                  <Icon
                    size={36}
                    color={isSelected ? "white" : "currentColor"}
                  />
                 
                </VStack>
                 <VStack gap={1}>
                    <Text
                      fontSize="12"
                      fontWeight="bold"
                      color={isSelected ? "white" : "gray.700"}
                      textAlign="center"
                    >
                      {option.label}
                    </Text>
                    <Text
                      fontSize="12px"
                      color={isSelected ? "whiteAlpha.800" : "gray.500"}
                      textAlign="center"
                    >
                      {option.description}
                    </Text>
                  </VStack>
              </Box>
            )
          })}
          <Progress value={progress} className="h-2" />
        </HStack>

        {/* Detailed level selector */}
        

        {/* Selected indicator */}
        
        {/* Navigation Buttons */}
        <HStack justify="space-between" w="full" maxW="3xl" mt={8}>
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            borderRadius="full"
            px={8}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            bg="#4540ee"
            color="white"
            _hover={{ bg: "black" }}
            borderRadius="full"
            px={8}
            disabled={!selectedLevel}
          >
            Next
          </Button>
        </HStack>
      
      </VStack>
    </VStack>
  )
}
