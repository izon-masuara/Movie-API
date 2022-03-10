import express from "express";
import { loginController } from "../controllers/loginController";

export const loginRouter = express.Router()

loginRouter.get('/', loginController)