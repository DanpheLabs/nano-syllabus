
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
import { Flex, HStack, Icon, Link, Text ,Box} from "@chakra-ui/react";
import {
  FiHome,
  FiBarChart2,
  FiEdit2,
  FiUsers,
  FiKey,
  FiCalendar,
} from "react-icons/fi";
import { MdManageAccounts } from "react-icons/md";
import { useLocation } from "react-router";

// const navItems = [
//   { label: "Dashboard", icon: FiHome, href: "/dashboard" },
//   { label: "Analytics", icon: FiBarChart2, href: "/analytics" },
//   { label: "Create", icon: FiEdit2, href: "/create" },
//   { label: "Engagement", icon: FiUsers, href: "/engagement" },
//   { label: "Calendar", icon: FiCalendar, href: "/calendar" },
//   { label: "Posts", icon: MdManageAccounts, href: "/posts" },
//   { label: "Accounts", icon: FiKey, href: "/account" },
// ];


const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
  { id: "courses", label: "My Courses", icon: BookOpen, href: "/courses" },
  { id: "create", label: "Create Course", icon: Plus, href: "/create" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/analytics" },
  {
    id: "leaderboard",
    label: "Leaderboard",
    icon: Trophy,
    href: "/leaderboard",
  },
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
]

export function Sidebar() {
  const { pathname } = useLocation();

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
              <HStack marginBottom={4} onClick={()=>window.location.href="/"} marginTop={4}>
                  
          <Box padding={2} ml={4} backgroundColor={"#453dee"} borderRadius={10}>
            <Zap className="w-4 h-4 text-white" />
          </Box>

          <Text color={"white"}>Nano-Syllabus</Text>
        </HStack>
      </Link>
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`)

        return (
          <Link
            key={item.label}
            href={item.href}
            mb={1}
            mt={3}
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
              <Text fontSize="sm" letterSpacing={1}>{item.label}</Text>
            </HStack>
          </Link>
        )
      })}
    </Flex>
  )
}
