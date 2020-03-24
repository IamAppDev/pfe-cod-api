const winston = require('winston');
require('express-async-errors');


module.exports = () => {

    process.on('unhandledRejection', (ex) => { throw ex; });

    const logger =  winston.createLogger({
        //level: 'info',
        level: 'silly',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
          //new winston.transports.File({ filename: './log/error.log', level: 'error' }),
          //new winston.transports.File({ filename: './log/warn.log', level: 'warn' }),
          new winston.transports.File({ filename: './log/combined.log' })
        ],
        exceptionHandlers: [
          new winston.transports.File({ filename: './log/exceptions.log' })
        ]
    });

    if (process.env.NODE_ENV !== 'production') {
      logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.simple(),
            winston.format.prettyPrint())
      }));
    }

    return logger;
};