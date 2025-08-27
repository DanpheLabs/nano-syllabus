import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Badge,
  Input,
  InputGroup,
  SimpleGrid,
  Stack,
  Progress,
  // Icon,
  Link,
  Image,
} from "@chakra-ui/react"
import {
  // FaPlay,
  FaSearch,
  FaTh,
  FaUser,
  FaChartLine,
  FaEdit,
  FaFileAlt,
  FaBullseye,
  FaFolder,
  FaChartBar,
  FaCalendar,
  FaComment,
  FaEllipsisH,
} from "react-icons/fa"
import Logo from  "@/assets/logo.png"
import React from "react"
const DashboardPreview = () => {
  return (
    <Box maxW="6xl" mx="auto" display={{ base: "none", lg: "block" }}>
      <Box
        bg="white"
        rounded="2xl"
        shadow="2xl"
        border="1px"
        borderColor="gray.200"
        overflow="hidden"
      >
        {/* Dashboard Header */}
        <Flex
          bg="white"
          borderBottom="1px"
          borderColor="gray.200"
          px={6}
          py={4}
          align="center"
          justify="space-between"
        >
          <Flex align="center" gap={4}>
            <Flex align="center" gap={2}>
              <Box
                w={8}
                h={8}
                // bg="green.500"
                rounded="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image src={Logo} />
              </Box>
              <Text fontSize="lg" fontWeight="bold" color="gray.900">
                Nano Syllabus
              </Text>
            </Flex>
            <Box position="relative">
              <InputGroup
                startElement={<FaSearch size="16px" color="gray.400" />}
              >
                <Input
                  placeholder="Search here..."
                  pl={8}
                  pr={4}
                  py={2}
                  border="1px solid black"
                  borderColor="gray.200"
                  rounded="lg"
                  fontSize="sm"
                  w={64}
                />
              </InputGroup>
            </Box>
          </Flex>
          <Flex align="center" gap={4}>
            <Button variant="ghost" size="sm" color="gray.600">
              Invite your Team
            </Button>
            <Flex align="center" gap={2}>
              <Text fontSize="sm" color="gray.600">
                Eng
              </Text>
              <Box w={8} h={8} bg="blue.500" rounded="full" />
              <Text fontSize="sm" fontWeight="medium">
                Brooklyn
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/* Dashboard Content */}
        <Flex>
          {/* Sidebar */}
          <Box
            w={64}
            bg="gray.50"
            borderRight="1px"
            borderColor="gray.200"
            p={4}
          >
            <Box as="nav" display="flex" flexDir="column" gap={2}>
              <Text
                fontSize="xs"
                fontWeight="semibold"
                color="gray.500"
                textTransform="uppercase"
                letterSpacing="wider"
                mb={3}
              >
                Menu
              </Text>
              <Link
                href="#"
                display="flex"
                alignItems="center"
                gap={3}
                color="gray.600"
                _hover={{ color: "gray.900" }}
                py={2}
                px={3}
                rounded="lg"
              >
                <FaChartBar size="16px" />
                <Text fontSize="sm">Overview</Text>
              </Link>
              <Link
                href="#"
                display="flex"
                alignItems="center"
                gap={3}
                color="gray.600"
                _hover={{ color: "gray.900" }}
                py={2}
                px={3}
                rounded="lg"
              >
                <FaUser size="16px" />
                <Text fontSize="sm">Profile</Text>
              </Link>
              <Link
                href="#"
                display="flex"
                alignItems="center"
                gap={3}
                color="blue.600"
                bg="blue.50"
                py={2}
                px={3}
                rounded="lg"
              >
                <FaTh size="16px" />
                <Text fontSize="sm" fontWeight="medium">
                  Dashboard
                </Text>
              </Link>
              <Link
                href="#"
                display="flex"
                alignItems="center"
                gap={3}
                color="gray.600"
                _hover={{ color: "gray.900" }}
                py={2}
                px={3}
                rounded="lg"
              >
                <FaChartLine size="16px" />
                <Text fontSize="sm">Analytics</Text>
              </Link>
              <Link
                href="#"
                display="flex"
                alignItems="center"
                gap={3}
                color="gray.600"
                _hover={{ color: "gray.900" }}
                py={2}
                px={3}
                rounded="lg"
              >
                <FaComment size="16px" />
                <Text fontSize="sm">Studen Forum</Text>
              </Link>
              <Link
                href="#"
                display="flex"
                alignItems="center"
                gap={3}
                color="gray.600"
                _hover={{ color: "gray.900" }}
                py={2}
                px={3}
                rounded="lg"
              >
                <FaEdit size="16px" />
                <Text fontSize="sm">Leaderboard</Text>
              </Link>
              <Link
                href="#"
                display="flex"
                alignItems="center"
                gap={3}
                color="gray.600"
                _hover={{ color: "gray.900" }}
                py={2}
                px={3}
                rounded="lg"
              >
                <FaCalendar size="16px" />
                <Text fontSize="sm">Calendar</Text>
              </Link>
              <Link
                href="#"
                display="flex"
                alignItems="center"
                gap={3}
                color="gray.600"
                _hover={{ color: "gray.900" }}
                py={2}
                px={3}
                rounded="lg"
              >
                <FaFileAlt size="16px" />
                <Text fontSize="sm">Courses</Text>
              </Link>
          
              <Link
                href="#"
                display="flex"
                alignItems="center"
                gap={3}
                color="gray.600"
                _hover={{ color: "gray.900" }}
                py={2}
                px={3}
                rounded="lg"
              >
                <FaFolder size="16px" />
                <Text fontSize="sm">Library</Text>
              </Link>
            </Box>
          </Box>

          {/* Main Content */}
          <Box flex="1" p={6}>
            <SimpleGrid columns={3} gridGap={6}>
              {/* Analytics Section */}
              <Box gridColumn={{ base: "span 3", md: "span 2" }}>
                <Heading
                  as="h2"
                  fontSize="xl"
                  fontWeight="semibold"
                  color="gray.900"
                  mb={4}
                >
                  Learning Analytics
                </Heading>

                {/* Metrics Cards */}
                <SimpleGrid columns={3} gridGap={4} mb={6}>
                  <Box
                    bg="white"
                    border="1px"
                    borderColor="gray.200"
                    rounded="lg"
                    p={4}
                  >
                    <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                      125
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Question Covered
                    </Text>
                    <Flex align="center" mt={2}>
                      <Progress.Root value={75} w="full" rounded="full" h={2}>
                        <Progress.Track bg="gray.50" borderRadius={10}>
                          <Progress.Range bg="blue.500" />
                        </Progress.Track>
                      </Progress.Root>
                      <Text fontSize="xs" color="blue.600" ml={2}>
                        75%
                      </Text>
                    </Flex>
                  </Box>
                  <Box
                    bg="white"
                    border="1px"
                    borderColor="gray.200"
                    rounded="lg"
                    p={4}
                  >
                    <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                      25
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                     Question Remaining
                    </Text>
                    <Flex align="center" mt={2}>
                      <Progress.Root value={60} w="full" rounded="full" h={2}>
                        <Progress.Track bg="gray.50" borderRadius={10}>
                          <Progress.Range bg="blue.500" />
                        </Progress.Track>
                      </Progress.Root>
                      <Text fontSize="xs" color="blue.600" ml={2}>
                        25%
                      </Text>
                    </Flex>
                  </Box>
                  <Box
                    bg="white"
                    border="1px"
                    borderColor="gray.200"
                    rounded="lg"
                    p={4}
                  >
                    <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                      85%
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Accuracy Rate
                    </Text>
                    <Flex align="center" mt={2}>
                      <Progress.Root value={85} w="full" rounded="full" h={2}>
                        <Progress.Track bg="gray.50" borderRadius={10}>
                          <Progress.Range bg="blue.500" />
                        </Progress.Track>
                      </Progress.Root>
                      <Text fontSize="xs" color="blue.600" ml={2}>
                        85%
                      </Text>
                    </Flex>
                  </Box>
                </SimpleGrid>

                {/* Charts */}
                <SimpleGrid columns={2} gap={4}>
                  <Box
                    bg="white"
                    border="1px"
                    borderColor="gray.200"
                    rounded="lg"
                    p={4}
                  >
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      color="gray.900"
                      mb={3}
                    >
                      Student Performance
                    </Text>
                    <Box
                      h={32}
                      bg="gray.50"
                      rounded="md"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box textAlign="center">
                        <Box
                          w={16}
                          h={16}
                          bg="blue.100"
                          rounded="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mx="auto"
                          mb={2}
                        >
                          <FaChartBar size={32} color="blue.600" />
                        </Box>
                        <Text fontSize="xs" color="gray.500">
                          Knowledge Visualization
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    bg="white"
                    border="1px"
                    borderColor="gray.200"
                    rounded="lg"
                    p={4}
                  >
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      color="gray.900"
                      mb={3}
                    >
                      Learning Schedule
                    </Text>
                    <Box
                      h={32}
                      bg="gray.50"
                      rounded="md"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box textAlign="center">
                        <Box
                          w={16}
                          h={16}
                          bg="blue.100"
                          rounded="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mx="auto"
                          mb={2}
                        >
                          <FaChartLine size={32} color="blue.600" />
                        </Box>
                        <Text fontSize="xs" color="gray.500">
                          Time Analytics
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </SimpleGrid>
              </Box>

              {/* Upcoming Posts */}
              <Box gridColumn="span 1">
                <Heading
                  as="h2"
                  fontSize="xl"
                  fontWeight="semibold"
                  color="gray.900"
                  mb={4}
                >
                  Upcoming Course
                </Heading>
                <Text fontSize="sm" color="gray.600" mb={4}>
                  2 Courses Enrolled
                </Text>

                <Stack spaceX={3}>
                  <Box
                    bg="white"
                    border="1px"
                    borderColor="gray.200"
                    rounded="lg"
                    p={3}
                  >
                    <Flex align="center" justify="space-between" mb={2}>
                      <Text fontSize="sm" fontWeight="medium" color="gray.900">
                        Take Practice
                      </Text>
                      <Button
                        variant="ghost"
                        color="gray.400"
                        _hover={{ color: "gray.600" }}
                      >
                        <FaEllipsisH size="16px" />
                      </Button>
                    </Flex>
                    <Flex
                      align="center"
                      justify="space-between"
                      fontSize="xs"
                      color="gray.500"
                    >
                      <Text>Test  Your Knowledge </Text>
                      <Text>10 Mar.</Text>
                    </Flex>
                    <Box mt={2}>
                      <Badge
                        bg="blue.100"
                        color="blue.700"
                        fontSize="xs"
                        px={2}
                        py={1}
                        rounded="md"
                      >
                        Give Test{" "}
                      </Badge>
                    </Box>
                  </Box>

                  <Box
                    bg="white"
                    border="1px"
                    borderColor="gray.200"
                    rounded="lg"
                    p={3}
                  >
                    <Flex align="center" justify="space-between" mb={2}>
                      <Text fontSize="sm" fontWeight="medium" color="gray.900">
                        Smart Study Session
                      </Text>
                      <Button
                        variant="ghost"
                        color="gray.400"
                        _hover={{ color: "gray.600" }}
                      >
                        <FaEllipsisH size="16px" />
                      </Button>
                    </Flex>
                    <Flex
                      align="center"
                      justify="space-between"
                      fontSize="xs"
                      color="gray.500"
                    >
                      <Text>AI-powered adaptive learning</Text>
                      <Text>12 Mar.</Text>
                    </Flex>
                    <Box mt={2}>
                      <Badge
                        bg="gray.100"
                        color="gray.700"
                        fontSize="xs"
                        px={2}
                        py={1}
                        rounded="md"
                      >
                        Start Session
                      </Badge>
                    </Box>
                  </Box>

                  <Box
                    bg="white"
                    border="1px"
                    borderColor="gray.200"
                    rounded="lg"
                    p={3}
                  >
                    <Flex align="center" justify="space-between" mb={2}>
                      <Text fontSize="sm" fontWeight="medium" color="gray.900">
                        Weekly Newsletter
                      </Text>
                      <Button
                        variant="ghost"
                        color="gray.400"
                        _hover={{ color: "gray.600" }}
                      >
                        <FaEllipsisH size="16px" />
                      </Button>
                    </Flex>
                    <Flex
                      align="center"
                      justify="space-between"
                      fontSize="xs"
                      color="gray.500"
                    >
                      <Text>Post on LinkedIn</Text>
                      <Text>15 Mar.</Text>
                    </Flex>
                    <Box mt={2}>
                      <Badge
                        bg="blue.100"
                        color="blue.700"
                        fontSize="xs"
                        px={2}
                        py={1}
                        rounded="md"
                      >
                        Draft
                      </Badge>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </SimpleGrid>

            {/* Company Logos */}
            <Box mt={8} textAlign="center">
              <Text fontSize="sm" color="gray.500" mb={4}>
                More than 100+ companies trusted us
              </Text>
              <Flex align="center" justify="center" gap={8} opacity={0.6}>
                <Text fontSize="sm" fontWeight="medium" color="gray.400">
                  LogoIpsum
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="gray.400">
                  LogoIpsum
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="gray.400">
                  LogoIpsum
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="gray.400">
                  LogoIpsum
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="gray.400">
                  LogoIpsum
                </Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default DashboardPreview
