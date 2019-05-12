import winston from 'winston';
import fs from 'fs';
import path from 'path';
import { Logger } from 'winston';

const logDir = './logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync( logDir );
}

const info = new (Logger)({
    transports: [
        new winston.transports.File({
            filename: path.join(logDir, '/info.log'),
            level: 'info'
        })
    ]
});

const debug = new (Logger)({
    transports: [
        new winston.transports.File({
            filename: path.join(logDir, '/debug.log'),
            level: 'debug'
        })
    ]
});

const warn = new (Logger)({
    transports: [
        new winston.transports.File({
            filename: path.join(logDir, '/warn.log'),
            level: 'warn'
        })
    ]
});

const error = new (Logger)({
    transports: [
        new winston.transports.File({
            filename: path.join(logDir, '/errors.log'),
            level: 'error'
        })
    ]
});

const logger = {
    info: info.info,
    debug: debug.debug,
    warn: warn.warn,
    error: error.error
};

export default logger;
