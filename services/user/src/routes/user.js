import express from "express";
import { 
    getAllUser,
    createUser,
    updateStatus,
    deleteUser
} from "../controllers/userController";
import { payment } from "../middlewares/midtrans";
export const userRouter = express.Router()

userRouter.get('/', getAllUser)
userRouter.post('/', createUser)
userRouter.patch('/:id',payment,updateStatus)
userRouter.delete('/:id', deleteUser)