import express from "express";
import { 
    getAll,
    loginController,
    logOut 
} from "../controllers/loginController";

export const loginRouter = express.Router()

loginRouter.get('/',getAll)
loginRouter.post('/', loginController)
loginRouter.delete('/:id',logOut)