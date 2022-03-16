import express from 'express'
import { userRouter } from './user'
import { loginRouter } from './login'
export const router = express.Router()

router.use('/users',userRouter)
router.use('/login',loginRouter)