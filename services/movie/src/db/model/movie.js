import { Movie,File } from '../migration'
import { getVideo } from '../../helper/getVideo'

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

    static async Create(payload,video){
        try {
            const find = await File.find({
                filename : video.filename,
                uploadDate : video.uploadDate
            })
            if(find.length === 0){
                // delete video 
                throw {
                    code : 404,
                    message :  `Your video fail added`
                }
            }
            const payloadCreated = {
                data : payload,
                video : find
            }
            const created = await Movie.create(payloadCreated)
            return created
        } catch (err) {
            throw err
        }
    }

    static async patchMovie(id,payload){
        try {
            const updated = await Movie.findByIdAndUpdate({ _id:id }, { data : payload })
            return updated
        } catch (err) {
            // console.log(err)
        }
    }

    static async like(movie_id,username,user_id){
        try {
            const found = await Movie.findById({ _id : movie_id })
            if(found === null){
                throw {
                    code : 404,
                    message : `Movie not found`
                }
            }
            // if user id already exits in property like changes the like be come unlike
            found.like.push({
                user_id,username
            })
            const updated = await Movie.updateOne({ _id:found._id },{
                like : found.like
            })
        } catch (err) {
            console.log(err)
        }
    }

    static async destroy(id){
        try {
            const found = await Movie.findByIdAndDelete({_id:id})
            await Movie.findByIdAndDelete({ _id : found.video[0]._id })
        } catch (err) {
            console.log(err)
        }
    }

    static async viewVideo(id){
        try {
            const found = await Movie.findById({_id:id})
            if(found === null){
                throw {
                    code : 404,
                    message : `Data not found`
                }
            }
            const video = await getVideo(found.video[0].filename)
            return video
        } catch (err) {
            console.log(err)
        }
    }
}