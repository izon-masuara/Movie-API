import express from "express";
import { 
    getAllUser,
    createUser,
    updateStatus,
    deleteUser
} from "../controllers/userController";
export const userRouter = express.Router()

userRouter.get('/', getAllUser)
userRouter.post('/', createUser)
userRouter.patch('/:id', updateStatus)
userRouter.delete('/:id', deleteUser)