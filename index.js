const exprss=require('express')
const app=exprss()
const genre=require("./routes/genres")
app.use(exprss.json())

app.use("/api/genres",genre)



app.listen(3000,()=>console.log("listening in port 3000 ....."))
