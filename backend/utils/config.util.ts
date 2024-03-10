import * as dotenv from 'dotenv'

class ConfigService {

    constructor() {
        dotenv.config()
    }

    get<T>(key: string, defaultValue?: T): T {
        const value = process.env[key] || defaultValue
        return value as T
    }
}

export default ConfigService