// models/User.js

import mongoose from "mongoose";
//   trim:true is Important 
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {  
      type: String,
      required: true,
      unique: true,
      trim:true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String, 
      default: "", 
    },   
    bio: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true } // هذا يضيف createdAt و updatedAt تلقائيًا
);

export default mongoose.model("User", userSchema);
