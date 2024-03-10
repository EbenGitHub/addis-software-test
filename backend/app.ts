import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import songRouter from './controllers/songs.controller'
import errorHandler from './middlewares/errorHandling.middleware'
import logger from './logger.winston'
import loggerMiddleware from './middlewares/logger.middleware'
import statsRouter from './controllers/statistics.controller'
import ConfigService from './utils/config.util'
const path = require('path');

const configService = new ConfigService()

mongoose.set('strictQuery', false)
mongoose.connect(`${configService.get<string>('MONGODB_URI')}?authSource=admin`, {
    auth: {
        username: configService.get<string>('MONGODB_USERNAME'),
        password: configService.get<string>('MONGODB_PASSWORD'),
    }
})
    .then(() => {
        logger.info('Application connected to db: ' + configService.get('MONGODB_URI'))
    })


const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/songs/', loggerMiddleware, songRouter)
app.use('/api/stats', loggerMiddleware, statsRouter)

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (_req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(errorHandler)

export default app