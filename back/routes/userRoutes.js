import { Router } from 'express';
import { signup, login, updateProfile, checkAuth } from '../controllers/userController.js';
import { protectRoute } from '../controllers/auth.js';

const router = Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.use(protectRoute);
router.put("/update-profile", updateProfile);
router.get("/checkauth", checkAuth);

export default router;
