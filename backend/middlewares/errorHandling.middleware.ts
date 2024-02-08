import { NextFunction, Request, Response } from "express"
import logger from "../logger.winston"

const errorHandler = (error: Error, _request: Request, response: Response, next: NextFunction) => {
    logger.error(error)

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

export default errorHandler