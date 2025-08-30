import { useMutation } from "@tanstack/react-query"
import { submitExam } from "../api"
import type { SubmitExamRequest, SubmitExamResponse } from "../types/exam.types"

interface SubmitExamVariables {
  examId: string
  submitData: SubmitExamRequest
}

export const useSubmitExam = () => {
  return useMutation<SubmitExamResponse, Error, SubmitExamVariables>({
    mutationFn: ({ examId, submitData }) => submitExam(examId, submitData),
    onSuccess: (data) => {
      console.log("Exam submitted successfully:", data)
    },
    onError: (error) => {
      console.error("Failed to submit exam:", error)
    }
  })
}



export default useSubmitExam