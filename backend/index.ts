import config from './utils/config'
import app from './app'
import logger from './logger.winston'

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
    logger.info(`Environment: ${config.ENV}`)
})