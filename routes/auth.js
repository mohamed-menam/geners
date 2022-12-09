const express=require('express')
const router=express.Router()
const {authvalidation}=require('../validation')
const {User}=require('../models/user')
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')
const config=require('config')


router.post('/',async(req,res)=>{
    const {error}=authvalidation(req.body);
    if (error){return res.status(400).send(error.details[0].message)}

    let user= await User.findOne({email:req.body.email})
    if (!user){return res.status(400).send("Invalide Email Or Passwodrd...!")}

    const validepassword=await bcrypt.compare(req.body.password,user.password)
    if (!validepassword){return res.status(400).send("Invalide Email Or Passwodrd...!")}
    const token=user.genrateAuthToken()
    
    res.send(token)

})





module.exports=router