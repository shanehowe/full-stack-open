const morgan = require('morgan'); // log requests to console
const logger = require('./logger'); // log errors / info to console

morgan.token('data', request => {
    return request.method === 'POST' ? JSON.stringify(request.body) : '';
});

const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :data');

const unkownEndpoint = (request, response) => {
    response.status(404).send(
        { error: 'unknown endpoint'}
    );
};
  
const errorHandler = (error, request, response, next) => {
    logger.info(error.message);

    if (error.name === 'CastError')
    {
        return response.status(400).send(
            { error: 'malformatted id' }
        );
    } 
    else if (error.name === 'ValidationError')
    {
        return response.status(400).send(
            { error: error.message }
        );
    }
    next(error);
};

module.exports = {
    requestLogger,
    unkownEndpoint,
    errorHandler
};