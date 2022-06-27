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
import { auth } from '../middlewares/authMovies'
import { errHandlers } from '../middlewares/errorHandler'
const router = express.Router()

router.get('/', getAll)
// authentication
router.use(auth)
router.get('/:id', viewVideo)
router.patch('/like/:id', like)
// authorization
router.post('/',upload.single('video'), createData) //<<<<<<< Upload Video 
router.patch('/:id', patchData)
router.delete('/:id', destroy)
router.use(errHandlers)

export default router