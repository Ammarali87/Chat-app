import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
// error must use bodyparr no {}
// import { urlencoded } from 'body-parser';  

// Load environment variables
dotenv.config();

const app = express();



// Middleware
app.use(cors());
// add Limit     
// app.use(urlencoded({' }));
app.use(express.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Get port from environment variables
const PORT = process.env.PORT || '5000'

 // Connect to MongoDB and start server
try {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to MongoDB');
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('Failed to connect to MongoDB:', error);
  process.exit(1);
}     
   //   تذكر أعمل تسست راوت 

// .use to add middlewate also  أمتداد test/etc  get no test/ddd
//  app.use("/api/test",(req,res)=>res.send("Welcome to the server! donkey kong "))
 app.get("/api/test",(req,res)=> res.send("Welcome to the server!"))