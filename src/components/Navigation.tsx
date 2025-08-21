import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
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
  Crown
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationProps {
  currentPage?: string
  onPageChange?: (page: string) => void
}

export function Navigation({ currentPage = "dashboard", onPageChange }: NavigationProps) {
  const navigation = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "create", label: "Create Course", icon: Plus },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const handleNavClick = (pageId: string) => {
    onPageChange?.(pageId)
  }

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center gap-2 p-6 border-b border-sidebar-border">
        <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold">Edu Cat</span>
      </div>

      {/* User Profile Section */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="gradient-primary text-white">PS</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">Prashant Soni</p>
            <p className="text-xs text-sidebar-foreground/70">Computer Science</p>
          </div>
          <Crown className="w-4 h-4 text-points" />
        </div>
        
        {/* Progress Stats */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-sidebar-foreground/70">Level Progress</span>
              <span className="level-glow font-bold">Level 12</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          
          <div className="flex gap-4 text-xs">
            <div className="text-center">
              <p className="points-glow font-bold">2,450</p>
              <p className="text-sidebar-foreground/70">Points</p>
            </div>
            <div className="text-center">
              <p className="streak-glow font-bold">7</p>
              <p className="text-sidebar-foreground/70">Day Streak</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-sidebar-primary">89%</p>
              <p className="text-sidebar-foreground/70">Accuracy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            
            return (
              <li key={item.id}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10",
                    isActive
                      ? "gradient-primary text-white shadow-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                  onClick={() => handleNavClick(item.id)}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Premium Upgrade */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="gradient-accent rounded-lg p-4 text-white text-center">
          <Crown className="w-6 h-6 mx-auto mb-2" />
          <p className="text-sm font-medium mb-1">Go Premium</p>
          <p className="text-xs opacity-90 mb-3">Unlock unlimited learning</p>
          <Button size="sm" variant="secondary" className="w-full">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  )
}