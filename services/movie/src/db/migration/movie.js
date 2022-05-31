import mongoose from "mongoose";
const { Schema } = mongoose

const movieModel = new Schema({
    data: {
        id: mongoose.Schema.Types.ObjectId,
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        genre: {
            type: Array,
            lowercase: true,
            required: true
        },
        production: {
            year: String,
            productionBy: String
        },
    },
    like: {
        type : Array
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    video : {}
})

const Movie = mongoose.model('Movie', movieModel)

export default Movie