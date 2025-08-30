import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login, loginData, onboarding, type OnboardingData } from "../api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useLogin = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: (data: loginData) => login(data),
    onSuccess: (data) => {
      console.log("login successful:", data)
      toast.success("login  successfully! Welcome!")

      // Invalidate any user-related queries
      queryClient.invalidateQueries({ queryKey: ["user"] })

      // Navigate to dashboard
      navigate("/dashboard")
    },
    onError: (error: Error) => {
      console.error("Login failed:", error)
      toast.error(error.message || "Failed to login account. Please try again.")
    },
  })



    return {
      mutation : loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,
    isSuccess: loginMutation.isSuccess,
    data: loginMutation.data,
  }
}
