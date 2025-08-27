interface OnboardingFormProps {
  onComplete?: () => void
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { Eye, EyeOff, Zap } from "lucide-react"
import { useForm } from "react-hook-form"
import {
  Box,
  Button,
  Flex,
  Text,
  Input,
  VStack,
  HStack,
  Container,
  Field,
} from "@chakra-ui/react"
import { FcGoogle } from "react-icons/fc"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, GraduationCap, BookOpen, Target } from "lucide-react"
import { Sidebar } from "@/components/Sidebar"
import AccountTypeSelector from "./FirstStep"
import LearningLevelSelector from "./SecondStep"
import ThirdStep from "./ThirdStep"
import FourStep from "./FourStep"

interface OnboardingFormProps {
  onComplete?: () => void
}

export function SecondPageOnboardingForm({ onComplete }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    level: "",
    program: "",
    specialization: "",
    goals: [],
  })

  const levels = [
    { value: "high-school", label: "High School" },
    { value: "bachelor", label: "Bachelor's Degree" },
    { value: "master", label: "Master's Degree" },
    { value: "phd", label: "PhD" },
  ]

  const programs = {
    bachelor: [
      { value: "computer-science", label: "Computer Science" },
      { value: "engineering", label: "Engineering" },
      { value: "business", label: "Business Administration" },
      { value: "medicine", label: "Medicine" },
      { value: "law", label: "Law" },
      { value: "arts", label: "Liberal Arts" },
    ],
    master: [
      { value: "computer-science", label: "Computer Science" },
      { value: "mba", label: "MBA" },
      { value: "engineering", label: "Engineering" },
      { value: "data-science", label: "Data Science" },
    ],
  }

  const specializations = {
    "computer-science": [
      { value: "ai-ml", label: "AI & Machine Learning" },
      { value: "software-engineering", label: "Software Engineering" },
      { value: "cybersecurity", label: "Cybersecurity" },
      { value: "data-structures", label: "Data Structures & Algorithms" },
    ],
    engineering: [
      { value: "mechanical", label: "Mechanical Engineering" },
      { value: "electrical", label: "Electrical Engineering" },
      { value: "civil", label: "Civil Engineering" },
      { value: "chemical", label: "Chemical Engineering" },
    ],
  }

  const goals = [
    { id: "memorization", label: "Improve memorization skills", icon: "🧠" },
    { id: "exam-prep", label: "Exam preparation", icon: "📝" },
    {
      id: "concept-understanding",
      label: "Better concept understanding",
      icon: "💡",
    },
    { id: "time-management", label: "Better time management", icon: "⏰" },
  ]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete?.()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleGoal = (goalId: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter((g) => g !== goalId)
        : [...prev.goals, goalId],
    }))
  }

  const progress = (currentStep / 4) * 100

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl shadow-strong">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Welcome to Nano Syllabus !</CardTitle>
          <p className="text-muted-foreground">
            Let's personalize your learning journey
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStep === 1 && (
            // <div className="space-y-4">
            //   <div className="space-y-4">
            //     <VStack>
            //       <Text>Who are you?</Text>
            //       <Text>Tell us what type of account you'd be opening.</Text>
            //       <HStack>
            //         <VStack>
            //           <Text>Student</Text>
            //         </VStack>
            //         <VStack>
            //           <Text>Teacher</Text>
            //         </VStack>

            //         <VStack>
            //           <Text>Admin</Text>
            //         </VStack>
            //       </HStack>
            //     </VStack>
            //     <div className="mt-4">
            //       <Progress value={progress} className="h-2" />
            //       <Text color={"#4540ee"}>Step {currentStep}</Text>
            //     </div>
            //   </div>
            // </div>
            <FourStep progress={progress} currentStep={currentStep} />
            //   <AccountTypeSelector progress={ progress} currentStep={currentStep} />
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Academic Level
              </h3>
              <div>
                <Label>What's your current level of study?</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      level: value,
                      program: "",
                      specialization: "",
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your academic level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 3 && formData.level && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Academic Program
              </h3>
              <div>
                <Label>What program are you studying?</Label>
                <Select
                  value={formData.program}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      program: value,
                      specialization: "",
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your program" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs[formData.level]?.map((program) => (
                      <SelectItem key={program.value} value={program.value}>
                        {program.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.program && specializations[formData.program] && (
                <div>
                  <Label>Specialization (Optional)</Label>
                  <Select
                    value={formData.specialization}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        specialization: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations[formData.program].map((spec) => (
                        <SelectItem key={spec.value} value={spec.value}>
                          {spec.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Target className="w-5 h-5" />
                Learning Goals
              </h3>
              <p className="text-muted-foreground">
                What do you want to improve? (Select all that apply)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.goals.includes(goal.id)
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => toggleGoal(goal.id)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{goal.icon}</span>
                      <span className="font-medium">{goal.label}</span>
                      {formData.goals.includes(goal.id) && (
                        <CheckCircle className="w-5 h-5 text-primary ml-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="gradient-primary text-white"
              disabled={
                (currentStep === 1 && (!formData.name || !formData.email)) ||
                (currentStep === 2 && !formData.level) ||
                (currentStep === 3 && !formData.program) ||
                (currentStep === 4 && formData.goals.length === 0)
              }
            >
              {currentStep === 4 ? "Complete Setup" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
