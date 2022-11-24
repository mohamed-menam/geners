const mongoose=require('mongoose')
const exprss=require("express")
const router=exprss.Router()
const Validation=require('../validation')
const genresValidation=Validation.genresValidation



const Genres=mongoose.model('Genres',new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
}));




router.get('/',async (req,res)=>{
    const genres= await Genres.find()
    // return all genres 
    res.send(genres);
});

router.get('/:id',async (req,res)=>{
    // look up to the genre
    const genre= await Genres.findById(req.params.id);
    
    // if not existing return 404
    if(!genre){
        return res.status(400).send("the genre not found !")
    };
    return res.send(genre)
});

router.post('/',async(req,res)=>{
    // validate
    const {error}=genresValidation(req.body)
    if (error){
        return res.status(404).send(error.details[0].message)
    }
    //create genre
    let genre=new Genres({name:req.body.name})
    genre=await genre.save()
    // return the new genre
    res.send(genre)
});


router.put('/:id',async(req,res)=>{
    // validate
    const {error}=genresValidation(req.body)
    // if invalid return 400
    if(error){return res.status(400).send(error.details[0].message)}
    // update genre
    const genre = await Genres.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
    // if not existing return 404
    if (!genre){return res.status(404).send('id not true !')}
    // return the update genre
    res.send(genre)
});


router.delete('/:id',async(req,res)=>{
    // look up to the genre
    // Delete
    const genre= await Genres.findByIdAndRemove(req.params.id,{new:true})
    // if not existing return 404
    if (!genre){return res.status(404).send('id not true !')}

    // return the same genre
    res.send(genre)
});

module.exports=router;