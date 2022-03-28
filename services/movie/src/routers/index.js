import express from 'express'
import { getAll } from '../controllers'
const router = express.Router()

router.get('/', getAll)

export default router