import express from 'express'
import { userRouter } from './user'
import { loginRouter } from './login'
import { errorUserHandler } from '../middlewares/userErrorHeadler'
export const router = express.Router()

router.use('/users',userRouter)
router.use('/login',loginRouter)
router.use(errorUserHandler)