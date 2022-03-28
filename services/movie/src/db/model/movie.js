import Movie from '../migration/movie'

export default class MovieModel {
    static async findAll(){
        try {
            const data = await Movie.find()
            return data
        } catch (err) {
            console.log('masuk di error')
            throw {
                code : `500`,
                message : `Internal server error`
            }
        }
    }
}