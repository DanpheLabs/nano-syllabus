import { useMutation } from "@tanstack/react-query"
import { StartExamResponse } from "../types/exam.types"
import { startExam } from "../api"

export const useStartExam = () => {
 

  return useMutation<StartExamResponse, Error, string>({
    mutationFn: (examId: string) => startExam(examId),
    onSuccess: (data) => {
      console.log("Exam details fetched successfully:", data)
    //   setQuiz(data)
    //   setError(null) // Clear any previous errors
    },
    onError: (error) => {
      console.error("Failed to fetch exam details:", error)
    }
  })
}