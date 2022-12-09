const mongoose=require('mongoose')
const genreSchema=require('./genre')
const Schema=genreSchema.schema

const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:1,
        maxlength:55
    },
    genre: {
        type:Schema,
        required:true
    },
    numberInStock:{
        type:Number,
        default:0
    },
    dailyRentalRate:{
        type:Number,
        min:0,
        max:255
    }
})

const Movie =mongoose.model('Movie',movieSchema)



module.exports=Movie