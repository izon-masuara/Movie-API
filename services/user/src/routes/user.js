import express from "express";
import { 
    getAllUser,
    createUser,
    updateStatus,
    deleteUser
} from "../controllers/userController";
import { payment } from "../middlewares/midtrans";
import { auth } from "../middlewares/auth";
export const userRouter = express.Router()

userRouter.get('/', getAllUser)
userRouter.post('/', createUser)
// Auth
userRouter.use(auth)
userRouter.patch('/',payment,updateStatus)
userRouter.delete('/', deleteUser)