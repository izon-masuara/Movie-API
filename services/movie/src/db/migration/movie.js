import mongoose from "mongoose";
const { Schema } = mongoose

const movieModel = new Schema({
    data: {
        id: mongoose.Schema.Types.ObjectId,
        title: {
            type: String,
            required: true
        },
        image: {
            filename: {
                type: String,
                required: true
            },
            mimetype: {
                type: String,
                required: true
            },
            uploadDate: {
                type: Date,
                required: true
            }
        },
        description: {
            type: String,
            required: true
        },
        like: [],
        genre: {
            type: Array,
            lowercase: true,
            required: true
        },
        production: {
            year: String,
            productionBy: String
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        }
    },
    image : {}
})

const Movie = mongoose.model('Movie', movieModel)

export default Movie