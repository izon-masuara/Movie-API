import { Movie,File } from '../migration'

export default class MovieModel {
    static async findAll(){
        try {
            const data = await Movie.find({})
            return data
        } catch (err) {
            throw {
                code : `500`,
                message : `Internal server error`
            }
        }
    }

    static async Create(payload){
        try {
            const find = await File.find({
                filename : payload.image.filename,
                uploadDate : payload.image.uploadDate
            })
            if(find.length === 0){
                throw {
                    code : 404,
                    message :  `Your image fail added`
                }
            }
            const payloadCreated = {
                data : payload,
                image : find
            }
            const created = await Movie.create(payloadCreated)
            return created
        } catch (err) {
            throw err
        }
    }

    static async update(id,payload){
        try {
            const updated = await Movie.findByIdAndUpdate({_id:`${id}`},{data : payload})
            return 'Updated success'
        } catch (err) {
            console.log(err)
        }
    }
}