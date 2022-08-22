"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorCode = err.errorCode || 'SERVER_ERROR';
    const message = err.message || 'Something went wrong';
    res.status(statusCode).json({ errorCode, message });
};
exports.errorMiddleware = errorMiddleware;
