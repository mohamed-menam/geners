const logger=require('../winstonLogger')

function error(err,req,res,next){

      logger.log({
        level: 'error',
        message:err.message
      });
    res.status(403).send('something is wrong...')
}


module.exports = error
