const app = require('./app') // the actual express app
const http = require('http') 
const config = require('./utils/config') // enviroment variables
const logger = require('./utils/logger') // log info to console

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Listening on ${config.PORT}`)
})