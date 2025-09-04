
import {
  BookOpen,
  Home,
  User,
  BarChart3,
  Trophy,
  Settings,
  Plus,
  Zap,
  Target,
  Crown,
} from "lucide-react"



// src/components/Sidebar.tsx
import { CgProfile } from "react-icons/cg"
import { useAuthContext } from "@/lib/providers/authContext"

import { Flex, HStack, Icon, Link, Text, Box, Image } from "@chakra-ui/react"
import {
  FiHome,
  FiBarChart2,
  FiEdit2,
  FiUsers,
  FiKey,
  FiCalendar,
} from "react-icons/fi"
import { MdManageAccounts } from "react-icons/md"
import { useLocation } from "react-router"
import DarkModeToggle from "./DarkModeToggle"

// const navItems = [
//   { label: "Dashboard", icon: FiHome, href: "/dashboard" },
//   { label: "Analytics", icon: FiBarChart2, href: "/analytics" },
//   { label: "Create", icon: FiEdit2, href: "/create" },
//   { label: "Engagement", icon: FiUsers, href: "/engagement" },
//   { label: "Calendar", icon: FiCalendar, href: "/calendar" },
//   { label: "Posts", icon: MdManageAccounts, href: "/posts" },
//   { label: "Accounts", icon: FiKey, href: "/account" },
// ];

import setting from "@/assets/setting.svg"
import Logout from "@/assets/logout.svg"
import { IoMdLogOut } from "react-icons/io"
import { IoSettingsSharp } from "react-icons/io5"
import Cookies from "js-cookie"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
  { id: "courses", label: "My Courses", icon: BookOpen, href: "/courses" },
  { id: "create", label: "Create Course", icon: Plus, href: "/create" },
  { id: "exam", label: "My Exam", icon: BarChart3, href: "/exam" },
  {
    id: "contribution",
    label: " Contribution",
    icon: BarChart3,
    href: "/contribution",
  },
  {
    id: "leaderboard",
    label: "Leaderboard",
    icon: Trophy,
    href: "/leaderboard",
  },
]

const bottomNavItems = [
  {
    label: "Setting",
    icon: <IoSettingsSharp color="white" />,
    href: "/settings",
  },
  {
    id: "profile",
    label: "Profile",
    icon: <CgProfile color="white" />,
    href: "/profile",
  },
  { label: "Logout", icon: <IoMdLogOut color="white" />, href: "/logout" },
]

export function Sidebar() {
  const { setIsAuthenticated, token, updateUser } = useAuthContext()

  const { pathname } = useLocation()
  const onLogout = () => {
    Cookies.remove("token")
    setIsAuthenticated(false)
    updateUser(null)

    window.location.href = "/login"
  }

  return (
    <Flex
      as="aside"
      gridArea="sidebar"
      direction="column"
      bg="sidebarBg"
      color="fg"
      h="full"
      backgroundColor={"#212a3a"}
      px={2}
      zIndex={100}
    >
      <Link>
        <HStack
          marginBottom={4}
          onClick={() => (window.location.href = "/")}
          marginTop={4}
        >
          <Box padding={2} ml={4} backgroundColor={"#453dee"} borderRadius={10}>
            <Zap className="w-4 h-4 text-white" />
          </Box>

          <Text color={"white"}>Nano-Syllabus</Text>
        </HStack>
      </Link>
      <Text
        marginLeft={2}
        marginTop={4}
        color={"white"}
        marginBottom={4}
        fontWeight={"bold"}
      >
        Menu
      </Text>
      {
        navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.label}
              href={item.href}
              mb={1}
              color={"white"}
              borderRadius={"md"}
              _hover={{
                textDecor: "none",
                bg: "primary.50",
                _dark: { bg: "primary.700" },
              }}
              bg={
                isActive
                  ? { base: "#4443ef", _dark: "primary.700" }
                  : "transparent"
              }
            >
              <HStack
                px={{ base: 3, md: 6 }}
                py={3}
                spaceX={3}
                borderRadius="md"
                justify={{ base: "center", md: "flex-start" }}
              >
                <Icon as={item.icon} boxSize={5} />
                <Text fontSize="sm" letterSpacing={0.5}>
                  {item.label}
                </Text>
              </HStack>
            </Link>
          )
        })
      }
      ;<Text
        marginLeft={2}
        color={"white"}
        marginBottom={4}
        marginTop={1}
        fontWeight={"bold"}
      >
        General
      </Text>
      {
        bottomNavItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`)

          if (item.label === "Logout") {
            return (
              <Box
                key={item.label}
                mb={1}
                cursor="pointer"
                _hover={{
                  textDecor: "none",
                  bg: "primary.50",
                  _dark: { bg: "primary.700" },
                }}
                bg={
                  isActive
                    ? { base: "#4443ef", _dark: "primary.700" }
                    : "transparent"
                }
                borderRadius="lg"
                onClick={() => {
                  onLogout()
                }}
              >
                <HStack
                  px={{ base: 3, md: 6 }}
                  py={3}
                  spaceX={3}
                  borderRadius="md"
                  justify={{ base: "center", md: "flex-start" }}
                >
                  {item.icon}
                  <Text color={"white"} fontSize="sm" letterSpacing={0.5}>
                    {item.label}
                  </Text>
                </HStack>
              </Box>
            )
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              mb={1}
              _hover={{
                textDecor: "none",
                bg: "primary.50",
                _dark: { bg: "primary.700" },
              }}
              bg={
                isActive
                  ? { base: "#4443ef", _dark: "primary.700" }
                  : "transparent"
              }
              borderRadius="lg"
            >
              <HStack
                px={{ base: 3, md: 6 }}
                py={3}
                spaceX={3}
                borderRadius="md"
                justify={{ base: "center", md: "flex-start" }}
              >
                {item.icon}
                <Text color={"white"} fontSize="sm" letterSpacing={0.5}>
                  {item.label}
                </Text>
              </HStack>
            </Link>
          )
        })
      }
      <Box css={{ position: "absolute", bottom: 4, left: 4 }}>
        <DarkModeToggle />
      </Box>
    </Flex>
  )
}
