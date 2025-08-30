import { useState } from "react"
import { Navigation } from "./Navigation"
import { Dashboard } from "./Dashboard"
import { StudyArea } from "./StudyArea"
import { LandingPage } from "../pages/Landingpage/index"
import OnboardingForm from "../Features/Onboarding/OnboardingForm"
import { MyCourses } from "./MyCourses"
import { CourseTreeMap } from "./CourseTreeMap"
import { UserProfile } from "./UserProfile"
import { Leaderboard } from "./Leaderboard"
import { Settings } from "./Settings"
import { CreateCourse } from "./CreateCourse"
import { PaymentCheckout } from "./PaymentCheckout"

export function AppLayout() {
  const [currentView, setCurrentView] = useState<string>("landing")

  const handleGetStarted = () => {
    setCurrentView("dashboard")
  }

  const handlePageChange = (page: string) => {
    setCurrentView(page)
  }

  const handleBackToCourse = () => {
    setCurrentView("dashboard")
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "landing":
        return <LandingPage onGetStarted={() => setCurrentView("onboarding")} />
      case "onboarding":
        return <OnboardingForm />
      case "dashboard":
        return (
          <div className="flex h-screen">
            <Navigation
              currentPage="dashboard"
              onPageChange={handlePageChange}
            />
            <Dashboard />
          </div>
        )
      case "courses":
        return (
          <div className="flex h-screen">
            <Navigation currentPage="courses" onPageChange={handlePageChange} />
            <MyCourses
              onCourseSelect={() => setCurrentView("course-tree")}
              onCreateCourse={() => setCurrentView("create")}
            />
          </div>
        )
      case "course-tree":
        return (
          <CourseTreeMap
            onBack={() => setCurrentView("courses")}
            onTopicSelect={() => setCurrentView("study")}
          />
        )
      case "study":
        return <StudyArea onBack={() => setCurrentView("course-tree")} />

      case "profile":
        return (
          <div className="flex h-screen">
            <Navigation currentPage="profile" onPageChange={handlePageChange} />
            <UserProfile />
          </div>
        )
      case "leaderboard":
        return (
          <div className="flex h-screen">
            <Navigation
              currentPage="leaderboard"
              onPageChange={handlePageChange}
            />
            <Leaderboard />
          </div>
        )
      case "settings":
        return (
          <div className="flex h-screen">
            <Navigation
              currentPage="settings"
              onPageChange={handlePageChange}
            />
            <Settings />
          </div>
        )
      case "create":
        return (
          <div className="flex h-screen">
            <Navigation currentPage="create" onPageChange={handlePageChange} />
            <CreateCourse />
          </div>
        )
      case "payment":
        return (
          <PaymentCheckout
            onBack={() => setCurrentView("dashboard")}
            onSuccess={() => setCurrentView("dashboard")}
          />
        )
      default:
        return <LandingPage onGetStarted={() => setCurrentView("onboarding")} />
    }
  }

  return <div className="min-h-screen bg-background">{renderCurrentView()}</div>
}