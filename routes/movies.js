const exprss=require("express")
const router=exprss.Router()
const Movie=require('../models/movie')
const {movieValidation}=require('../validation')
const {Genres} =require('../models/genre')



router.get('/',async(req,res)=>{
    const movies=await Movie.find()
    res.send(movies)
})

router.get('/:id',async(req,res)=>{
    const movie=await Movie.findById(req.params.id)
    res.send(movie)
})

router.post('/',async(req,res)=>{
    const {error}=movieValidation(req.body);
    if(error){return res.status(400).send(error.details[0].message)}
    const genre= await Genres.findById(req.body.genreId)
    if(!genre){return res.status(400).send("Genre Id is not true")}
    let movie = new Movie({
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    })
    movie=await movie.save()
    res.send(movie)
})


router.put('/:id',async(req,res)=>{
    const {error}=movieValidation(req.body);
    if(error){return res.status(400).send(error.details[0].message)}
    const genre =await Genres.findById(req.body.genreId)
    if (!genre){return res.status(404).send("Genre Id is not true")}
    const movie= await Movie.findByIdAndUpdate(req.params.id,{
        $set:{
            title:req.body.title,
            genreId:req.body.genreId,
            numberInStock:req.body.numberInStock,
            dailyRentalRate:req.body.dailyRentalRate
        }
    },{new:true})
    if(!movie){return res.status(400).send("not find the movie ..!")}
    res.send(movie)
})


router.delete('/:id',async(req,res)=>{
    const movie=await Movie.findByIdAndRemove(req.params.id,{new:true})
    res.send(movie)
})

module.exports=router