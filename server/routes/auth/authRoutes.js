import express from "express";
import { authMiddleware } from "../../middleware/auth.js";
import { checkAuth, login, register } from "../../controllers/auth/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", authMiddleware, checkAuth);

export default router;
