const express=require('express')
const router=express.Router()
const {Rental}=require('../models/rental')
const {rantalValidation}=require('../validation')
const Customer=require('../models/customer')
const Movie=require('../models/movie')
const Fawn=require('fawn')
var mongoose=require('mongoose')
Fawn.init('mongodb://localhost/Movie')


router.get('/',async(req,res)=>{
    const rental=await Rental.find().sort('-dateOut')
    res.send(rental)
})


router.post('/',async(req,res)=>{
    const {error} = rantalValidation(req.body)
    if (error){return res.status(400).send(error.details[0].message)}

    const custmoer= await Customer.findById(req.body.customerId)
    if (!custmoer){return res.status(400).send('customer id is not true')}

    const movie=await Movie.findById(req.body.movieId)
    if (!movie){return res.status(400).send('movie id is not true')}

    if (movie.numberInStock===0){return res.status(400).send('MOvie not in stock')}

    let rental=new Rental({
        custmoer:{
            _id:custmoer._id,
            name:custmoer.name,
            phone:custmoer.phone
        },
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate
        }
    })
    rental=await rental.save()
    movie.numberInStock--;
    movie.save()

    res.send(rental)
})






module.exports=router


