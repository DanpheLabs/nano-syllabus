import { Router } from "express";
import { register, login } from "../controllers/User.controller";

const router = Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend server is running", timestamp: new Date() });
});

router.post("/login", login);
// Alias for onboarding (same as register)
router.post("/onboarding", register);

export default router;
