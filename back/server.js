import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
// error must use bodyparr no {}
// import { urlencoded } from 'body-parser';  
import userRoute from "./routes/userRoutes"
import messageRoute from "./routes/messageRoutes"
import {Server} from  "socket.io"
  //   capital server 
// Load environment variables
dotenv.config();

const app = express();



// Middleware
app.use(cors());
export const io = new Server(server,
   {cors:{origin:"*"}})
// add Limit     
// app.use(urlencoded({' }));
app.use(express.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));


export const userSocketMap = {};  
io.on("connection",(socket)=>{
  const userId = handshake.query.userId 
  console.log("conncted User" , userId);
  
  if(userId) userSocketMap[userId] = socket.id

})

io.emit("getOnlineUsers", Object.keys(userSocketMap))
socket.on("disconnect",()=>{
  console.log("User Disconnected"  , userId) 
})


//   تذكر أعمل تسست راوت 

// .use to add middlewate also  أمتداد test/etc  get no test/ddd
//  app.use("/api/test",(req,res)=>res.send("Welcome to the server! donkey kong "))
 app.get("/api/test",(req,res)=> res.send("Welcome to the server!"))
//  app.use(userRoute)  errorr 
 app.use("api/auth",userRoute)
 app.use("/api/messages",messageRoute)


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