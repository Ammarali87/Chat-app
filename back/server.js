import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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