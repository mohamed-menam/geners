const Joi=require('joi')
const exprss=require('express')
const app=exprss()
app.use(exprss.json())

// make validation function by use JOI
function genresValidation(genre){
    const schema=Joi.object({
        name:Joi.string().min(3).required()
    })
    return schema.validate(genre)
}

const genres=[
    {id:1 , name:"Adventure"},
    {id:2 , name:"Comedy"},
    {id:3 , name:"Drama"},
    {id:4 , name:"Horror"},
    {id:5 , name:"Romance"}
]


app.get('/api/genres',(req,res)=>{
    // return all genres 
    res.send(genres);
});

app.get('/api/genres/:id',(req,res)=>{
    // look up to the genre
    const genre =genres.find(c=>c.id===parseInt(req.params.id));
    // if not existing return 404
    if(!genre){
        return res.status(400).send("the genre not found !")
    };
    return res.send(genre)
});

app.post('/api/genres',(req,res)=>{
    // validate
    const {error}=genresValidation(req.body)
    if (error){
        return res.status(404).send(error.details[0].message)
    }
    //create genre
    const genre={
        id:genres.length+1,
        name:req.body.name
    }
    // uploade the new gener
    genres.push(genre)
    // return the new gener
    res.send(genre)
});

app.listen(3000,()=>console.log("listening in port 3000 ....."))

app.put('/api/genres/:id',(req,res)=>{
    // look up to the genre
    const genre=genres.find(c=>c.id ===parseInt(req.params.id));
    // if not existing return 404
    if (!genre){return res.status(404).send('id not true !')}
    // validate
    const {error}=genresValidation(req.body)
    // if invalid return 400
    if(error){return res.status(400).send(error.details[0].message)}
    // update genre
    genre.name===req.body.name
    // return the update genre
    res.send(genre)
});


app.delete('/api/genres/:id',(req,res)=>{
    // look up to the genre
    const genre=genres.find(c=>c.id===parseInt(req.params.id));
    // if not existing return 404
    if (!genre){return res.status(404).send('id not true !')}
    // Delete
    const index=genres.indexOf(genre)
    genres.splice(index,1)
    // return the same genre
    res.send(genre)
});