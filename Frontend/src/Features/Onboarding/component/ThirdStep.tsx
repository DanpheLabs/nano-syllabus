import React, { useState } from "react"
import {
  Box,
  VStack,
  HStack,
  Text,
  Circle,
  Icon,
  Container,
  SimpleGrid,
  Button,
} from "@chakra-ui/react"
import { FaGraduationCap, FaBookOpen, FaAward } from "react-icons/fa"
import { Progress } from "@/components/ui/progress"
const ThirdStep = ({ 
  progress, 
  currentStep,
  learningLevel,
  onNext,
  onBack,
}: {
  progress: any
  currentStep: any
  learningLevel?: string
  onNext?: (data: any) => void
  onBack?: () => void
}) => {
  const [selectedLevel, setSelectedLevel] = useState(null)

  const handleNext = () => {
    if (onNext) {
      onNext({ currentLevelOfStudy: selectedLevel })
    }
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    }
  }

  const levels = [
    {
      id: "bachelors",
      label: "Bachelor's",
      icon: FaGraduationCap,
    },
    {
      id: "masters",
      label: "Master's",
      icon: FaBookOpen,
    },
    {
      id: "phd",
      label: "PhD",
      icon: FaAward,
    },
  ]

  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId)
  }

  // Show K-12 interface if learning level is "high-school", otherwise show academic interface
  const isK12 = learningLevel === "high-school"

  return (
    <Box bg="gray.50" minH="100vh" py={16}>
      <Container maxW="2xl" centerContent>
        <VStack gap={12} textAlign="center">
          {/* Step indicator */}
          <Text
            fontSize="2xl"
            fontWeight="medium"
            color="purple.400"
            letterSpacing="wide"
          >
            Step 3
          </Text>

          {/* Main heading */}
          <VStack gap={4}>
            <Text
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="bold"
              color="gray.800"
              lineHeight="shorter"
            >
              What's the learning level for the account?
            </Text>

            <Text fontSize="xl" color="gray.600" maxW="lg">
              This helps us tailor the depth of the content to your needs.
            </Text>
          </VStack>
          {
            isK12 ? <Demo selectedLevel={selectedLevel} onLevelChange={setSelectedLevel} /> :

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="full">
            {levels.map((level) => (
              <VStack
                key={level.id}
                as="button"
                onClick={() => handleLevelSelect(level.id)}
                bg="white"
                border="2px solid"
                borderColor={
                  selectedLevel === level.id ? "purple.500" : "gray.200"
                }
                borderRadius="2xl"
                p={8}
                gap={6}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  transform: "translateY(-4px)",
                  shadow: "lg",
                  borderColor:
                    selectedLevel === level.id ? "purple.500" : "gray.300",
                }}
                _active={{
                  transform: "translateY(-2px)",
                }}
                position="relative"
                minH="200px"
                justifyContent="center"
              >
                {/* Icon circle */}
                <Circle
                  size="80px"
                  bg="gray.50"
                  border="2px solid"
                  borderColor={
                    selectedLevel === level.id ? "purple.500" : "gray.200"
                  }
                >
                  <Icon
                    as={level.icon}
                    boxSize={8}
                    color={
                      selectedLevel === level.id ? "purple.500" : "gray.500"
                    }
                  />
                </Circle>

                {/* Label */}
                <Text
                  fontSize="xl"
                  fontWeight="semibold"
                  color={selectedLevel === level.id ? "purple.500" : "gray.700"}
                >
                  {level.label}
                </Text>

                {/* Selected indicator */}
                {selectedLevel === level.id && (
                  <Box
                    position="absolute"
                    top={3}
                    right={3}
                    w={3}
                    h={3}
                    bg="purple.500"
                    borderRadius="full"
                  />
                )}
              </VStack>
            ))}
          </SimpleGrid>

                  }

          <Progress value={progress} className="h-2" />

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
              disabled={!selectedLevel}
            >
              Next
            </Button>
          </HStack>

          {/* Continue button */}
      
        </VStack>
      </Container>
    </Box>
  )
}

export default ThirdStep

import { Portal, Select, createListCollection } from "@chakra-ui/react"

const Demo = ({ selectedLevel, onLevelChange }: { selectedLevel: any, onLevelChange: (value: any) => void }) => {
  return (
    <Select.Root collection={grades} size="sm" width="320px" value={[selectedLevel]} onValueChange={(e) => onLevelChange(e.value[0])}>
      <Select.HiddenSelect />
      <Select.Label alignSelf={"self-start"} color="gray.700" fontWeight="500">
        Select Class
      </Select.Label>
      <Select.Control
        border={"1px solid"}
        borderColor={"gray.300"}
        borderRadius="md"
        _focus={{
          borderColor: "#8B5CF6",
          boxShadow: "0 0 0 1px #8B5CF6",
        }}
      >
        <Select.Trigger>
          <Select.ValueText
            paddingLeft={4}
            placeholder="Select class"
            color="gray.600"
          />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator color="#8B5CF6" />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            boxShadow="lg"
          >
            {grades.items.map((grade) => (
              <Select.Item
                item={grade}
                key={grade.value}
                _hover={{
                  bg: "#8B5CF6",
                  color: "white",
                }}
                _selected={{
                  bg: "#8B5CF6",
                  color: "white",
                }}
                px={3}
                py={2}
              >
                {grade.label}
                <Select.ItemIndicator color="white" />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

const grades = createListCollection({
  items: [
    { label: "Grade 1", value: "grade1" },
    { label: "Grade 2", value: "grade2" },
    { label: "Grade 3", value: "grade3" },
    { label: "Grade 4", value: "grade4" },
    { label: "Grade 5", value: "grade5" },
    { label: "Grade 6", value: "grade6" },
    { label: "Grade 7", value: "grade7" },
    { label: "Grade 8", value: "grade8" },
    { label: "Grade 9", value: "grade9" },
    { label: "Grade 10", value: "grade10" },
    { label: "Grade 11", value: "grade11" },
    { label: "Grade 12", value: "grade12" },
  ],
})