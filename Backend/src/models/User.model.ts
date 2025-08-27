// write a user model mongose for mongodb

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isOnboarded: { type: Boolean, default: false },
  current_level_of_study: {
    type: String,
    enum: ["High School", "Academica"],
    required: false
    },
  full_name: { type: String, required: true },
  what_program_studying: { type: String },
  whoareyou: {
    type: String,enum: [
    "Student","Teacher","Professional"
  ]},
  learning_goals: {
    type: [String],
  
  },
  language: {
    type: String,
    
  },
  isPremium: { type: Boolean, default: false }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;

