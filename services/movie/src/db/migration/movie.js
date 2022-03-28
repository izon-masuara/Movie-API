import mongoose from "mongoose";
const { Schema } = mongoose

const movieModel = new Schema({
    title : {
        type : String,
        required : true
    },
    image : {
        type : Buffer,
        required : true,
        filename : {
            type : String,
            required : true
        },
        mimetype : {
            type : String,
            required : true
        }
    },
    description : {
        type : String,
        required : true
    },
    like : [],
    category : {
        type : Array,
        lowercase : true,
        required : true
    },
    production : {
        year : String,
        productionBy : String
    }
})

const Movie = mongoose.model('Movie',movieModel)

export default Movie