import { Router } from "express";
import { login } from "../controllers/authControllers";

export const authRouter = Router();

authRouter.post('/login', login);