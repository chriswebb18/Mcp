import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

/**
 * HTTP Error class for API errors
 */
export class HttpError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'HttpError';
  }
}

/**
 * Error handling middleware
 */
export function errorHandler(
  err: Error | HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  const statusCode = err instanceof HttpError ? err.statusCode : 500;
  const errorMessage = err.message || 'Internal Server Error';
  
  // Log the error
  logger.error(`Error processing request: ${req.method} ${req.path}`, err, {
    statusCode,
    requestId: req.headers['x-request-id'] || '',
    userId: (req as any).userId || '',
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
export function requestLogger(
  req: Request, 
  res: Response, 
  next: NextFunction
): void {
  const startTime = Date.now();
  
  // Log the request
  logger.info(`Request received: ${req.method} ${req.path}`, {
    requestId: req.headers['x-request-id'] || '',
    userId: (req as any).userId || '',
    userAgent: req.headers['user-agent'],
    ip: req.ip,
  });
  
  // Log the response when it's sent
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info(`Request completed: ${req.method} ${req.path}`, {
      requestId: req.headers['x-request-id'] || '',
      userId: (req as any).userId || '',
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    });
  });
  
  next();
}