import React from "react"
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Avatar,
  Grid,
  GridItem,
} from "@chakra-ui/react"
import { CgProfile } from "react-icons/cg"

 const Profile = () => {
  return (
    <Box
      bg="white"
      height="full"
      backgroundColor={"#212a3a"}
      borderRadius={"lg"}
    >
      <HStack justify="space-between"  padding={5}>
        <VStack align="start" gap={1}>
          <Text fontSize="3xl" fontWeight="bold" color="white">
            My Profile
          </Text>
          <Text color="white" fontSize="lg" letterSpacing={2}>
            Manage your profile and preferences
          </Text>
        </VStack>
        <Button variant="ghost" color="white">
          Sign out
        </Button>
      </HStack>
      <Container maxW="4xl">
        {/* Header */}

        {/* Profile Form */}
        <Box
          bg="#212a3a"
          p={8}
          borderRadius="xl"
          border="1px"
          borderColor="gray.600"
          shadow="sm"
        >
          {/* Avatar Section */}
          <VStack gap={6} mb={8}>
            <CgProfile size={155} color="#4443ef" />
            {/* <Avatar size="xl" bg="purple.500" icon={<Box />} /> */}
          </VStack>

          {/* Form Fields */}
          <VStack gap={6}>
            {/* Name Fields */}
            <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
              <GridItem>
                <VStack align="start">
                  <Text
                    color="white"
                    fontSize="sm"
                    mb={2}
                    alignSelf="start"
                    letterSpacing={1}
                  >
                    First name
                  </Text>
                  <Input
                    defaultValue="Aabishkar"
                    bg="gray.700"
                    color="white"
                    border="1px"
                    borderColor="gray.600"
                    borderRadius="md"
                    pl={4}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px blue.500",
                    }}
                  />
                </VStack>
              </GridItem>
              <GridItem>
                <VStack align="start">
                  <Text
                    color="white"
                    fontSize="sm"
                    mb={2}
                    alignSelf="start"
                    letterSpacing={1}
                  >
                    Last name
                  </Text>
                  <Input
                    defaultValue="Dhenga"
                    bg="gray.700"
                    color="white"
                    border="1px"
                    borderColor="gray.600"
                    borderRadius="md"
                    pl={4}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px blue.500",
                    }}
                  />
                </VStack>
              </GridItem>
            </Grid>

            {/* Phone and Date of Birth */}
            <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
              <GridItem>
                <VStack align="start">
                  <Text
                    color="white"
                    fontSize="sm"
                    mb={2}
                    alignSelf="start"
                    letterSpacing={1}
                  >
                    Phone number
                  </Text>
                  <Input
                    placeholder="Enter phone number"
                    bg="gray.700"
                    color="white"
                    border="1px"
                    borderColor="gray.600"
                    borderRadius="md"
                    pl={4}
                    _placeholder={{ color: "gray.400" }}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px blue.500",
                    }}
                  />
                </VStack>
              </GridItem>
              <GridItem>
                <VStack align="start">
                  <Text
                    color="white"
                    fontSize="sm"
                    mb={2}
                    alignSelf="start"
                    letterSpacing={1}
                  >
                    Date of birth
                  </Text>
                  <Input
                    type="date"
                    bg="gray.700"
                    color="white"
                    border="1px"
                    borderColor="gray.600"
                    borderRadius="md"
                    pl={4}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px blue.500",
                    }}
                  />
                </VStack>
              </GridItem>
            </Grid>

            {/* Language and Education */}
            <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
              <GridItem>
                <VStack align="start">
                  <Text
                    color="white"
                    fontSize="sm"
                    mb={2}
                    alignSelf="start"
                    letterSpacing={1}
                  >
                    Preferred language
                  </Text>
                  <Input
                    defaultValue="Hebrew"
                    bg="gray.700"
                    color="white"
                    border="1px"
                    borderColor="gray.600"
                    borderRadius="md"
                    pl={4}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px blue.500",
                    }}
                  />
                </VStack>
              </GridItem>
              <GridItem>
                <VStack align="start">
                  <Text
                    color="white"
                    fontSize="sm"
                    mb={2}
                    alignSelf="start"
                    letterSpacing={1}
                  >
                    Education level
                  </Text>
                  <Input
                    defaultValue="K12"
                    bg="gray.700"
                    color="white"
                    border="1px"
                    borderColor="gray.600"
                    borderRadius="md"
                    pl={4}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px blue.500",
                    }}
                  />
                </VStack>
              </GridItem>
            </Grid>

            {/* Grade Level */}
            <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
              <GridItem>
                <VStack align="start">
                  <Text
                    color="white"
                    fontSize="sm"
                    mb={2}
                    alignSelf="start"
                    letterSpacing={1}
                  >
                    Grade level
                  </Text>
                  <Input
                    defaultValue="7"
                    bg="gray.700"
                    color="white"
                    border="1px"
                    borderColor="gray.600"
                    borderRadius="md"
                    pl={4}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px blue.500",
                    }}
                  />
                </VStack>
              </GridItem>
              <GridItem>{/* Empty space for layout */}</GridItem>
            </Grid>

            {/* Save Button */}
            <Box w="100%" pt={4}>
              <Button
                color="white"
                size="lg"
                backgroundColor={"#4443ef"}
                w="100%"
                borderRadius="lg"
                _hover={{
                  bg: "gray.700",
                }}
              >
                Save Changes
              </Button>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}


export default Profile