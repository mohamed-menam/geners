const mongoose=require('mongoose');


const Customer=mongoose.model('customer',new mongoose.Schema({
    isGold:{
        type:Boolean,
        default:false
        },
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:55
    },
    phone:{
        type:String,
        required:true,
    }
}));



module.exports=Customer