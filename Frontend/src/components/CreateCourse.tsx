import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Plus, 
  Upload, 
  FileText, 
  Video, 
  Image, 
  Trash2,
  Save,
  Eye,
  BookOpen,
  Sparkles,
  Target,
  Brain
} from "lucide-react"

export function CreateCourse() {
  const [currentStep, setCurrentStep] = useState(1)
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    estimatedHours: "",
    thumbnail: null,
    modules: []
  })

  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: "Introduction_to_Data_Structures.pdf", type: "PDF", size: "2.4 MB" },
    { id: 2, name: "Binary_Trees_Lecture.mp4", type: "Video", size: "45.2 MB" },
    { id: 3, name: "Algorithm_Diagram.png", type: "Image", size: "890 KB" }
  ])

  const categories = [
    "Computer Science",
    "Mathematics", 
    "Physics",
    "Chemistry",
    "Biology",
    "Engineering",
    "Business",
    "Language Learning"
  ]

  const difficulties = [
    { value: "beginner", label: "Beginner", color: "bg-green-100 text-green-800" },
    { value: "intermediate", label: "Intermediate", color: "bg-yellow-100 text-yellow-800" },
    { value: "advanced", label: "Advanced", color: "bg-red-100 text-red-800" }
  ]

  const aiSuggestions = [
    { title: "Memory Palace Technique", description: "Help students create mental maps" },
    { title: "Spaced Repetition Schedule", description: "Optimize review timing" },
    { title: "Visual Learning Cards", description: "Create interactive flashcards" },
    { title: "Practice Quizzes", description: "Auto-generate assessment questions" }
  ]

  const progress = (currentStep / 4) * 100

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Create New Course</h1>
          <p className="text-muted-foreground">Build engaging learning content with AI assistance</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Step {currentStep} of 4</Badge>
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button className="gradient-primary text-white">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="shadow-soft">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Course Creation Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {currentStep === 1 && (
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Course Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Data Structures and Algorithms Mastery"
                    value={courseData.title}
                    onChange={(e) => setCourseData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Course Description *</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder="Describe what students will learn and achieve in this course..."
                    value={courseData.description}
                    onChange={(e) => setCourseData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={courseData.category}
                      onValueChange={(value) => setCourseData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty Level *</Label>
                    <Select
                      value={courseData.difficulty}
                      onValueChange={(value) => setCourseData(prev => ({ ...prev, difficulty: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map((diff) => (
                          <SelectItem key={diff.value} value={diff.value}>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-md text-xs ${diff.color}`}>
                                {diff.label}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="hours">Estimated Learning Hours</Label>
                  <Input
                    id="hours"
                    type="number"
                    placeholder="e.g., 20"
                    value={courseData.estimatedHours}
                    onChange={(e) => setCourseData(prev => ({ ...prev, estimatedHours: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Course Thumbnail</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload course thumbnail image
                    </p>
                    <Button variant="outline" size="sm">Choose File</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Learning Materials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <div className="flex justify-center gap-4 mb-4">
                    <FileText className="w-8 h-8 text-muted-foreground" />
                    <Video className="w-8 h-8 text-muted-foreground" />
                    <Image className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium mb-2">Upload Your Course Materials</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drop files here or click to browse<br />
                    Supports PDF, DOCX, MP4, MOV, JPG, PNG files
                  </p>
                  <Button className="gradient-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Files
                  </Button>
                </div>

                {/* Uploaded Files */}
                <div>
                  <h4 className="font-medium mb-3">Uploaded Files ({uploadedFiles.length})</h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 gradient-primary rounded flex items-center justify-center">
                            {file.type === 'PDF' && <FileText className="w-4 h-4 text-white" />}
                            {file.type === 'Video' && <Video className="w-4 h-4 text-white" />}
                            {file.type === 'Image' && <Image className="w-4 h-4 text-white" />}
                          </div>
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground">{file.type} • {file.size}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">💡 Pro Tip</h4>
                  <p className="text-sm text-muted-foreground">
                    Our AI will analyze your content to suggest memory techniques, create interactive elements, and generate practice questions automatically.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Learning Enhancements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="gradient-primary rounded-lg p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6" />
                    <h3 className="text-lg font-semibold">AI Content Analysis Complete!</h3>
                  </div>
                  <p className="opacity-90">
                    We've analyzed your materials and identified key concepts, learning patterns, and optimal memory techniques.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Suggested Memory Techniques</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aiSuggestions.map((suggestion, index) => (
                      <div key={index} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium">{suggestion.title}</h5>
                          <Button size="sm" variant="ghost" className="text-primary">
                            Add
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Course Structure Preview</h4>
                  <div className="space-y-3">
                    {[
                      { title: "Introduction to Data Structures", topics: 4, estimated: "2h" },
                      { title: "Arrays and Linked Lists", topics: 6, estimated: "3h" },
                      { title: "Stacks and Queues", topics: 5, estimated: "2.5h" },
                      { title: "Trees and Graphs", topics: 8, estimated: "4h" }
                    ].map((module, index) => (
                      <div key={index} className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium">{module.title}</h5>
                            <p className="text-sm text-muted-foreground">
                              {module.topics} topics • {module.estimated}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Review & Publish
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="gradient-secondary rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">Data Structures and Algorithms Mastery</h3>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive course covering fundamental data structures and algorithmic thinking with advanced memory techniques.
                  </p>
                  <div className="flex gap-2">
                    <Badge>Computer Science</Badge>
                    <Badge variant="secondary">Advanced</Badge>
                    <Badge variant="outline">20 hours</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Course Features</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-success rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        AI-powered memory techniques
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-success rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        Interactive practice questions
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-success rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        Spaced repetition system
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-success rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        Progress tracking
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Content Summary</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• 4 comprehensive modules</li>
                      <li>• 23 interactive topics</li>
                      <li>• 3 uploaded files processed</li>
                      <li>• 15 AI-generated practice questions</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    Save as Draft
                  </Button>
                  <Button className="flex-1 gradient-primary text-white">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Publish Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              disabled={currentStep === 4}
              className="gradient-primary text-white"
            >
              {currentStep === 4 ? 'Publish' : 'Next'}
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Tips */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">💡 Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h5 className="font-medium mb-1">Engaging Titles</h5>
                <p className="text-muted-foreground">Use action words and specific outcomes</p>
              </div>
              <div>
                <h5 className="font-medium mb-1">Clear Descriptions</h5>
                <p className="text-muted-foreground">Explain what students will achieve</p>
              </div>
              <div>
                <h5 className="font-medium mb-1">Quality Content</h5>
                <p className="text-muted-foreground">Upload diverse materials for better AI analysis</p>
              </div>
            </CardContent>
          </Card>

          {/* AI Features */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="w-5 h-5" />
                AI Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Content Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Memory Technique Suggestions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span>Question Generation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-muted rounded-full"></div>
                <span>Interactive Elements</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}