const { default: mongoose } = require('mongoose')
const mongoos=require('mongoose')
const jwt=require('jsonwebtoken')
const config=require('config')


const userSchema=new mongoos.Schema({
    name:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        requried:true,
        minlength:5,
        maxlength:1025
    },
    isAdmin:{
        type:Boolean,
        requried:true
    }
})
userSchema.methods.genrateAuthToken=function(){
    const token=jwt.sign({_id:this.id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'))
    return token;
}

const User=mongoose.model('User',userSchema)


module.exports.User=User;

