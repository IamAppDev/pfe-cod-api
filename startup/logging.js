const winston = require('winston');
require('express-async-errors');


module.exports = () => {

    process.on('unhandledRejection', (ex) => { throw ex; });

    const logger =  winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
          new winston.transports.File({ filename: 'error.log', level: 'error' }),
          new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
          new winston.transports.File({ filename: 'combined.log' })
        ],
        exceptionHandlers: [
          new winston.transports.File({ filename: 'exceptions.log' })
        ]
    });

    /*if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
           colorize: true, prettyPrint: true 
        }));
    };*/

    return logger;
};