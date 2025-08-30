import { Flex, Text, HStack, Box } from "@chakra-ui/react"
import {Zap} from "lucide-react"
import { useLocation } from "react-router-dom"

const OnboardingHeader = () => {
  const location = useLocation()
  const currentPath = location.pathname
  return (
    <Flex justify="space-between" align="center" p={8}>
      <Text color="gray.500">
        Already have an account?{" "}
        <Text
          as="span"
          color="#4540ee"
          fontWeight="medium"
          cursor="pointer"
          onClick={() => {
            {
              currentPath === "/login"
                ? (window.location.href = "/signup")
                : (window.location.href = "/login")
            }
          }}
          _hover={{ textDecoration: "underline" }}
        >
          {currentPath === "/login" ? "Sign up" : "Sign in"}
        </Text>
      </Text>
      <HStack gap={2}>
        <Box
          w={10}
          h={10}
          backgroundColor="#4540ee"
          borderRadius="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="2xl">
            <Zap className="w-5 h-5 text-white" />
          </Text>
        </Box>
        <Text fontWeight="bold" fontSize="xl" color="gray.800">
          Nano Syllabus
        </Text>
      </HStack>
    </Flex>
  )
}

export default OnboardingHeader