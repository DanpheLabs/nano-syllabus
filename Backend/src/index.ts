// write a server in nodejs
import type { Request, Response } from "express"
import dotenv from "dotenv"
import express from "express"
import mongodbconnect from "./utilis/db"

dotenv.config()


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())


mongodbconnect()
app.get("/", (req:Request, res:Response) => {
  res.send("Hello World!")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
