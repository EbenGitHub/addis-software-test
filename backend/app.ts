import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import songRouter from './controllers/songs.controller'
import config from './utils/config'
import errorHandler from './middlewares/errorHandling.middleware'
import testingRouter from './controllers/testing.controller'
import logger from './logger.winston'
import loggerMiddleware from './middlewares/logger.middleware'
import statsRouter from './controllers/statistics.controller'
const path = require('path');

mongoose.set('strictQuery', false)
mongoose.connect(`${config.DB_URL}?authSource=admin`, {
    auth: {
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD,
    }
})
    .then(() => {
        logger.info('Application connected to db: ' + config.DB_URL)
    })


const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/songs/', loggerMiddleware, songRouter)
app.use('/api/stats', loggerMiddleware, statsRouter)

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

if (config.isTest) {
    app.use('/api/testing', testingRouter)
}

app.use(errorHandler)

export default app