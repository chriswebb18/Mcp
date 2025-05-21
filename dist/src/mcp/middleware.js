"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
exports.errorHandler = errorHandler;
exports.requestLogger = requestLogger;
const logger_1 = __importDefault(require("../utils/logger"));
/**
 * HTTP Error class for API errors
 */
class HttpError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'HttpError';
    }
}
exports.HttpError = HttpError;
/**
 * Error handling middleware
 */
function errorHandler(err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) {
    const statusCode = err instanceof HttpError ? err.statusCode : 500;
    const errorMessage = err.message || 'Internal Server Error';
    // Log the error
    logger_1.default.error(`Error processing request: ${req.method} ${req.path}`, err, {
        statusCode,
        requestId: req.headers['x-request-id'] || '',
        userId: req.userId || '',
    });
    // Send error response
    res.status(statusCode).json({
        type: 'error',
        data: {
            message: errorMessage,
            ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {}),
        },
    });
}
/**
 * Request logging middleware
 */
function requestLogger(req, res, next) {
    const startTime = Date.now();
    // Log the request
    logger_1.default.info(`Request received: ${req.method} ${req.path}`, {
        requestId: req.headers['x-request-id'] || '',
        userId: req.userId || '',
        userAgent: req.headers['user-agent'],
        ip: req.ip,
    });
    // Log the response when it's sent
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        logger_1.default.info(`Request completed: ${req.method} ${req.path}`, {
            requestId: req.headers['x-request-id'] || '',
            userId: req.userId || '',
            statusCode: res.statusCode,
            duration: `${duration}ms`,
        });
    });
    next();
}
