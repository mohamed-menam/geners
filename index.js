const mongoose=require('mongoose')
const exprss=require('express')
const app=exprss()
const customer=require('./routes/customers')
const genre=require("./routes/genres")
const movie=require('./routes/movies')
app.use(exprss.json())

app.use('/api/movies',movie)
app.use('/api/genres',genre)
app.use('/api/customer',customer)


mongoose.connect('mongodb://localhost/Movie')
    .then(()=>console.log('connected to db ......'))
    .catch(err=>console.error('could not connect to db ....'))


app.listen(3000,()=>console.log("listening in port 3000 ....."))
