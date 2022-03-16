import express from "express";
import { getAllUser } from "../controllers/userController";
export const userRouter = express.Router()

userRouter.get('/', getAllUser)