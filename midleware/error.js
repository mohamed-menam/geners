function error(err,req,res,next){
    res.status(403).send('something is wrong...')
}


module.exports = error