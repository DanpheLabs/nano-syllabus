//write a hook that detcts the token from cookies 
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
        .find(row => row.startsWith("token="))
     console.log("token from cookies:", Cookies.get("token"))
     console.log("token from cookies all:", Cookies.get())


      console.log()
    if (cookie) {
      setToken(cookie.split("=")[1])
    }
  }, [])

  return { token }
}
