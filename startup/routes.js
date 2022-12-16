const exprss=require('express')
const customer=require('../routes/customers')
const genre=require("../routes/genres")
const movie=require('../routes/movies')
const rental=require('../routes/rentals')
const user=require('../routes/users')
const auth=require('../routes/auth')
const error=require('../midleware/error')


module.exports=function(app){
    app.use(exprss.json())
    app.use('/api/movies',movie)
    app.use('/api/genres',genre)
    app.use('/api/customer',customer)
    app.use('/api/rental',rental)
    app.use('/api/user',user)
    app.use('/api/login',auth)
    app.use(error)
}