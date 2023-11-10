import winston from 'winston';
import config from './config';

const customFormat = winston.format((info, opts) => {
    // eslint-disable-next-line fp/no-mutation
    info.meta = {
        service: 'konnekt-service',
    };
    return info;
});

export const logger = winston.createLogger({
    level: config.LOGGING_LEVEL ? 'debug' : 'info',
    transports: [
        //
        // - Write all logs error (and below) to `error.log`.
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        //
        // - Write to all logs with specified level to console.
        new winston.transports.Console({
            format: winston.format.combine(
                customFormat(),
                winston.format.timestamp(),
                winston.format.json(),
            ),
            silent: process.argv.indexOf('--silent') >= 0,
        }),
    ],
});
