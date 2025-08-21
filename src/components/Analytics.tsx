import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Target, 
  Brain,
  BarChart3,
  Calendar,
  Award,
  Activity,
  BookOpen,
  Zap
} from "lucide-react"

export function Analytics() {
  const overviewStats = [
    { 
      title: "Study Time", 
      value: "24h", 
      change: "+12%", 
      trend: "up",
      icon: Clock,
      description: "This week"
    },
    { 
      title: "Courses Progress", 
      value: "78%", 
      change: "+5%", 
      trend: "up",
      icon: Target,
      description: "Overall completion"
    },
    { 
      title: "Memory Score", 
      value: "92%", 
      change: "-2%", 
      trend: "down",
      icon: Brain,
      description: "Retention rate"
    },
    { 
      title: "Daily Streak", 
      value: "7 days", 
      change: "+7", 
      trend: "up",
      icon: Zap,
      description: "Current streak"
    }
  ]

  const learningData = [
    { subject: "Data Structures", timeSpent: "8.5h", progress: 85, performance: 92, trend: "up" },
    { subject: "Algorithms", timeSpent: "6.2h", progress: 70, performance: 88, trend: "up" },
    { subject: "Machine Learning", timeSpent: "12.1h", progress: 95, performance: 96, trend: "stable" },
    { subject: "Database Systems", timeSpent: "4.8h", progress: 45, performance: 78, trend: "down" }
  ]

  const weeklyActivity = [
    { day: "Mon", hours: 2.5, completed: 3 },
    { day: "Tue", hours: 3.2, completed: 4 },
    { day: "Wed", hours: 1.8, completed: 2 },
    { day: "Thu", hours: 4.1, completed: 5 },
    { day: "Fri", hours: 2.9, completed: 3 },
    { day: "Sat", hours: 3.8, completed: 4 },
    { day: "Sun", hours: 2.1, completed: 2 }
  ]

  const knowledgeGaps = [
    { topic: "Dynamic Programming", confidence: 45, priority: "High", subject: "Algorithms" },
    { topic: "Graph Algorithms", confidence: 60, priority: "Medium", subject: "Data Structures" },
    { topic: "Neural Networks", confidence: 35, priority: "High", subject: "Machine Learning" },
    { topic: "Query Optimization", confidence: 70, priority: "Low", subject: "Database Systems" }
  ]

  const memoryTechniques = [
    { technique: "Spaced Repetition", usage: 85, effectiveness: 92 },
    { technique: "Mind Mapping", usage: 70, effectiveness: 88 },
    { technique: "Mnemonics", usage: 60, effectiveness: 85 },
    { technique: "Storytelling", usage: 45, effectiveness: 90 }
  ]

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Learning Analytics</h1>
          <p className="text-muted-foreground">Track your progress and identify improvement areas</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Last 7 days
          </Button>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center gap-1 ${
                      stat.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">{stat.change}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="knowledge-gaps">Knowledge Gaps</TabsTrigger>
          <TabsTrigger value="memory-techniques">Memory Techniques</TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Subject Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {learningData.map((subject, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{subject.subject}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{subject.timeSpent}</Badge>
                        {subject.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-success" />
                        ) : subject.trend === 'down' ? (
                          <TrendingDown className="w-4 h-4 text-destructive" />
                        ) : (
                          <div className="w-4 h-4 bg-muted rounded-full" />
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Performance</span>
                          <span>{subject.performance}%</span>
                        </div>
                        <Progress value={subject.performance} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Weekly Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyActivity.map((day, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium">{day.day}</div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{day.hours}h</span>
                          <span>{day.completed} topics</span>
                        </div>
                        <Progress value={(day.hours / 5) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Study Patterns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">Peak Learning Hours</h4>
                  <p className="text-2xl font-bold text-primary">2:00 PM - 4:00 PM</p>
                  <p className="text-sm text-muted-foreground">Most productive time</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">Average Session</h4>
                  <p className="text-2xl font-bold text-success">45 minutes</p>
                  <p className="text-sm text-muted-foreground">Optimal length</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">Best Day</h4>
                  <p className="text-2xl font-bold text-warning">Thursday</p>
                  <p className="text-sm text-muted-foreground">Highest completion rate</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Knowledge Gaps Tab */}
        <TabsContent value="knowledge-gaps" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {knowledgeGaps.map((gap, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{gap.topic}</h3>
                        <p className="text-sm text-muted-foreground">{gap.subject}</p>
                      </div>
                      <Badge 
                        variant={
                          gap.priority === 'High' ? 'destructive' :
                          gap.priority === 'Medium' ? 'default' : 'secondary'
                        }
                      >
                        {gap.priority} Priority
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Confidence Level</span>
                          <span>{gap.confidence}%</span>
                        </div>
                        <Progress 
                          value={gap.confidence} 
                          className="h-2"
                        />
                      </div>
                      <Button size="sm" variant="outline">
                        Study Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Memory Techniques Tab */}
        <TabsContent value="memory-techniques" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Memory Technique Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {memoryTechniques.map((technique, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{technique.technique}</h3>
                      <Badge variant="secondary">
                        {technique.effectiveness}% effective
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Usage Rate</span>
                          <span>{technique.usage}%</span>
                        </div>
                        <Progress value={technique.usage} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Effectiveness</span>
                          <span>{technique.effectiveness}%</span>
                        </div>
                        <Progress value={technique.effectiveness} className="h-2" />
                      </div>
                    </div>
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