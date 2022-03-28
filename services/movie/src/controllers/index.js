import MovieModel from '../db/model/movie'

const getAll = async (req,res,next) => {
    try {
        const data = await MovieModel.findAll()
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
}

export {
    getAll
}