import type { Request, Response } from "express"
import userRoutes from "./routes/User.routes"
import examRoutes from "./routes/Exam.route"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongodbconnect from "./utilis/db"

dotenv.config()

const app = express()
const PORT =  8080

// CORS configuration - Fixed
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "http://localhost:5173", 
    "http://localhost:5174",
    "http://localhost:8080",
    "http://localhost:8081",
    "*"
  ], // Add your actual frontend URL
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Backend server is running", 
    timestamp: new Date() 
  });
});

// Middleware
app.use(express.json())
app.use(cookieParser())

// Test endpoint
app.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Hello World!", status: "success" })
})

// Routes
app.use("/api", userRoutes) // Consider prefixing with /api
app.use("/api", examRoutes) // Exam and Question routes

mongodbconnect()

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})