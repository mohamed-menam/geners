const logger=require('../winstonLogger')

module.exports=function(){
    process.on('uncaughtException',(ex)=>{
        console.log("We can't Caught Exception")
        logger.log({
            level:'error',
            message:ex.message
        })
    })
    
    process.on('unhandledRejection',(ex)=>{
        console.log("We Get Handled Rejection")
        logger.log({
            level:'error',
            message:ex.message
        })
    })
}