import { Router } from 'express';
import { signup, login, updateProfile, cehckAuth } from '../controllers/userController.js';
import { protectRoute } from '../controllers/auth.js'; 
   //  import {} not import fileName
const route = Router();

// Public routes
route.post("/signup", signup);   
route.post("/login", login);

// Protected routes
route.use(protectRoute); 
route.put("/update-profile", updateProfile);   
route.get("/checkauth", cehckAuth);

export default route;
