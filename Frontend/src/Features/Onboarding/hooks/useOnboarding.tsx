import { useMutation, useQueryClient } from "@tanstack/react-query"
import { onboarding, type OnboardingData } from "../api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useOnboarding = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const onboardingMutation = useMutation({
    mutationFn: (data: OnboardingData) => onboarding(data),
    onSuccess: (data) => {
      console.log("Onboarding successful:", data)
      toast.success("Account created successfully! Welcome!")
      
      // Invalidate any user-related queries
      queryClient.invalidateQueries({ queryKey: ["user"] })
      
      // Navigate to dashboard
      navigate("/dashboard")
    },
    onError: (error: Error) => {
      console.error("Onboarding failed:", error)
      toast.error(error.message || "Failed to create account. Please try again.")
    }
  })

  const submitOnboarding = (data: OnboardingData) => {
    onboardingMutation.mutate(data)
  }

  return {
    submitOnboarding,
    isLoading: onboardingMutation.isPending,
    isError: onboardingMutation.isError,
    error: onboardingMutation.error,
    isSuccess: onboardingMutation.isSuccess,
    data: onboardingMutation.data
  }
}