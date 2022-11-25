const mongoose=require('mongoose')

const genreSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
})

const Genres=mongoose.model('Genres',genreSchema);

module.exports.Genres=Genres

module.exports.schema=genreSchema