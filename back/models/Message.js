// models/message.js

import mongoose from "mongoose";
//   trim:true is Important 
// senderId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}

const messageSchema = new mongoose.Schema(
  { 
   senderId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
   ,receiverId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
   ,text:{type: String},  
    image:{type: String},
    seen:{type:Boolean,default:false}
},
  { timestamps: true } // هذا يضيف createdAt و updatedAt تلقائيًا
);

export default mongoose.model("message", messageSchema);
