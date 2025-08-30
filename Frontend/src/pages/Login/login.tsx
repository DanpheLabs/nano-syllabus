import React from "react"
import { useForm } from "react-hook-form"
import {
  Flex,
  Container,
  Box,
  VStack,
  Field,
  Text,
  Input,
  Button,
  HStack,
} from "@chakra-ui/react"
import OnboardingSidbar from "@/Features/Onboarding/component/OnboardingSidebar"
import OnboardingHeader from "@/Features/Onboarding/component/OnboardingHeader"
import { FaGoogle } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { useLogin } from "@/Features/Onboarding/hooks/useLogin"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "@/hooks/useAuthContext"

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const navigate = useNavigate()
  const { setIsAuthenticated } = useAuthContext()

    const { mutation } = useLogin()


    

  const onSubmit = async (data) => {
    try {
        console.log("Form data:", data)

        mutation(data)
            setIsAuthenticated(true)
            navigate("/dashboard")
      // Add your registration logic here
      // Example: await registerUser(data)
    } catch (error) {
      console.error("Registration error:", error)
    }
  }

  const onError = (errors) => {
    console.error("Form validation errors:", errors)
  }

  return (
    <Flex minH="100vh">
      {/* Left Side - Testimonial */}
      <OnboardingSidbar />

      <Box w="60%" bg="white">
        {/* Header */}
        <OnboardingHeader />

        {/* Initial registration form */}
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
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
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
                  <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
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
                  onClick={() => {
                    // Add Google OAuth logic here
                    console.log("Google registration clicked")
                  }}
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
                  loading={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Login"}
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
                  onClick={() => {
                    // Add navigation to sign in page
window.location.href = "/onboarding"
                  }}
                >
                  Sign up
                </Text>
              </Text>
            </VStack>
          </Container>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Login
