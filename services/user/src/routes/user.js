import express from "express";
import { getAllUser, createUser } from "../controllers/userController";
export const userRouter = express.Router()

userRouter.get('/', getAllUser)
userRouter.post('/', createUser)