const mongoose=require('mongoose')

const rentalSchema=new mongoose.Schema({
    custmoer:{
        type:new mongoose.Schema({
            name:{
                type:String,
                minlength:5,
                maxlength:255,
                required:true
            },
            isGold:{
                type:Boolean,
                default:false
            },
            phone:{
                type:String,
                minlength:5,
                maxlength:255
            }
        }),
        required:true
    },
    movie:{
        type:new mongoose.Schema({
            title:{
                type:String,
                required:true,
                minlength:3,
                maxlength:255,
                trim:true
            },
            dailyRentalRate:{
                type:Number,
                required:true,
                min:0,
                max:255
            }
        }),
        required:true
    },
    dateOut:{
        type:Date,
        required:true,
        default:Date.now
    },
    dateRuterned:{
        type:Date
    },
    rantalFee:{
        type:Number,
        min:0
    }

})

const Rental=mongoose.model('Rantel',rentalSchema)


module.exports.Rental=Rental