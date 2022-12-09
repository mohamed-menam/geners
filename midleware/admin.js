function authAdmin(req,res,next){

    if(!req.user.isAdmin){return res.status(403).send('Acess denied....!')}
    next()
}




module.exports=authAdmin