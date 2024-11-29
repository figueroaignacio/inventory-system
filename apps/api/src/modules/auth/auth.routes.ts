import { Router } from "express";
import { register, login, protectedRoute } from "./auth.controller";
import { authMiddleware } from "./auth-middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/protected", authMiddleware, protectedRoute);

export default router;
