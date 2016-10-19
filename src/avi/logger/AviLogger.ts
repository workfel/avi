/**
 * Created by johan on 18/11/2015.
 */

import winston = require('winston');

var logger = new (winston.Logger)({
    levels: {
        trace: 0,
        input: 1,
        verbose: 2,
        prompt: 3,
        debug: 4,
        info: 5,
        data: 6,
        help: 7,
        warn: 8,
        error: 9
    },
    colors: {
        trace: 'magenta',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        debug: 'blue',
        info: 'green',
        data: 'grey',
        help: 'cyan',
        warn: 'yellow',
        error: 'red'
    }
});

logger.add(winston.transports.Console, {
    level: 'debug',
    prettyPrint: true,
    colorize: true,
    silent: false,
    timestamp: false
});

logger.add(winston.transports.File, {
    prettyPrint: false,
    level: 'info',
    silent: false,
    colorize: true,
    timestamp: true,
    filename: './avi.log',
    maxsize: 40000,
    maxFiles: 10,
    json: false
});

var myCustomLevels = {
    colors: {
        error: 'red',
        warn: 'orange',
        debug: 'blue',
        info: 'green'
    }
};

//winston.addColors(myCustomLevels.colors);
export class AviLogger {

    log(type:string, text:any) {
        logger.log(type, text);
    }

    error(text:any):void {
        logger.error(text);
    }

    warn(text:any):void {
        logger.warn(text);
    }

    debug(text:any):void {
        logger.debug(text);
    }

    info(text:any) {
        logger.info(text);
    }
}