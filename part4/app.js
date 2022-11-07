const config = require('./utils/config');
const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');
const blogRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

logger.info('Connecting to', config.MONGODB_URI);

mongoose
    .connect(config.MONGODB_URI)
    .then(() => logger.info('Connected to MongoDB'))
    .catch(error => logger.error('error connecting: ', error.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(middleware.unkownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;