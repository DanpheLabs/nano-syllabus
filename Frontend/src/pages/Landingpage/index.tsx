import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Zap,
  Trophy,
  Users,
  BookOpen,
  Target,
  Check,
  Star,
  Play,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import DashboardPreview from "@/components/DashboardPreview"

interface LandingPageProps {
  onGetStarted?: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Memory Techniques",
      description:
        "Advanced algorithms that adapt to your learning style and help you memorize faster",
    },
    {
      icon: Target,
      title: "Personalized Study Paths",
      description:
        "Custom learning journeys based on your level, program, and learning goals",
    },
    {
      icon: Zap,
      title: "Interactive Content",
      description:
        "Engaging materials with highlighting, annotations, and instant AI assistance",
    },
    {
      icon: Trophy,
      title: "Gamified Learning",
      description:
        "Points, streaks, leaderboards, and achievements to keep you motivated",
    },
  ]

  const pricing = [
    {
      name: "Free",
      price: "0",
      description: "Perfect to get started",
      features: [
        "Access to 3 courses",
        "Basic memory techniques",
        "Limited AI assistance",
        "Community access",
      ],
    },
    {
      name: "Premium",
      price: "15",
      popular: true,
      description: "Unlimited smart learning",
      features: [
        "Unlimited courses",
        "Advanced memory techniques",
        "Unlimited AI chat",
        "Priority support",
        "Analytics dashboard",
        "Offline access",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Nano Syllabus</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Pricing</Button>
            <Button variant="ghost">About</Button>
            <Button onClick={() => (window.location.href = "/onboarding")}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 gradient-primary text-white border-0">
            🚀 AI-Powered Learning Platform
          </Badge>
          <h1 className="text-5xl font-bold mb-6 gradient-primary bg-clip-text text-transparent">
            Master Any Subject with
            <br />
            Smart Memory Techniques
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stop wasting time searching through multiple sources. NanoSyllabus
            helps students memorize content efficiently with AI-powered
            techniques and personalized learning paths.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="gradient-primary text-white shadow-medium hover:shadow-strong"
              onClick={() => (window.location.href = "/onboarding")}
            >
              <Play className="w-4 h-4 mr-2" />
              Start Learning Free
            </Button>
            <Button size="lg" variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">50K+</p>
              <p className="text-muted-foreground">Students</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-success">95%</p>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-warning">3x</p>
              <p className="text-muted-foreground">Faster Learning</p>
            </div>
          </div>
        </div>
          </section>
          

          <DashboardPreview/>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Why Students Choose Nano Syllabus ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our unique approach combines proven memory techniques with AI
              technology to help you learn faster and retain more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="shadow-soft hover:shadow-medium transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Start free, upgrade when you need more features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pricing.map((plan, index) => (
              <Card
                key={index}
                className={`shadow-soft hover:shadow-medium transition-all relative ${
                  plan.popular ? "gradient-primary text-white" : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-warning text-warning-foreground">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span
                      className={
                        plan.popular ? "text-white/70" : "text-muted-foreground"
                      }
                    >
                      /month
                    </span>
                  </div>
                  <p
                    className={
                      plan.popular ? "text-white/70" : "text-muted-foreground"
                    }
                  >
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-4 h-4 text-success flex-shrink-0" />
                        <span
                          className={
                            plan.popular ? "text-white/90" : "text-foreground"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-white text-primary hover:bg-white/90"
                        : "gradient-primary text-white"
                    }`}
                    onClick={onGetStarted}
                  >
                    {plan.name === "Free"
                      ? "Get Started"
                      : "Start Premium Trial"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 gradient-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already learning smarter, not
            harder with Nano Syllabus's revolutionary memory techniques.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="shadow-medium hover:shadow-strong"
            onClick={onGetStarted}
          >
            Start Your Free Journey
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 gradient-primary rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">Nano Syllabus</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Nano Syllabus. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
