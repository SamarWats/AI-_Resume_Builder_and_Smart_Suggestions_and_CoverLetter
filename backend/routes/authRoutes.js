import express from 'express';
import {registerUser, loginUser, refreshAccessToken, logoutUser, getMe} from "../controllers/authController.js";
import {protect} from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/refresh-token', refreshAccessToken);  // new route
router.post('/logout', logoutUser);  // new route
router.get('/me', protect, getMe);  // new route

export default router;