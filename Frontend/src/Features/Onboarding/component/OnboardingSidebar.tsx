

import { Box, Text, HStack, VStack } from '@chakra-ui/react'
import React from 'react'

const OnboardingSidbar = () => {
  return (
    <Box
      w="40%"
      backgroundColor={"#4540ee"}
      opacity={0.8}
      backgroundImage="linear-gradient(to-right, black, purple.800)"
      color="white"
      p={12}
      display="flex"
      alignItems="center"
    >
      <Box maxW="md">
        <Text
          fontSize="2xl"
          fontWeight="semibold"
          letterSpacing={1}
          lineHeight="relaxed"
          mb={12}
        >
          Onboarding into learning has never been this meaningful! With Nano
          Syllabus, students from Grade 1 to PhD get access to well-structured
          training materials instantly. It's reshaping the entire learning
          journey.
        </Text>

        <HStack gap={4}>
          <Box
            w={12}
            h={12}
            bg="orange.400"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              w={10}
              h={10}
              bg="orange.300"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="orange.800" fontSize="lg">
                👩
              </Text>
            </Box>
          </Box>
          <VStack align="start" gap={0}>
            <Text fontWeight="medium" fontSize="lg">
              Abishkar Dhenga{" "}
            </Text>
            <Text color="purple.200" fontSize="sm">
              Student at Lumbini City College
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Box>
  )
}

export default OnboardingSidbar
