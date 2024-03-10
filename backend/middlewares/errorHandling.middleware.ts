import { NextFunction, Request, Response } from "express"
import logger from "../logger.winston"
import isString from "../utils/isString.util"

const errorHandler = (error: Error, _request: Request, response: Response, next: NextFunction) => {
    logger.error(error)

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    if (error.message && isString(error.message) && error.message.includes("not found")) {
        return response.status(404).json({ error: error.message })
    }

    next(error)
}

export default errorHandler