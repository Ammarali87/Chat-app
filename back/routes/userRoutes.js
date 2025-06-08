
import { Router } from 'express';
import { signup, login } from '../controllers/userController.js';



 const route = Router();
  route.post("/signup", signup)   

  route.get("/login", login)