import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Trophy, 
  Crown, 
  Medal, 
  Star,
  TrendingUp,
  Calendar,
  Zap,
  Target,
  Users
} from "lucide-react"

export function Leaderboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly")

  const globalLeaderboard = [
    { 
      rank: 1, 
      name: "Alex Chen", 
      avatar: "/placeholder.svg", 
      points: 4850, 
      level: 25, 
      streak: 45, 
      coursesCompleted: 12,
      country: "Singapore",
      badge: "crown"
    },
    { 
      rank: 2, 
      name: "Sarah Johnson", 
      avatar: "/placeholder.svg", 
      points: 4720, 
      level: 24, 
      streak: 32, 
      coursesCompleted: 11,
      country: "Canada",
      badge: "gold"
    },
    { 
      rank: 3, 
      name: "Marcus Rodriguez", 
      avatar: "/placeholder.svg", 
      points: 4680, 
      level: 23, 
      streak: 28, 
      coursesCompleted: 10,
      country: "Mexico",
      badge: "silver"
    },
    { 
      rank: 4, 
      name: "Emily Zhang", 
      avatar: "/placeholder.svg", 
      points: 4520, 
      level: 22, 
      streak: 25, 
      coursesCompleted: 9,
      country: "China",
      badge: "bronze"
    },
    { 
      rank: 5, 
      name: "David Kim", 
      avatar: "/placeholder.svg", 
      points: 4350, 
      level: 21, 
      streak: 20, 
      coursesCompleted: 8,
      country: "South Korea",
      badge: null
    },
    // ... more users
    { 
      rank: 23, 
      name: "Prashant Soni", 
      avatar: "/placeholder.svg", 
      points: 2450, 
      level: 12, 
      streak: 7, 
      coursesCompleted: 3,
      country: "India",
      badge: null,
      isCurrentUser: true
    }
  ]

  const weeklyLeaderboard = [
    { 
      rank: 1, 
      name: "Sarah Johnson", 
      points: 850, 
      growth: "+12%",
      timeSpent: "18h"
    },
    { 
      rank: 2, 
      name: "Alex Chen", 
      points: 820, 
      growth: "+8%",
      timeSpent: "16h"
    },
    { 
      rank: 3, 
      name: "Prashant Soni", 
      points: 480, 
      growth: "+25%",
      timeSpent: "12h",
      isCurrentUser: true
    }
  ]

  const achievements = [
    { name: "Speed Learner", count: 156, icon: "⚡" },
    { name: "Streak Master", count: 89, icon: "🔥" },
    { name: "Perfect Score", count: 234, icon: "💯" },
    { name: "Knowledge Seeker", count: 67, icon: "🔍" }
  ]

  const LeaderboardEntry = ({ user, showDetails = true }) => (
    <Card className={`shadow-soft hover:shadow-medium transition-all ${
      user.isCurrentUser ? 'ring-2 ring-primary bg-primary/5' : ''
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Rank */}
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted">
            {user.rank <= 3 ? (
              user.rank === 1 ? (
                <Crown className="w-6 h-6 text-yellow-500" />
              ) : (
                <Medal className={`w-6 h-6 ${
                  user.rank === 2 ? 'text-gray-400' : 'text-amber-600'
                }`} />
              )
            ) : (
              <span className="text-lg font-bold text-muted-foreground">#{user.rank}</span>
            )}
          </div>

          {/* Avatar & Info */}
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="gradient-primary text-white">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{user.name}</h3>
                {user.isCurrentUser && (
                  <Badge className="bg-primary/10 text-primary border-primary/20">You</Badge>
                )}
                {user.badge && (
                  <div className="flex items-center">
                    {user.badge === "crown" && <Crown className="w-4 h-4 text-yellow-500" />}
                    {user.badge === "gold" && <Medal className="w-4 h-4 text-yellow-500" />}
                    {user.badge === "silver" && <Medal className="w-4 h-4 text-gray-400" />}
                    {user.badge === "bronze" && <Medal className="w-4 h-4 text-amber-600" />}
                  </div>
                )}
              </div>
              {showDetails && user.country && (
                <p className="text-sm text-muted-foreground">{user.country}</p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="text-right">
            <p className="text-lg font-bold points-glow">{user.points.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">points</p>
            {showDetails && (
              <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                <span>Lvl {user.level}</span>
                <span>🔥{user.streak}</span>
                <span>📚{user.coursesCompleted}</span>
              </div>
            )}
            {user.growth && (
              <div className="flex items-center gap-1 text-success text-xs mt-1">
                <TrendingUp className="w-3 h-3" />
                {user.growth}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">See how you rank against other learners</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={selectedPeriod === "weekly" ? "default" : "outline"}
            onClick={() => setSelectedPeriod("weekly")}
          >
            Weekly
          </Button>
          <Button 
            variant={selectedPeriod === "monthly" ? "default" : "outline"}
            onClick={() => setSelectedPeriod("monthly")}
          >
            Monthly
          </Button>
          <Button 
            variant={selectedPeriod === "all-time" ? "default" : "outline"}
            onClick={() => setSelectedPeriod("all-time")}
          >
            All Time
          </Button>
        </div>
      </div>

      {/* Your Ranking Card */}
      <Card className="gradient-primary text-white shadow-medium">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold opacity-90">Your Current Ranking</h3>
              <div className="flex items-center gap-4 mt-2">
                <div className="text-center">
                  <p className="text-3xl font-bold">#23</p>
                  <p className="text-sm opacity-75">Global Rank</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">2,450</p>
                  <p className="text-sm opacity-75">Total Points</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">+15</p>
                  <p className="text-sm opacity-75">This Week</p>
                </div>
              </div>
            </div>
            <Trophy className="w-16 h-16 opacity-60" />
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Tabs */}
      <Tabs defaultValue="global" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Champions</TabsTrigger>
          <TabsTrigger value="achievements">Top Achievers</TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="space-y-4">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {globalLeaderboard.slice(0, 3).map((user) => (
              <Card key={user.rank} className={`text-center shadow-soft ${
                user.rank === 1 ? 'gradient-primary text-white' : ''
              }`}>
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <Avatar className="w-16 h-16 mx-auto">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-lg">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-2 -right-2">
                      {user.rank === 1 && <Crown className="w-8 h-8 text-yellow-400" />}
                      {user.rank === 2 && <Medal className="w-8 h-8 text-gray-400" />}
                      {user.rank === 3 && <Medal className="w-8 h-8 text-amber-600" />}
                    </div>
                  </div>
                  <h3 className="font-bold mb-1">{user.name}</h3>
                  <p className={`text-sm ${user.rank === 1 ? 'opacity-75' : 'text-muted-foreground'} mb-2`}>
                    {user.country}
                  </p>
                  <p className="text-2xl font-bold mb-1">{user.points.toLocaleString()}</p>
                  <p className={`text-xs ${user.rank === 1 ? 'opacity-75' : 'text-muted-foreground'}`}>
                    Level {user.level} • {user.streak} day streak
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Rest of Leaderboard */}
          <div className="space-y-3">
            {globalLeaderboard.slice(3).map((user) => (
              <LeaderboardEntry key={user.rank} user={user} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                This Week's Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {weeklyLeaderboard.map((user) => (
                <LeaderboardEntry key={user.rank} user={user} showDetails={false} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="shadow-soft text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className="font-semibold mb-2">{achievement.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-1">{achievement.count}</p>
                  <p className="text-sm text-muted-foreground">students earned this</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Achievement Leaders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Achievement leaderboards coming soon! 🏆
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}