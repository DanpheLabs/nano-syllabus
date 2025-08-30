import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import NotFound from "./pages/NotFound"
import { layoutRoute } from "./routes/route"
import MyCourse from "./pages/Course/MyCourse"
import Dashboard from "./pages/Dashboard/index"
import CreateCourse from "./pages/Course/CreateCourse"
import Profile from "./pages/Profile/Profile"
import Onboarding from "./pages/Onboarding/index"
import Leaderboard from "./pages/Leaderboard/Leaderboard"
import Security from "./pages/Setting/Security"
import Setting from "./pages/Setting/Setting"
import Subscription from "./pages/Subscription/index"
import ProfileSetting from "./pages/Setting/Profile"
import AuthPage from "./pages/Auth/AuthPage"
import { AuthProvider } from "@/lib/providers/authProvider"
import Login from "./pages/Login/login"
import Cookies from "js-cookie"
import { Navigate } from "react-router-dom"
import { ProtectedRoutesWithAuth } from "./routes/ProtectedRoutes"
import Exam from "./pages/Exam/Exam"
import ExamQuestion from "./pages/Exam/Examstarted"
import ExamResult from "./pages/Exam/ExamResult"

const queryClient = new QueryClient()

function PublicRoute({ children }) {
  const token = Cookies.get("token")
  return token ? <Navigate to="/dashboard" /> : children
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route element={<ProtectedRoutesWithAuth />}>
              {/* Protected Routes with Layout */}
              {layoutRoute({
                path: "/dashboard",
                component: <Dashboard />,
                protected: true,
              })}
              {layoutRoute({
                path: "/courses",
                component: <MyCourse />,
                protected: true,
              })}
              {layoutRoute({
                path: "/create",
                component: <CreateCourse />,
                protected: true,
              })}
              {layoutRoute({
                path: "/exam",
                component: <Exam />,
                protected: true,
              })}
              {layoutRoute({
                path: "/exam/start/:id",
                component: <ExamQuestion />,
                protected: true,
              })}
              {layoutRoute({
                path: "/exam/result",
                component: <ExamResult />,
                protected: true,
              })}
              {layoutRoute({
                path: "/settings",
                component: <Setting />,
                protected: true,
              })}
              {layoutRoute({
                path: "/profile",
                component: <ProfileSetting />,
                protected: true,
              })}
              {layoutRoute({
                path: "/settings/security",
                component: <Security />,
                protected: true,
              })}
              {layoutRoute({
                path: "/leaderboard",
                component: <Leaderboard />,
                protected: true,
              })}
              {layoutRoute({
                path: "/subscription",
                component: <Subscription />,
                protected: true,
              })}
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
