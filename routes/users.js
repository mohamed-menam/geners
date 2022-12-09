const express =require('express')
const _ =require('lodash')
const bcrypt=require('bcrypt')
const router=express.Router()
const {userValidation}=require('../validation')
const {User} =require('../models/user')
const auth = require('../midleware/auth')



router.get('/me',auth,async(req,res)=>{
    const user=await User.findById(req.user._id).select('-password')
    res.send(user)
})

router.post('/',async(req,res)=>{
    const {error}=userValidation(req.body);
    if (error){return res.status(404).send(error.details[0].message)}

    let user=await User.findOne({email:req.body.email})
    if (user){return res.status(404).send('user already registered...!')}

    user=new User(_.pick(req.body,['name','email','password','isAdmin']))
    const salt =await bcrypt.genSalt(10)
    user.password=await bcrypt.hash(user.password,salt)

    await user.save()
    const token=user.genrateAuthToken()
    res.header('x-auth-token',token).send(_.pick(user,['name','email']))

})



module.exports=router