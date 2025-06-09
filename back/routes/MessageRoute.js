import { Router } from 'express';
import { protectRoute } from '../controllers/auth.js'; 
import { getMessages, getUsersForSidebar, markMessageAsSeen } from '../controllers/messageController.js';

//  import {} not import fileName
const route = Router();

// Protected routes
route.use(protectRoute); 
route.get("/users",getUsersForSidebar)
route.get("/:id",getMessages)
route.put("/mark/:id",markMessageAsSeen)

export default route;


