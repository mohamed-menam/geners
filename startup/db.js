const mongoose=require('mongoose')
const logger=require('../winstonLogger')


module.exports=function(){
    
    mongoose.connect('mongodb://localhost/Movie')
    .then(()=>logger.info('connected to db ......'))


}

