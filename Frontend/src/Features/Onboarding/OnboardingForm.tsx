import { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Button,
  Flex,
  Text,
  Input,
  VStack,
  HStack,
  Container,
  Field,
} from "@chakra-ui/react"
import { FcGoogle } from "react-icons/fc"
import AccountTypeSelector from "./component/FirstStep"
import LearningLevelSelector from "./component/SecondStep"
import ThirdStep from "./component/ThirdStep"
import FourStep from "./component/FourStep"
import StepFive from "./component/StepFive"
import OnboardingSidbar from "./component/OnboardingSidebar"
import OnboardingHeader from "./component/OnboardingHeader"
import axiosInstance from "@/services/axios"
import { useOnboarding } from "./hooks/useOnboarding"
import type { OnboardingData } from "./api"
import { CurrentLevelOfStudy } from "./api"
import { useAuthContext } from "@/hooks/useAuthContext"

interface FormValues {
  fullName: string
  email: string
  password: string
}

const PasswordInput = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Box position="relative" w="full">
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        size="lg"
        fontSize="lg"
        borderColor="gray.300"
        border="1px solid"
        paddingLeft={2}
        _focus={{
          borderColor: "purple.500",
          boxShadow: "0 0 0 1px var(--chakra-colors-purple-500)",
        }}
        pr="3rem"
      />
      <Button
        position="absolute"
        right="0.5rem"
        top="50%"
        transform="translateY(-50%)"
        variant="ghost"
        size="sm"
        onClick={() => setShowPassword(!showPassword)}
        color="gray.400"
        _hover={{ color: "gray.600" }}
        minW="auto"
        h="auto"
        p={1}
      >
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </Button>
    </Box>
  )
}

export default function OnboardingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const { setIsAuthenticated } = useAuthContext()

  const navigate = useNavigate()
  const { submitOnboarding, isLoading, isError, error } = useOnboarding()

  const [currentStep, setCurrentStep] = useState(0) // 0 = initial form, 1-5 = onboarding steps
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    accountType: "",
    learningLevel: "",
    currentLevelOfStudy: "",
    preferredLanguage: "",
    learningGoals: [],
  })

  // API call to test connection
  const testApiConnection = async () => {
    try {
      const response = await axiosInstance.get("/health")
      console.log("API connection successful:", response.data)
    } catch (error) {
      console.error("Error connecting to API:", error)
      console.error("Make sure the backend server is running on port 3000")
    }
  }

  useEffect(() => {
    testApiConnection()
  }, [])

  const onSubmit = (data: FormValues) => {
    console.log("Form validation passed!")
    console.log("Form submitted successfully!")
    console.log(data)
    setFormData((prev) => ({ ...prev, ...data }))
    setCurrentStep(1) // Move to first onboarding step
  }

  const onError = (errors: any) => {
    console.log("Form validation failed:", errors)
  }

  const handleStepComplete = (stepData: any) => {
    console.log("Step completed with data:", stepData)
    const updatedFormData = { ...formData, ...stepData }
    setFormData(updatedFormData)

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit onboarding data when all steps are complete
      console.log("Onboarding complete! Final data:", updatedFormData)

      // Transform the data to match the API interface
      const onboardingData: OnboardingData = {
        email: updatedFormData.email,
        password: updatedFormData.password,
        fullName: updatedFormData.fullName,
        isOnboarded: true,
        current_level_of_study:
          updatedFormData.learningLevel === "high-school"
            ? CurrentLevelOfStudy.HighSchool
            : CurrentLevelOfStudy.Academia,
        what_program_studying: updatedFormData.currentLevelOfStudy || "",
        learning_goals: Array.isArray(updatedFormData.learningGoals)
          ? updatedFormData.learningGoals
          : [],
        language: updatedFormData.preferredLanguage || "English",
        isPremium: false,
      }

      // Submit using TanStack Query hook
      submitOnboarding(onboardingData)
      setIsAuthenticated(true)
      navigate("/dashboard")
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = currentStep === 0 ? 0 : (currentStep / 5) * 100

  return (
    <Flex minH="100vh">
      {/* Left Side - Testimonial */}
      <OnboardingSidbar />

      <Box w="60%" bg="white">
        {/* Header */}
        <OnboardingHeader />

        {currentStep === 0 ? (
          // Initial registration form
          <Flex flex={1} direction="column" justify="center" px={8} pb={8}>
            <Container maxW="md" centerContent>
              <VStack gap={8} w="full">
                <VStack gap={2} textAlign="center">
                  <Text
                    fontSize="4xl"
                    alignSelf={"start"}
                    fontWeight="bold"
                    color="gray.900"
                  >
                    Create your account
                  </Text>
                  <Text color="gray.500" fontSize="lg" alignSelf={"start"}>
                    Enhance your learning experience.
                  </Text>
                </VStack>

                <VStack
                  gap={6}
                  w="full"
                  as="form"
                  onSubmit={handleSubmit(onSubmit, onError)}
                >
                  {/* Full Name Field */}
                  <Field.Root invalid={!!errors.fullName} w="full">
                    <Field.Label
                      fontSize={20}
                      fontWeight={"normal"}
                      letterSpacing={1}
                    >
                      Full name
                    </Field.Label>
                    <Input
                      {...register("fullName", {
                        required: "Full name is required",
                      })}
                      paddingLeft={2}
                      placeholder="Enter full name"
                      size="lg"
                      fontSize="lg"
                      border={"1px solid"}
                      borderColor="gray.300"
                      _focus={{
                        borderColor: "purple.500",
                        boxShadow: "0 0 0 1px var(--chakra-colors-purple-500)",
                      }}
                    />
                    <Field.ErrorText>
                      {errors.fullName?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  {/* Email Field */}
                  <Field.Root invalid={!!errors.email} w="full">
                    <Field.Label
                      fontSize={20}
                      fontWeight={"normal"}
                      letterSpacing={1}
                    >
                      Email
                    </Field.Label>
                    <Input
                      paddingLeft={2}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                      type="email"
                      placeholder="Enter your email"
                      size="lg"
                      fontSize="lg"
                      borderColor="gray.300"
                      border={"1px solid"}
                      _focus={{
                        borderColor: "purple.500",
                        boxShadow: "0 0 0 1px var(--chakra-colors-purple-500)",
                      }}
                    />
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                  </Field.Root>

                  {/* Password Field */}
                  <Field.Root invalid={!!errors.password} w="full">
                    <Field.Label
                      fontSize={20}
                      fontWeight={"normal"}
                      letterSpacing={1}
                    >
                      Password
                    </Field.Label>
                    <Input
                      {...register("password", {
                        required: "Password is required",
                      })}
                      paddingLeft={2}
                      placeholder="Enter password"
                      size="lg"
                      type="password"
                      fontSize="lg"
                      border={"1px solid"}
                      borderColor="gray.300"
                      _focus={{
                        borderColor: "purple.500",
                        boxShadow: "0 0 0 1px var(--chakra-colors-purple-500)",
                      }}
                    />
                    <Field.ErrorText>
                      {errors.password?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  {/* OR Divider */}
                  <HStack w="full" align="center" py={4}>
                    <Box
                      width={"150px"}
                      height={"1px"}
                      backgroundColor={"gray"}
                      borderRadius="md"
                    ></Box>
                    <Text px={4} color="black" fontSize="sm" minW="max-content">
                      OR
                    </Text>
                    <Box
                      width={"150px"}
                      height={"1px"}
                      backgroundColor={"gray"}
                      borderRadius="md"
                    ></Box>
                  </HStack>

                  {/* Google Sign Up Button */}
                  <Button
                    w="full"
                    size="lg"
                    border={"1px solid"}
                    borderColor="#4540ee"
                    borderRadius={"49px"}
                    bg="white"
                    color="gray.700"
                    fontWeight="medium"
                    _hover={{ bg: "gray.50" }}
                    type="button"
                  >
                    <FcGoogle />
                    Register With Google
                  </Button>

                  {/* Continue Button */}
                  <Button
                    type="submit"
                    bg="#4540ee"
                    color="white"
                    w="full"
                    size="lg"
                    px={8}
                    py={3}
                    borderRadius="full"
                    fontWeight="medium"
                    _hover={{ bg: "black" }}
                    loading={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Continue"}
                  </Button>
                </VStack>

                {/* Sign In Link */}
                <Text color="gray.500" fontSize="sm" textAlign="center">
                  Already have an account?{" "}
                  <Text
                    as="span"
                    color="#4540ee"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Sign in
                  </Text>
                </Text>
              </VStack>
            </Container>
          </Flex>
        ) : currentStep === 1 ? (
          <AccountTypeSelector
            progress={progress}
            currentStep={currentStep}
            onNext={(data) => handleStepComplete(data)}
            onBack={handleBack}
          />
        ) : currentStep === 2 ? (
          <LearningLevelSelector
            progress={progress}
            currentStep={currentStep}
            onNext={(data) => handleStepComplete(data)}
            onBack={handleBack}
          />
        ) : currentStep === 3 ? (
          <ThirdStep
            progress={progress}
            currentStep={currentStep}
            learningLevel={formData.learningLevel}
            onNext={(data) => handleStepComplete(data)}
            onBack={handleBack}
          />
        ) : currentStep === 4 ? (
          <FourStep
            progress={progress}
            currentStep={currentStep}
            onNext={(data) => handleStepComplete(data)}
            onBack={handleBack}
          />
        ) : currentStep === 5 ? (
          <StepFive
            progress={progress}
            currentStep={currentStep}
            onNext={(data) => handleStepComplete(data)}
            onBack={handleBack}
          />
        ) : null}
      </Box>
    </Flex>
  )
}
