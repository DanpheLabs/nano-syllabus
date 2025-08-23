import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Play, 
  BookOpen,
  Clock,
  Star,
  TrendingUp,
  Grid,
  List
} from "lucide-react"

interface MyCoursesProps {
  onCourseSelect?: (courseId: string) => void
  onCreateCourse?: () => void
}

export function MyCourses({ onCourseSelect, onCreateCourse }: MyCoursesProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState("")

  const courses = [
    {
      id: "1",
      title: "Data Structures & Algorithms",
      subject: "Computer Science",
      progress: 75,
      totalTopics: 24,
      completedTopics: 18,
      lastAccessed: "2 hours ago",
      difficulty: "Advanced",
      rating: 4.8,
      studyTime: "45h",
      category: "Programming",
      status: "In Progress"
    },
    {
      id: "2", 
      title: "Database Management Systems",
      subject: "Computer Science",
      progress: 45,
      totalTopics: 16,
      completedTopics: 7,
      lastAccessed: "1 day ago",
      difficulty: "Intermediate",
      rating: 4.6,
      studyTime: "32h",
      category: "Database",
      status: "In Progress"
    },
    {
      id: "3",
      title: "Machine Learning Fundamentals", 
      subject: "Computer Science",
      progress: 100,
      totalTopics: 20,
      completedTopics: 20,
      lastAccessed: "3 days ago",
      difficulty: "Advanced",
      rating: 4.9,
      studyTime: "68h",
      category: "AI/ML",
      status: "Completed"
    },
    {
      id: "4",
      title: "Software Engineering Principles",
      subject: "Computer Science", 
      progress: 20,
      totalTopics: 18,
      completedTopics: 4,
      lastAccessed: "1 week ago",
      difficulty: "Intermediate",
      rating: 4.5,
      studyTime: "12h",
      category: "Engineering",
      status: "In Progress"
    }
  ]

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const inProgressCourses = filteredCourses.filter(c => c.status === "In Progress")
  const completedCourses = filteredCourses.filter(c => c.status === "Completed")

  const CourseCard = ({ course }: { course: typeof courses[0] }) => (
    <Card className="shadow-soft hover:shadow-medium transition-all cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Badge 
            variant={course.status === "Completed" ? "default" : "secondary"}
            className={course.status === "Completed" ? "bg-success" : ""}
          >
            {course.category}
          </Badge>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
        <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{course.subject}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {course.completedTopics} of {course.totalTopics} topics completed
            </p>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {course.studyTime}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              {course.rating}
            </div>
            <Badge variant="outline" className="text-xs">
              {course.difficulty}
            </Badge>
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="flex-1 gradient-primary text-white group-hover:shadow-medium"
              onClick={() => onCourseSelect?.(course.id)}
            >
              <Play className="w-4 h-4 mr-2" />
              Continue
            </Button>
            <Button variant="outline" size="sm">
              <BookOpen className="w-4 h-4" />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Last accessed: {course.lastAccessed}
          </p>
        </div>
      </CardContent>
    </Card>
  )

  const CourseListItem = ({ course }: { course: typeof courses[0] }) => (
    <Card className="shadow-soft hover:shadow-medium transition-all cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-semibold truncate">{course.title}</h3>
              <Badge 
                variant={course.status === "Completed" ? "default" : "secondary"}
                className={course.status === "Completed" ? "bg-success" : ""}
              >
                {course.category}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{course.subject}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{course.completedTopics}/{course.totalTopics} topics</span>
              <span>{course.studyTime}</span>
              <span>★ {course.rating}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <div className="text-right">
              <p className="text-sm font-medium">{course.progress}%</p>
              <Progress value={course.progress} className="w-20 h-1" />
            </div>
            <Button 
              size="sm"
              className="gradient-primary text-white"
              onClick={() => onCourseSelect?.(course.id)}
            >
              Continue
            </Button>
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
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">Manage your learning journey</p>
        </div>
        <Button onClick={onCreateCourse} className="gradient-primary text-white">
          Create New Course
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <div className="flex border border-border rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Course Tabs */}
      <Tabs defaultValue="in-progress" className="w-full">
        <TabsList>
          <TabsTrigger value="in-progress">
            In Progress ({inProgressCourses.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedCourses.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            All Courses ({filteredCourses.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="in-progress" className="mt-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {inProgressCourses.map((course) => (
                <CourseListItem key={course.id} course={course} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {completedCourses.map((course) => (
                <CourseListItem key={course.id} course={course} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCourses.map((course) => (
                <CourseListItem key={course.id} course={course} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No courses found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? 'Try adjusting your search terms' : 'Start your learning journey by creating your first course'}
          </p>
          <Button onClick={onCreateCourse} className="gradient-primary text-white">
            Create Your First Course
          </Button>
        </div>
      )}
    </div>
  )
}