import { Grid, HStack, Text, VStack, Box, Icon } from "@chakra-ui/react"
import React, { ReactNode } from "react"
import { CgProfile } from "react-icons/cg"
import { MdOutlineSecurity } from "react-icons/md"
import { CiMoneyCheck1 } from "react-icons/ci"

const Setting = () => {
  return (
    <VStack
      backgroundColor={"white"}
      height={"full"}
      padding={8}
      gap={6}
      align="stretch"
    >
   

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={6}
        maxW="1200px"
        w="full"
      >
        {details.map((item, index) => {
          return <Card key={index} item={item} />
        })}
      </Grid>
    </VStack>
  )
}

const Card = ({
  item,
}: {
  item: { icon: ReactNode; title: string; description: string; link: string }
}) => {
  return (
    <Box
      bg="#374151"
      borderRadius="xl"
      p={6}
      border="1px solid"
      borderColor="#4B5563"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{
        bg: "#4B5563",
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
      onClick={() => (window.location.href = item.link)}
      position="relative"
    >
      <VStack align="flex-start" gap={4} h="full">
        <Box p={3} borderRadius="lg" bg="#4C51BF" color="white">
          {item.icon}
        </Box>

        <VStack align="flex-start" gap={2} flex={1}>
          <Text fontSize="xl" fontWeight="semibold" color="white">
            {item.title}
          </Text>

          <Text fontSize="sm" color="#9CA3AF" lineHeight="1.5">
            {item.description}
          </Text>
        </VStack>
      </VStack>

  
    </Box>
  )
}

export default Setting

const details = [
  {
    icon: <CgProfile size={24} />,
    title: "My Profile",
    description: "Manage your profile and preferences",
    link: "/profile",
  },
  {
    icon: <MdOutlineSecurity size={24} />,
    title: "Login & Security",
    description: "Update your password and secure your account",
    link: "/settings/security",
  },
  {
    icon: <CiMoneyCheck1 size={24} />,
    title: "Subscription Management",
    description: "Manage your subscription, payments, and billing",
    link: "/subscription",
  },
]
