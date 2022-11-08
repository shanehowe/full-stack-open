const morgan = require('morgan'); // log requests to console
const logger = require('./logger'); // log errors / info to console
const User = require('../models/user');
const jwt = require('jsonwebtoken');

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
    logger.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ 
            error: 'malformatted id' 
        });
      } else if (error.name === 'ValidationError') {
        return response.status(400).json({ 
            error: error.message 
        });
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
             error: 'invalid token' 
        });
    } else if (error.name == 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        });
    }

    next(error);
};

const tokenExtractor = (request, response, next) => {
    /*
     Extracts token for request
     Token can now be got from request using syntax
     --> const token = request.token <--
     */
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7);
    }

    next();
}

const userExtracter = async (request, response, next) => {
    /*
     Extracts user from the request
     User can now be got from request using syntax
     --> const user = request.user <--
    */

     const token = request.token;

     if (token) {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decodedToken.id);
        request.user = user;
     }

     next();
}

module.exports = {
    requestLogger,
    unkownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtracter
};