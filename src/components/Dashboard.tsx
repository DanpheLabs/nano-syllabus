import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  BookOpen, 
  Clock, 
  Target,
  Play,
  Star,
  Trophy,
  Zap,
  ChevronRight,
  Brain,
  Calendar
} from "lucide-react"

export function Dashboard() {
  const recentActivity = [
    { subject: "Data Structures", topic: "Binary Trees", progress: 85, time: "2 hours ago" },
    { subject: "Algorithms", topic: "Dynamic Programming", progress: 60, time: "1 day ago" },
    { subject: "Database Systems", topic: "Normalization", progress: 95, time: "2 days ago" },
  ]

  const featuredContent = [
    { 
      title: "Master Memory Techniques", 
      description: "Learn advanced memorization strategies",
      category: "Study Skills",
      duration: "45 min",
      difficulty: "Intermediate"
    },
    { 
      title: "Algorithm Visualization", 
      description: "Interactive algorithm learning",
      category: "Computer Science",
      duration: "30 min",
      difficulty: "Advanced"
    },
  ]

  return (
    <div className="flex-1 p-6 space-y-6 bg-background">
      {/* Welcome Header */}
      <div className="gradient-primary rounded-xl p-6 text-white shadow-medium">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, Prashant! 🎓</h1>
            <p className="opacity-90">Ready to continue your learning journey?</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Current Streak</p>
            <p className="text-3xl font-bold">7 days 🔥</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Progress</p>
                <p className="text-2xl font-bold">78%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Courses</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Study Time</p>
                <p className="text-2xl font-bold">24h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-level/10 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-level" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rank</p>
                <p className="text-2xl font-bold">#23</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex-1">
                  <h4 className="font-medium">{activity.subject}</h4>
                  <p className="text-sm text-muted-foreground">{activity.topic}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={activity.progress} className="flex-1 h-2" />
                    <span className="text-xs text-muted-foreground">{activity.progress}%</span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                  <Button size="sm" variant="ghost" className="mt-1">
                    Continue
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Featured Content */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Featured Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {featuredContent.map((content, index) => (
              <div key={index} className="p-4 rounded-lg border border-border hover:shadow-soft transition-all">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary">{content.category}</Badge>
                  <Badge 
                    variant={content.difficulty === 'Advanced' ? 'destructive' : 'default'}
                    className="text-xs"
                  >
                    {content.difficulty}
                  </Badge>
                </div>
                <h4 className="font-medium mb-1">{content.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{content.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {content.duration}
                  </div>
                  <Button size="sm" className="gradient-primary text-white">
                    <Play className="w-3 h-3 mr-1" />
                    Start
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Explore More Content
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-soft hover:shadow-medium transition-all cursor-pointer gradient-secondary">
          <CardContent className="p-6 text-center">
            <Brain className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Smart Study Session</h3>
            <p className="text-sm text-muted-foreground mb-4">AI-powered adaptive learning</p>
            <Button size="sm" className="w-full">
              Start Session
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-all cursor-pointer">
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 mx-auto mb-3 text-success" />
            <h3 className="font-semibold mb-2">Take Practice Test</h3>
            <p className="text-sm text-muted-foreground mb-4">Test your knowledge</p>
            <Button size="sm" variant="outline" className="w-full">
              Start Test
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-all cursor-pointer">
          <CardContent className="p-6 text-center">
            <Zap className="w-8 h-8 mx-auto mb-3 text-warning" />
            <h3 className="font-semibold mb-2">Memory Challenge</h3>
            <p className="text-sm text-muted-foreground mb-4">Boost your memorization skills</p>
            <Button size="sm" variant="outline" className="w-full">
              Challenge
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}