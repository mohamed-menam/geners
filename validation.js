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

exports.customerValidation =customerValidation
exports.genresValidation=genresValidation