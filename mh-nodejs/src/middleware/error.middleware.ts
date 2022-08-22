import { NextFunction, Request, Response } from 'express'
import ErrorUtils from '../utils/error.utils'

export const errorMiddleware = (err: ErrorUtils, req: Request, res: Response, next: NextFunction) => {
	const statusCode = err.statusCode || 500
	const errorCode = err.errorCode || 'SERVER_ERROR'
	const message = err.message || 'Something went wrong'
	res.status(statusCode).json({ errorCode, message })
}

// HTTP status code
// 401 Unauthorized
// 403 Forbidden
// 429 Too Many Requests
// 498 Invalid Token
// 499 Token Required
