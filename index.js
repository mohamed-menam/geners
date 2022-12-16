const exprss=require('express')
const app=exprss()

require('./startup/logger')()
require('./startup/routes')(app)
require('./startup/config')()
require('./startup/db')()




app.listen(3000,()=>console.log("listening in port 3000 ....."))

