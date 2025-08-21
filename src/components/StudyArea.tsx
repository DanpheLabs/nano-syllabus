import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { 
  MessageCircle, 
  Lightbulb, 
  Bookmark, 
  Smile,
  Brain,
  Highlighter,
  ChevronLeft,
  ChevronRight,
  Share,
  Volume2,
  Zap
} from "lucide-react"

interface StudyAreaProps {
  onBack?: () => void
}

export function StudyArea({ onBack }: StudyAreaProps) {
  const [selectedText, setSelectedText] = useState("")
  const [chatMessage, setChatMessage] = useState("")
  const [showMemoryTip, setShowMemoryTip] = useState(false)

  const content = {
    title: "Binary Search Trees - Data Structures",
    chapter: "Chapter 5: Tree Data Structures",
    progress: 65,
    content: `
A Binary Search Tree (BST) is a hierarchical data structure that maintains its elements in sorted order, enabling efficient searching, insertion, and deletion operations.

## Key Properties

1. **Left Subtree Property**: All values in the left subtree are less than the root node's value
2. **Right Subtree Property**: All values in the right subtree are greater than the root node's value  
3. **Recursive Structure**: Each subtree is also a valid BST

## Time Complexity

- **Search**: O(log n) average case, O(n) worst case
- **Insertion**: O(log n) average case, O(n) worst case
- **Deletion**: O(log n) average case, O(n) worst case

## Memory Technique 🧠
Think of a BST like a family tree where:
- Left children are "younger" (smaller values)
- Right children are "older" (larger values)
- You always know which direction to go to find someone!
    `
  }

  const memoryTechniques = [
    {
      title: "Family Tree Analogy",
      description: "Visualize the BST as a family tree with age-based positioning",
      technique: "Storytelling & Visualization"
    },
    {
      title: "Left-Right Navigation",
      description: "Remember: Left = Less, Right = Right (greater)",
      technique: "Mnemonics"
    },
    {
      title: "Recursive Thinking",
      description: "Each subtree follows the same rules - like Russian dolls",
      technique: "Pattern Recognition"
    }
  ]

  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Course
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="font-semibold">{content.title}</h1>
              <p className="text-sm text-muted-foreground">{content.chapter}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{content.progress}% Complete</Badge>
            <Button variant="ghost" size="sm">
              <Volume2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="shadow-soft">
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none"
                onMouseUp={() => {
                  const selection = window.getSelection()
                  if (selection && selection.toString().trim()) {
                    setSelectedText(selection.toString().trim())
                  }
                }}
              >
                {content.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('#')) {
                    const level = paragraph.match(/^#+/)?.[0].length || 1
                    const text = paragraph.replace(/^#+\s/, '')
                    const HeadingTag = `h${Math.min(level + 1, 6)}` as keyof JSX.IntrinsicElements
                    return <HeadingTag key={index} className="font-bold mt-6 mb-3">{text}</HeadingTag>
                  }
                  if (paragraph.startsWith('-')) {
                    return <li key={index} className="ml-4">{paragraph.substring(1).trim()}</li>
                  }
                  if (paragraph.trim()) {
                    return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
                  }
                  return null
                })}
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2 mt-8 pt-6 border-t border-border">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setShowMemoryTip(true)}
                >
                  <Brain className="w-4 h-4" />
                  Memory Technique
                </Button>
                <Button variant="outline" size="sm">
                  <Smile className="w-4 h-4 mr-2" />
                  Fun Fact
                </Button>
                <Button variant="outline" size="sm">
                  <Highlighter className="w-4 h-4 mr-2" />
                  Highlight
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Bookmark
                </Button>
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <Button variant="outline">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous Topic
                </Button>
                <Button className="gradient-primary text-white">
                  Next Topic
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Chat Assistant */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageCircle className="w-5 h-5" />
                AI Study Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm">
                  👋 Hi! I'm here to help you understand Binary Search Trees. 
                  Ask me anything about the concept!
                </p>
              </div>
              
              {selectedText && (
                <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                  <p className="text-xs text-primary font-medium mb-1">Selected Text:</p>
                  <p className="text-sm italic">"{selectedText}"</p>
                </div>
              )}
              
              <Textarea 
                placeholder="Ask a question about this topic..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                rows={3}
              />
              <Button className="w-full gradient-primary text-white">
                <Zap className="w-4 h-4 mr-2" />
                Ask Assistant
              </Button>
            </CardContent>
          </Card>

          {/* Memory Techniques */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="w-5 h-5" />
                Memory Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {memoryTechniques.map((technique, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <h4 className="font-medium text-sm mb-1">{technique.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{technique.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {technique.technique}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full text-sm">
                <Brain className="w-4 h-4 mr-2" />
                More Techniques
              </Button>
            </CardContent>
          </Card>

          {/* Progress Tracker */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Study Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Topic Completion</span>
                  <span className="font-medium">65%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-success">8</p>
                  <p className="text-xs text-muted-foreground">Concepts Learned</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-warning">12 min</p>
                  <p className="text-xs text-muted-foreground">Time Spent</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                Take Quick Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}