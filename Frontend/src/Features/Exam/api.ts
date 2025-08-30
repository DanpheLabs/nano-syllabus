const getExamurl = "/api/exams"
const startExamUrl = "/api/exams"
const submitExamurl = "/api/exams"

import { safeApiCall } from "@/lib/helper/apiHelper"
import type { 
  StartExamResponse, 
  SubmitExamRequest, 
  SubmitExamResponse 
} from "./types/exam.types"

import axiosInstance from "@/services/axios"

export const getExam = () => {
  return safeApiCall(() => axiosInstance.get(getExamurl).then(res => res.data))
}

export const startExam = (exam_id: string): Promise<StartExamResponse> => {
  return safeApiCall(() => axiosInstance.get(`${startExamUrl}/${exam_id}/start`).then(res => res.data))
}

export const submitExam = (
  exam_id: string, 
  submitData: SubmitExamRequest
): Promise<SubmitExamResponse> => {
  return safeApiCall(() => 
    axiosInstance.post(`${submitExamurl}/${exam_id}/submit`, submitData).then(res => res.data)
  )
}