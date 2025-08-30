import React, { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { AuthContext } from "./authContext"

interface Props {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    const token = Cookies.get("token")

    if (!token) {
      setIsAuthenticated(false)
      setUser(null)
      setIsLoading(false)
      return
    }

    // If token exists, set as authenticated
    if (token) {
      // You might want to decode the token or fetch user data here
      // For now, just setting authenticated to true
      setIsAuthenticated(true)
      setIsLoading(false)

      // If you need to get user data from the token or API:
      // fetchUserData(token).then(userData => {
      //   setUser(userData)
      // })

      return
    }
  }, []) // Empty dependency array means this runs once on mount

  // Add token state and stub functions for login, logout, updateUser
  const [token, setToken] = useState<string | null>(Cookies.get("token") || null)

  const login = (newToken: string, userData: any) => {
    Cookies.set("token", newToken)
    setToken(newToken)
    setIsAuthenticated(true)
    setUser(userData)
    setIsLoading(false)
  }

  const logout = () => {
    Cookies.remove("token")
    setToken(null)
    setIsAuthenticated(false)
    setUser(null)
    setIsLoading(false)
  }

  const updateUser = (userData: any) => {
    setUser(userData)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        setIsAuthenticated,
        token,
        login,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
