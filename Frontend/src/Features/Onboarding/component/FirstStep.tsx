import { useState } from "react"
import { VStack, HStack, Text, Box, Badge, Button } from "@chakra-ui/react"
import { GraduationCap, BookOpen, Briefcase } from "lucide-react"
import { Progress } from "@/components/ui/progress"


export default function AccountTypeSelector({
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
  const [selectedType, setSelectedType] = useState("Student")

  const handleNext = () => {
    if (onNext) {
      onNext({ accountType: selectedType })
    }
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    }
  }

  const accountTypes = [
    {
      id: "Student",
      label: "Student",
      icon: GraduationCap,
    },
    {
      id: "Teacher",
      label: "Teacher",
      icon: BookOpen,
    },
    {
      id: "Professional",
      label: "Professional",
      icon: Briefcase,
    },
  ]

  return (
    <VStack justify="center" align="center" p={8} gap={8}>
      <VStack maxW="2xl" w="full" gap={8}>
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
          >
            Who are you?
          </Text>
          <Text fontSize="lg" color="gray.600">
            Tell us what type of account you'd be opening.
          </Text>
        </VStack>

        {/* Account type options */}
        <HStack gap={6} justify="center" wrap="wrap">
          {accountTypes.map((type) => {
            const Icon = type.icon
            const isSelected = selectedType === type.id

            return (
              <Box
                key={type.id}
                as="button"
                onClick={() => setSelectedType(type.id)}
                w="160px"
                h="160px"
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
                {/* <Text color={"#4540ee"}>Step {currentStep}</Text> */}
                <VStack gap={2}>
                  <Icon
                    size={32}
                    color={isSelected ? "white" : "currentColor"}
                  />
                  <Text
                    fontSize="lg"
                    fontWeight="medium"
                    color={isSelected ? "white" : "gray.700"}
                  >
                    {type.label}
                    {/* <Text color={"#4540ee"}>Step {currentStep}</Text> */}
                  </Text>
                </VStack>
                {/* <Text color={"#4540ee"}>Step {currentStep}</Text> */}
              </Box>
            )
          })}
          <Progress value={progress} className="h-2" />
        </HStack>

        {/* Selected indicator */}
        
        {/* Navigation Buttons */}
        <HStack justify="space-between" w="full" maxW="2xl" mt={8}>
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
            disabled={!selectedType}
          >
            Next
          </Button>
        </HStack>
      </VStack>
    </VStack>
  )
}
