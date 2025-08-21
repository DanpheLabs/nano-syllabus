import { useState } from "react"
import { Navigation } from "./Navigation"
import { Dashboard } from "./Dashboard"
import { StudyArea } from "./StudyArea"
import { LandingPage } from "./LandingPage"

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
        return <LandingPage onGetStarted={handleGetStarted} />
      case "dashboard":
        return (
          <div className="flex h-screen">
            <Navigation currentPage="dashboard" onPageChange={handlePageChange} />
            <Dashboard />
          </div>
        )
      case "courses":
        return (
          <div className="flex h-screen">
            <Navigation currentPage="courses" onPageChange={handlePageChange} />
            <div className="flex-1 p-6">
              <h1 className="text-2xl font-bold mb-4">My Courses</h1>
              <p className="text-muted-foreground">Course listing page coming soon...</p>
            </div>
          </div>
        )
      case "study":
        return <StudyArea onBack={handleBackToCourse} />
      case "analytics":
        return (
          <div className="flex h-screen">
            <Navigation currentPage="analytics" onPageChange={handlePageChange} />
            <div className="flex-1 p-6">
              <h1 className="text-2xl font-bold mb-4">Analytics</h1>
              <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
            </div>
          </div>
        )
      case "profile":
        return (
          <div className="flex h-screen">
            <Navigation currentPage="profile" onPageChange={handlePageChange} />
            <div className="flex-1 p-6">
              <h1 className="text-2xl font-bold mb-4">Profile</h1>
              <p className="text-muted-foreground">User profile page coming soon...</p>
            </div>
          </div>
        )
      case "leaderboard":
        return (
          <div className="flex h-screen">
            <Navigation currentPage="leaderboard" onPageChange={handlePageChange} />
            <div className="flex-1 p-6">
              <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
              <p className="text-muted-foreground">Leaderboard page coming soon...</p>
            </div>
          </div>
        )
      case "settings":
        return (
          <div className="flex h-screen">
            <Navigation currentPage="settings" onPageChange={handlePageChange} />
            <div className="flex-1 p-6">
              <h1 className="text-2xl font-bold mb-4">Settings</h1>
              <p className="text-muted-foreground">Settings page coming soon...</p>
            </div>
          </div>
        )
      case "create":
        return (
          <div className="flex h-screen">
            <Navigation currentPage="create" onPageChange={handlePageChange} />
            <div className="flex-1 p-6">
              <h1 className="text-2xl font-bold mb-4">Create Course</h1>
              <p className="text-muted-foreground">Course creation page coming soon...</p>
            </div>
          </div>
        )
      default:
        return <LandingPage onGetStarted={handleGetStarted} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentView()}
    </div>
  )
}