const mongoose=require('mongoose')
const exprss=require('express')
const app=exprss()
const customer=require('./routes/customers')
const genre=require("./routes/genres")
const movie=require('./routes/movies')
const rental=require('./routes/rentals')
const user=require('./routes/users')
const auth=require('./routes/auth')
const config=require('config')
const error=require('./midleware/error')


app.use(exprss.json())

if (!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR: jwtPrivateKey is not defined')
    process.exit(1)
}


app.use('/api/movies',movie)
app.use('/api/genres',genre)
app.use('/api/customer',customer)
app.use('/api/rental',rental)
app.use('/api/user',user)
app.use('/api/login',auth)
app.use(error)
mongoose.connect('mongodb://localhost/Movie')
    .then(()=>console.log('connected to db ......'))
    .catch(err=>console.error('could not connect to db ....'))


app.listen(3000,()=>console.log("listening in port 3000 ....."))
