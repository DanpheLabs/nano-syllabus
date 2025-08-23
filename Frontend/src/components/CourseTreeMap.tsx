import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  ChevronLeft, 
  Play, 
  CheckCircle, 
  Clock, 
  Lock,
  BookOpen,
  Brain,
  Target
} from "lucide-react"

interface CourseTreeMapProps {
  onBack?: () => void
  onTopicSelect?: (topicId: string) => void
}

export function CourseTreeMap({ onBack, onTopicSelect }: CourseTreeMapProps) {
  const [selectedSemester, setSelectedSemester] = useState(1)

  const course = {
    title: "Computer Science - Data Structures",
    program: "Bachelor's Degree",
    progress: 65,
    totalSemesters: 4
  }

  const syllabus = {
    1: {
      name: "Semester 1: Foundations",
      subjects: [
        {
          id: "intro-cs",
          name: "Introduction to Computer Science",
          progress: 100,
          status: "completed",
          topics: [
            { id: "history", name: "History of Computing", completed: true },
            { id: "algorithms", name: "Introduction to Algorithms", completed: true },
            { id: "programming", name: "Programming Fundamentals", completed: true }
          ]
        },
        {
          id: "data-structures",
          name: "Basic Data Structures", 
          progress: 75,
          status: "in-progress",
          topics: [
            { id: "arrays", name: "Arrays and Lists", completed: true },
            { id: "stacks", name: "Stacks and Queues", completed: true },
            { id: "linked-lists", name: "Linked Lists", completed: false, current: true },
            { id: "hash-tables", name: "Hash Tables", completed: false }
          ]
        }
      ]
    },
    2: {
      name: "Semester 2: Advanced Structures",
      subjects: [
        {
          id: "trees",
          name: "Tree Data Structures",
          progress: 45,
          status: "in-progress",
          topics: [
            { id: "binary-trees", name: "Binary Trees", completed: true },
            { id: "bst", name: "Binary Search Trees", completed: false, current: true },
            { id: "avl-trees", name: "AVL Trees", completed: false },
            { id: "heap", name: "Heaps", completed: false }
          ]
        },
        {
          id: "graphs",
          name: "Graph Algorithms",
          progress: 0,
          status: "locked",
          topics: [
            { id: "graph-basics", name: "Graph Fundamentals", completed: false },
            { id: "traversal", name: "Graph Traversal", completed: false },
            { id: "shortest-path", name: "Shortest Path Algorithms", completed: false }
          ]
        }
      ]
    },
    3: {
      name: "Semester 3: Algorithm Design",
      subjects: [
        {
          id: "sorting",
          name: "Sorting Algorithms",
          progress: 0,
          status: "locked",
          topics: []
        }
      ]
    },
    4: {
      name: "Semester 4: Advanced Topics",
      subjects: [
        {
          id: "dynamic-programming",
          name: "Dynamic Programming",
          progress: 0,
          status: "locked", 
          topics: []
        }
      ]
    }
  }

  const currentSemester = syllabus[selectedSemester]

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <p className="text-muted-foreground">{course.program}</p>
        </div>
        <Badge className="gradient-primary text-white">
          {course.progress}% Complete
        </Badge>
      </div>

      {/* Course Progress */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Overall Progress</h3>
              <Progress value={course.progress} className="h-3" />
              <p className="text-sm text-muted-foreground mt-1">
                Keep going! You're making great progress
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Semester Navigation */}
        <div className="space-y-4">
          <h2 className="font-semibold">Course Structure</h2>
          {Object.entries(syllabus).map(([semNum, semester]) => (
            <Card
              key={semNum}
              className={`cursor-pointer transition-all ${
                selectedSemester === parseInt(semNum)
                  ? 'ring-2 ring-primary shadow-medium'
                  : 'hover:shadow-soft'
              }`}
              onClick={() => setSelectedSemester(parseInt(semNum))}
            >
              <CardContent className="p-4">
                <h3 className="font-medium">{semester.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {semester.subjects.length} subjects
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subject Tree Map */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{currentSemester.name}</h2>
            <Badge variant="secondary">
              {currentSemester.subjects.length} Subjects
            </Badge>
          </div>

          <div className="grid gap-6">
            {currentSemester.subjects.map((subject) => (
              <Card key={subject.id} className="shadow-soft">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        subject.status === 'completed' ? 'bg-success/10' :
                        subject.status === 'in-progress' ? 'gradient-primary' :
                        'bg-muted'
                      }`}>
                        {subject.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : subject.status === 'in-progress' ? (
                          <BookOpen className="w-5 h-5 text-white" />
                        ) : (
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg">{subject.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={subject.progress} className="w-32 h-2" />
                          <span className="text-sm text-muted-foreground">
                            {subject.progress}%
                          </span>
                        </div>
                      </div>
                    </CardTitle>
                    <Badge 
                      variant={
                        subject.status === 'completed' ? 'default' :
                        subject.status === 'in-progress' ? 'secondary' :
                        'outline'
                      }
                      className={subject.status === 'completed' ? 'bg-success' : ''}
                    >
                      {subject.status === 'completed' ? 'Completed' :
                       subject.status === 'in-progress' ? 'In Progress' :
                       'Locked'}
                    </Badge>
                  </div>
                </CardHeader>
                
                {subject.topics.length > 0 && (
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {subject.topics.map((topic) => (
                        <div
                          key={topic.id}
                          className={`p-3 rounded-lg border transition-all cursor-pointer ${
                            topic.completed 
                              ? 'border-success/50 bg-success/5'
                              : topic.current
                              ? 'border-primary bg-primary/10 ring-1 ring-primary/20'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => topic.completed || topic.current ? onTopicSelect?.(topic.id) : null}
                        >
                          <div className="flex items-center gap-3">
                            {topic.completed ? (
                              <CheckCircle className="w-4 h-4 text-success" />
                            ) : topic.current ? (
                              <Play className="w-4 h-4 text-primary" />
                            ) : (
                              <Clock className="w-4 h-4 text-muted-foreground" />
                            )}
                            <span className={`text-sm ${
                              topic.completed ? 'text-success' :
                              topic.current ? 'text-primary font-medium' :
                              'text-muted-foreground'
                            }`}>
                              {topic.name}
                            </span>
                          </div>
                          {topic.current && (
                            <Button 
                              size="sm" 
                              className="mt-2 w-full gradient-primary text-white"
                              onClick={(e) => {
                                e.stopPropagation()
                                onTopicSelect?.(topic.id)
                              }}
                            >
                              <Play className="w-3 h-3 mr-1" />
                              Continue Learning
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}