import * as winston from 'winston';
import {ElasticsearchTransformer, ElasticsearchTransport,LogData, TransformedData} from 'winston-elasticsearch';

const esTransformer = (logData: LogData): TransformedData => ElasticsearchTransformer(logData);

export function winstonLogger(elasticsearchnode: string, name: string, level: string = 'info'): winston.Logger {
    const esTransport = new ElasticsearchTransport({
        level,
        clientOpts: {
            node: elasticsearchnode, //es server link
            requestTimeout: 60000,
            maxRetries: 2
        },
        transformer: esTransformer
    });

    const logger = winston.createLogger({
        level,
        exitOnError: true,
        defaultMeta: {service: name},
        handleExceptions: true,
        transports: [
            esTransport,
            new winston.transports.Console({
                level,
                handleExceptions: true
            })
        ]
    });

    return logger;
}