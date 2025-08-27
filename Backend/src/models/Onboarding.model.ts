// write a user model mongose for mongodb

import mongoose from "mongoose";

const onbodoardingSchema = new mongoose.Schema({
  fullName: { type: String, required: true,  },
  password: { type: String, required: true },
  current_level_of_study: { 
    type: String, 
    enum: ["High School", "Bachelor", "Master", "PhD"], 
    required: true 
  },
  what_program_studying: { type: String, required: true },
  learning_goals: {
    type: [String],
    enum: ["Improve MemorizationSkill","Exam Preparation", "Better Concept Understanding", "Better Time Management"]
  }
}, { timestamps: true });

const OnboardUser = mongoose.model("User", onbodoardingSchema);

export default OnboardUser;


