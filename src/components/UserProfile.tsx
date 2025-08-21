import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Edit, 
  Trophy, 
  Calendar, 
  BookOpen, 
  Target,
  Star,
  Award,
  Zap,
  Crown,
  Camera,
  Save
} from "lucide-react"

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Prashant Soni",
    email: "prashant.soni@email.com",
    bio: "Computer Science student passionate about AI and machine learning. Love solving complex problems and learning new technologies.",
    level: "Bachelor's Degree",
    program: "Computer Science",
    specialization: "AI & Machine Learning",
    joinDate: "January 2024",
    location: "Mumbai, India"
  })

  const stats = {
    totalPoints: 2450,
    currentLevel: 12,
    streak: 7,
    coursesCompleted: 3,
    coursesInProgress: 4,
    totalStudyTime: "124h",
    averageScore: 89,
    rank: 23
  }

  const achievements = [
    { id: 1, name: "First Course Completed", icon: "🎓", date: "Feb 2024", unlocked: true },
    { id: 2, name: "7-Day Streak", icon: "🔥", date: "Mar 2024", unlocked: true },
    { id: 3, name: "Speed Learner", icon: "⚡", date: "Mar 2024", unlocked: true },
    { id: 4, name: "Perfect Score", icon: "💯", date: "Apr 2024", unlocked: true },
    { id: 5, name: "Knowledge Master", icon: "🧠", date: "Not yet", unlocked: false },
    { id: 6, name: "Marathon Learner", icon: "🏃", date: "Not yet", unlocked: false }
  ]

  const skills = [
    { name: "Data Structures", level: 85, category: "Programming" },
    { name: "Algorithms", level: 78, category: "Programming" },  
    { name: "Machine Learning", level: 92, category: "AI/ML" },
    { name: "Python", level: 88, category: "Programming" },
    { name: "Database Design", level: 75, category: "Database" },
    { name: "Problem Solving", level: 90, category: "General" }
  ]

  const recentActivity = [
    { date: "Today", activity: "Completed Binary Search Trees topic", points: 50 },
    { date: "Yesterday", activity: "Finished Data Structures quiz", points: 75 },
    { date: "2 days ago", activity: "Started Machine Learning course", points: 25 },
    { date: "3 days ago", activity: "Achieved 7-day learning streak", points: 100 }
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Save logic here
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Profile Header */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-2xl gradient-primary text-white">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  {isEditing ? (
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="text-2xl font-bold mb-2"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                  )}
                  <p className="text-muted-foreground">{profile.program} • {profile.specialization}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Joined {profile.joinDate} • {profile.location}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-points" />
                  <Badge className="gradient-primary text-white">
                    Level {stats.currentLevel}
                  </Badge>
                  <Button 
                    variant={isEditing ? "default" : "outline"}
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {isEditing ? (
                <Textarea
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  className="mb-4"
                  rows={3}
                />
              ) : (
                <p className="text-muted-foreground mb-4">{profile.bio}</p>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold points-glow">{stats.totalPoints}</p>
                  <p className="text-xs text-muted-foreground">Total Points</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold streak-glow">{stats.streak}</p>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">{stats.coursesCompleted}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">#{stats.rank}</p>
                  <p className="text-xs text-muted-foreground">Global Rank</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Learning Progress */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Level Progress</span>
                      <span className="level-glow font-bold">Level {stats.currentLevel}</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">750/1000 XP to next level</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="font-bold text-success">{stats.coursesCompleted}</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                    <div>
                      <p className="font-bold text-warning">{stats.coursesInProgress}</p>
                      <p className="text-xs text-muted-foreground">In Progress</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Average Score</span>
                    <span className="font-bold">{stats.averageScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Study Time</span>
                    <span className="font-bold">{stats.totalStudyTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Global Rank</span>
                    <span className="font-bold text-primary">#{stats.rank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Streak Record</span>
                    <span className="font-bold streak-glow">14 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{achievement.name}</p>
                        <p className="text-xs text-muted-foreground">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`shadow-soft ${achievement.unlocked ? 'ring-1 ring-success/20' : 'opacity-60'}`}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <h3 className="font-semibold mb-1">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.date}</p>
                  {achievement.unlocked && (
                    <Badge className="mt-2 bg-success">Unlocked</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <Card key={index} className="shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{skill.name}</h3>
                    <Badge variant="outline">{skill.category}</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={skill.level} className="flex-1 h-2" />
                    <span className="text-sm font-medium">{skill.level}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">{activity.activity}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                    <Badge className="points-glow bg-points/10 text-points border-points/20">
                      +{activity.points} XP
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}