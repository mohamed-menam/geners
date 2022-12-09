const Joi =require('joi')
Joi.objectId=require('joi-objectid')(Joi)
// make validation function by use JOI
function genresValidation(genre){
    const schema=Joi.object({
        name:Joi.string().min(3).required()
    })
    return schema.validate(genre)
}

function customerValidation(customer){
    const schema=Joi.object({
        name:Joi.string().min(3).required(),
        phone:Joi.string().min(3).required(),
        isGold:Joi.boolean()
    })
    return schema.validate(customer)
}

function movieValidation(movie){
    const schema=Joi.object({
        title:Joi.string().min(3).required(),
        genreId:Joi.string().required(),
        numberInStock:Joi.number().min(0).max(255).required(),
        dailyRentalRate:Joi.number().min(0).max(255).required(),
    })
    return schema.validate(movie)
}



function rantalValidation(rantel){
    const schema=Joi.object({
        customerId:Joi.objectId().required(),
        movieId:Joi.objectId().required()
    })
    return schema.validate(rantel)
}

function userValidation(user){
    const schema=Joi.object({
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().min(3).max(255).required().email(),
        password:Joi.string().min(3).max(255).required(),
        isAdmin:Joi.boolean().required()
    })
    return schema.validate(user)
}

function authvalidation(auth){
    const schema=Joi.object({
        email:Joi.string().min(3).max(255).required().email(),
        password:Joi.string().min(3).max(255).required()
    })
    return schema.validate(auth)
}



module.exports.customerValidation =customerValidation
module.exports.genresValidation=genresValidation
module.exports.movieValidation=movieValidation
module.exports.rantalValidation=rantalValidation
module.exports.userValidation=userValidation
module.exports.authvalidation=authvalidation