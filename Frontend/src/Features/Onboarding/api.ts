import axiosInstance from "@/services/axios"
import { safeApiCall } from "@/lib/helper/apiHelper"

const url = "api/onboarding"

export enum CurrentLevelOfStudy {
  HighSchool = "High School",
  Academia = "Academica"
}

export interface OnboardingData {
  email: string
  password: string
  fullName: string
  isOnboarded: boolean
  current_level_of_study: CurrentLevelOfStudy
  what_program_studying: string
  learning_goals: string[]
  language: string // Fixed typo from 'lanugage'
  isPremium: boolean
}


export interface loginData {
  email: string
  password: string
}

const onboarding = (data: OnboardingData) => {
  return safeApiCall(() => axiosInstance.post(url, data).then(res => res.data))
}


const login = ({email , password}:loginData) => {
  return safeApiCall(() => axiosInstance.post("api/login", {email, password}).then(res => res.data))
}

export { onboarding, login }