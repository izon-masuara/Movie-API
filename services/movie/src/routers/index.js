import express from 'express'
import {
    getAll,
    createData,
    patchData,
    like,
    destroy,
    viewImage
} from '../controllers'
import { upload } from '../middlewares/multer'
const router = express.Router()

router.get('/', getAll)
router.post('/', upload.single('image'), createData)
router.patch('/:id', patchData)
router.patch('/like/:id', like)
router.delete('/:id', destroy)
router.get('/:id', viewImage)

export default router