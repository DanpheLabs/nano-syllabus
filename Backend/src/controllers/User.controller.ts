import UserModel from "../models/User.model";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const register = async (req: Request, res: Response) => {
  try {
    const { email,isPremium, password,language, isOnboarded, current_level_of_study, what_program_studying, learning_goals, fullName } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      email,
      password: hashedPassword,
      isOnboarded,
      current_level_of_study,
      what_program_studying,
      learning_goals,
      full_name: fullName,
      isPremium,
      language
    });
    
    await user.save();
    
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
    
    // Convert to plain object and exclude password
    const { password: _, ...userWithoutPassword } = user.toObject();
    
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
      })
      .status(201)
      .json({ 
        message: "User registered successfully", 
        user: userWithoutPassword 
      });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
      if (!user) return res.status(404).json({ error: "User not found" });
    const { password: _, ...userWithoutPassword } = user.toObject();
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      })
      .status(200)
      .json({ message: "Login successful", user:userWithoutPassword });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
