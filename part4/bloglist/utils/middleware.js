const logger = require('./logger');

const requestLogger = (request, response, next) => {
   logger.info('Method >>', request.method);
   logger.info('Path >>', request.path);
   logger.info('Params >>', request.params);
   logger.info('Body >>', request.body);
   logger.info('---');

   next();
};

const unknownEndpoint = (request, response) => {
   response.status(404).send('unknown endpoint');
};

// eslint-disable-next-line
const errorHandler = (error, request, response, next) => {
   console.log(error.message);

   if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' });
   } else if (error.name === 'ValidationError') {
      return response.status(400).json({
         error: error.message,
      });
   }
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };