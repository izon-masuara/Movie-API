import MovieModel from '../db/model/movie'
import { coma } from '../helper/coma'

const getAll = async (req, res, next) => {
    try {
        const data = await MovieModel.findAll()
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
}

const createData = async (req, res, next) => {
    const {
        title,
        description,
        genre,
        year,
        by
    } = req.body
    const { filename,uploadDate } = req.file

    const video = {
        filename,
        uploadDate
    }

    const arrGenre = await coma(genre)

    const payload = {
        title: title,
        description: description,
        genre: arrGenre,
        production: {
            year: year,
            productionBy: by
        }
    }
    try {
        const created = await MovieModel.Create(payload,video)
        res.status(201).json(`${created.data.title} success added`)
    } catch (err) {
        console.log(err)
    }
}

const patchData = async (req,res,next) => {
    const { id } = req.params
    const { 
        title,
        description,
        genre,
        production,
        year
    } = req.body

    const arrGenre = await coma(genre)

    const payload = {
        title,
        description,
        genre : arrGenre,
        production : {
            productionBy : production,
            year
        }
    }
    const updated = await MovieModel.patchMovie(id,payload)
    res.status(200).json(`update to ${updated.data.title} success`)
}

const like = async (req, res, next) => {
    console.log('masuk di like')
    const { id } = req.params
    const { user_id,username } = req.body
    try {
        await MovieModel.like(id,username,user_id)
        res.status(201).json('success')
    } catch (err) {
        console.log(err)
    }
}

const destroy = async (req,res,next) => {
    const { id } = req.params
    try {
        const deleteData = await MovieModel.destroy(id)
        res.status(200).json('success delete data')
    } catch (err) {
        
    }
}

const viewVideo = async (req,res,next) => {
    const { id } = req.params
    try {
        const video = await MovieModel.viewVideo(id)
        video.on("data", data => {
            res.status(200).write(data);
        })
        video.on("err", err => {
            res.status(200).json(`Cannot display video`);
        })
        video.on("end", () => {
            res.end()
        })
    } catch (err) {
        console.log(err)
    }
}

export {
    getAll,
    createData,
    patchData,
    like,
    destroy,
    viewVideo
}