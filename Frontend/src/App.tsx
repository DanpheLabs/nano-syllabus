import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { layoutRoute } from "./routes/route"
import MyCourse from "./pages/Course/MyCourse"
import Analytics from "./pages/Analytics/Analytics"
import Dashboard from "./pages/Dashboard/index"
import CreateCourse from "./pages/Course/CreateCourse"
import Profile from "./pages/Profile/Profile"
import Onboarding from "./pages/Onboarding/index"
import Leaderboard from "./pages/Leaderboard/Leaderboard"
import Security from "./pages/Setting/Security"
import Setting from "./pages/Setting/Setting"
import Subscription from "./pages/Subscription/index"
import ProfileSetting from "./pages/Setting/Profile"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {layoutRoute({
            path: "/dashboard",
            component: <Dashboard />,
          })}
          {layoutRoute({
            path: "/courses",
            component: <MyCourse />,
          })}
          {layoutRoute({
            path: "/create",
            component: <CreateCourse />,
          })}
          {layoutRoute({
            path: "/profile",
            component: <Profile />,
          })}
          {layoutRoute({
            path: "/Analytics",
            component: <Analytics />,
          })}
          {layoutRoute({
            path: "/settings",
            component: <Setting />,
          })}
          {layoutRoute({
            path: "/settings/Profile",
            component: <ProfileSetting />,
          })}
          {layoutRoute({
            path: "/settings/security",
            component: <Security />,
          })}

          {layoutRoute({
            path: "/leaderboard",
            component: <Leaderboard />,
          })}
          {layoutRoute({
            path: "/subscription",
            component: <Subscription />,
          })}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App;
