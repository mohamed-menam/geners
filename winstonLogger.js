const { format } = require('winston');
const winston=require('winston')
require('winston-mongodb')



const myFormat = format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });





const logger = winston.createLogger({
    level: 'info',
    format:  format.combine( format.json(),
    format.label({ label: 'right now!' }), 
    format.timestamp(),
    myFormat
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.MongoDB({db:'mongodb://localhost/Movie'}),
    ],
    });       



module.exports=logger
