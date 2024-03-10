import app from './app'
import logger from './logger.winston'
import ConfigService from './utils/config.util'

const configService = new ConfigService()
app.listen(configService.get<number>('PORT', 3000), () => {
    logger.info(`Server running on port ${configService.get<number>('PORT', 3000)}`)
    logger.info(`Environment: ${configService.get<string>('NODE_ENV', 'development')}`)
})