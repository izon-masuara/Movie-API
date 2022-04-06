import express from 'express'
import {
    getAll,
    createData,
    updateData
} from '../controllers'
import { upload } from '../middlewares/multer'
const router = express.Router()

router.get('/', getAll)
router.post('/', upload.single('image'), createData)
router.patch('/:id', updateData)

export default router