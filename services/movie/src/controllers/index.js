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
    const { filename, mimetype, uploadDate } = req.file

    const arrGenre = await coma(genre)

    const payload = {
        title: title,
        image: {
            filename: filename,
            mimetype: mimetype,
            uploadDate: uploadDate
        },
        description: description,
        genre: arrGenre,
        production: {
            year: year,
            productionBy: by
        }
    }
    try {
        const created = await MovieModel.Create(payload)
        res.status(201).json(`${created.data.title} success added`)
    } catch (err) {
        console.log(err)
    }
}

const updateData = async (req, res, next) => {
    const { id } = req.params

    const {
        title,
        description,
        genre,
        year,
        by
    } = req.body

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
        const updated = await MovieModel.update(id, payload)
        res.status(200).json(updated)
    } catch (err) {
        console.log(err)
    }
}

export {
    getAll,
    createData,
    updateData
}