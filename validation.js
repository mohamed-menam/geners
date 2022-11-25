const Joi =require('joi')
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


exports.customerValidation =customerValidation
exports.genresValidation=genresValidation
module.exports.movieValidation=movieValidation