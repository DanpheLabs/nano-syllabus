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
import { Portal, Select, createListCollection } from "@chakra-ui/react"

const FourStep = ({
  progress,
  currentStep,
  onNext,
  onBack,
}: {
  progress: any
  currentStep: any
  onNext?: (data: any) => void
  onBack?: () => void
}) => {
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState("")

  const handleNext = () => {
    if (onNext) {
      onNext({ preferredLanguage: selectedLanguage })
    }
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    }
  }

  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId)
  }

  const [isChild, setChild] = useState(false)

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
            Step 4
          </Text>

          {/* Main heading */}
          <VStack gap={4}>
            <Text
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="bold"
              color="gray.800"
              lineHeight="shorter"
            >
              What's your preferred language for learning?
            </Text>

            <Text fontSize="xl" color="gray.600" maxW="lg">
              We'll customize your learning experience to your preferred
              language.
            </Text>
          </VStack>
          <Demo selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />

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
              disabled={!selectedLanguage}
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

export default FourStep

const Demo = ({ selectedLanguage, onLanguageChange }: { selectedLanguage: string, onLanguageChange: (value: string) => void }) => {
  return (
    <Select.Root collection={languages} size="sm" width="320px" value={[selectedLanguage]} onValueChange={(e) => onLanguageChange(e.value[0])}>
      <Select.HiddenSelect />
      <Select.Label alignSelf={"self-start"} color="gray.700" fontWeight="500">
        Select Language
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
            placeholder="Select language"
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
            {languages.items.map((language) => (
              <Select.Item
                item={language}
                key={language.value}
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
                {language.label}
                <Select.ItemIndicator color="white" />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

const languages = createListCollection({
  items: [
    { label: "English", value: "english" },
    { label: "Mandarin Chinese", value: "mandarin" },
    { label: "Hindi", value: "hindi" },
    { label: "Spanish", value: "spanish" },
    { label: "French", value: "french" },
    { label: "Standard Arabic", value: "arabic" },
    { label: "Bengali", value: "bengali" },
    { label: "Portuguese", value: "portuguese" },
    { label: "Russian", value: "russian" },
    { label: "Urdu", value: "urdu" },
    { label: "Indonesian", value: "indonesian" },
    { label: "German", value: "german" },
    { label: "Japanese", value: "japanese" },
    { label: "Swahili", value: "swahili" },
    { label: "Marathi", value: "marathi" },
    { label: "Telugu", value: "telugu" },
    { label: "Turkish", value: "turkish" },
    { label: "Korean", value: "korean" },
    { label: "Tamil", value: "tamil" },
    { label: "Vietnamese", value: "vietnamese" },
    { label: "Italian", value: "italian" },
    { label: "Gujarati", value: "gujarati" },
    { label: "Persian", value: "persian" },
    { label: "Bhojpuri", value: "bhojpuri" },
    { label: "Min Chinese", value: "min_chinese" },
    { label: "Hakka Chinese", value: "hakka_chinese" },
    { label: "Jin Chinese", value: "jin_chinese" },
    { label: "Hausa", value: "hausa" },
    { label: "Kannada", value: "kannada" },
    { label: "Polish", value: "polish" },
    { label: "Nepali", value: "nepali" },
  ],
})
