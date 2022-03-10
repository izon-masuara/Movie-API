import express from 'express'
import { userRouter } from './user'
import { loginRouter } from './login'
export const router = express.Router()

router.use('/user',userRouter)
router.use('/login',loginRouter)