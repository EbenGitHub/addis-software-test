import * as dotenv from 'dotenv'
dotenv.config()

const ENV = process.env.NODE_ENV || 'development'
const DB_URL = (ENV === 'production' ?
    process.env.MONGODB_URI : process.env.TEST_MONGODB_URI)
    || 'mongodb://localhost:27017/songs'
const DB_USERNAME = process.env.MONGODB_USERNAME || 'mongo'
const DB_PASSWORD = process.env.MONGODB_PASSWORD || 'mongo'

const PORT = process.env.PORT || 3003

const isTest = ENV === 'test'

export default { DB_URL, PORT, isTest, DB_USERNAME, DB_PASSWORD, ENV }