import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage'
const url = 'mongodb://localhost:27017/movie_api'

const storage = GridFsStorage({
    url: url,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg","video/mp4"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: 'images',
            filename: `${Date.now()}-${file.originalname}`
        };
    }
})

export const upload = multer({ storage: storage })