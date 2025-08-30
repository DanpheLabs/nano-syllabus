import { useQuery } from "@tanstack/react-query"
import { getExam } from "../api"

export const useGetExam = () => {
  return useQuery({
    queryKey: ["exams"],
    queryFn: getExam,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export default useGetExam