import { NextFunction, Request, Response } from "express"
import logger from "../logger.winston"

const loggerMiddleware = (request: Request, _response: Response, next: NextFunction) => {
    logger.http(`METHOD: ${request.method} - PATH: ${request.originalUrl} - RESPONSE STATUS: ${_response.statusCode}`)
    next()
}

export default loggerMiddleware