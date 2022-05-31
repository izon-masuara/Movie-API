import express from 'express'
import {
    getAll,
    createData,
    patchData,
    like,
    destroy,
    viewVideo
} from '../controllers'
import { upload } from '../middlewares/multer'
const router = express.Router()

router.get('/', getAll)
// Auth Login user status active
router.get('/:id', viewVideo)
router.patch('/like/:id', like)
// All of routes above this must be way Auth as admin 
// Upload Video
router.post('/', upload.single('video'), createData) //<<<<<<< Upload Video 
router.patch('/:id', patchData)
router.delete('/:id', destroy)

export default router