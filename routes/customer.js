const express=require('express')

const router=express.Router()
const {customerValidation}=require('../validation')
// const customerValidation=validation.customerValidation
const mongoose=require('mongoose');
const { string } = require('joi');

const Customer=mongoose.model('customer',new mongoose.Schema({
    isGold:{
        type:Boolean,
        default:false
        },
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:55
    },
    phone:{
        type:String,
        required:true,
    }
}));



router.get('/',async(req,res)=>{
    const customers= await Customer.find().sort('name');
    res.send(customers)
})

router.get('/:id',async(req,res)=>{
    const customer=await Customer.findById(req.params.id)
    res.send(customer)
})



router.post('/',async(req,res)=>{
    const {error}=customerValidation(req.body);
    if (error){return res.status(404).send(error.details[0].message)}
    let customer=new Customer({
        name:req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold
    })
    customer = await customer.save()
    res.send(customer)
})


router.put('/:id',async(req,res)=>{
    const {error}=customerValidation(req.body);
    if (error){return res.status(404).send(error.details[0].message) }
    const customer =await Customer.findByIdAndUpdate(req.params.id,{
        $set:{
            name:req.body.name,
            phone:req.body.phone,
            isGold:req.body.isGold
        }
    },{new:true})
    if (!customer){
        return res.status(404).send('not find the customer ..!')
    }
    
    res.send(customer)


} )



router.delete('/:id',async(req,res)=>{
    const customer= await Customer.findByIdAndRemove(req.params.id,{name:true})
    if (!customer){return res.status(400).send("the id is not true")}
    res.send(customer)
})
module.exports=router;