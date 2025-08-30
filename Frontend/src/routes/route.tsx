import DashboardLayout from "@/pages/_layout"
import { Route } from "react-router"
import Cookies from "js-cookie"
import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = Cookies.get("token")
  return token ? children : <Navigate to="/login" />
}

export const layoutRoute = ({
  path,
  component,
  protected: isProtected = false,
}: {
  path: string
  component: React.ReactNode
  protected?: boolean
}) => {
  const wrappedComponent = isProtected ? (
    <ProtectedRoute>
      <DashboardLayout>{component}</DashboardLayout>
    </ProtectedRoute>
  ) : (
    <DashboardLayout>{component}</DashboardLayout>
  )

  return (
    <>
      <Route path={path} element={wrappedComponent} />
    </>
  )
}

export const flatRoute = ({
  path,
  component,
}: {
  path: string
  component: React.ReactNode
}) => <Route path={path} element={component} />
