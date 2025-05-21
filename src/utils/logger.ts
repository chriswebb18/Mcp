import config from '../../config';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

class Logger {
  private currentLevel: LogLevel;

  constructor() {
    this.currentLevel = config.server.logLevel || 'info';
  }

  /**
   * Check if the given log level should be logged
   * @param level Log level to check
   * @returns Whether the log level should be logged
   */
  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.currentLevel];
  }

  /**
   * Format log message with timestamp and level
   * @param level Log level
   * @param message Log message
   * @param meta Additional metadata
   * @returns Formatted log object
   */
  private formatLog(level: LogLevel, message: string, meta?: Record<string, unknown>): object {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(meta || {}),
    };
  }

  /**
   * Log a debug message
   * @param message Log message
   * @param meta Additional metadata
   */
  debug(message: string, meta?: Record<string, unknown>): void {
    if (this.shouldLog('debug')) {
      console.debug(JSON.stringify(this.formatLog('debug', message, meta)));
    }
  }

  /**
   * Log an info message
   * @param message Log message
   * @param meta Additional metadata
   */
  info(message: string, meta?: Record<string, unknown>): void {
    if (this.shouldLog('info')) {
      console.info(JSON.stringify(this.formatLog('info', message, meta)));
    }
  }

  /**
   * Log a warning message
   * @param message Log message
   * @param meta Additional metadata
   */
  warn(message: string, meta?: Record<string, unknown>): void {
    if (this.shouldLog('warn')) {
      console.warn(JSON.stringify(this.formatLog('warn', message, meta)));
    }
  }

  /**
   * Log an error message
   * @param message Log message
   * @param error Error object
   * @param meta Additional metadata
   */
  error(message: string, error?: Error, meta?: Record<string, unknown>): void {
    if (this.shouldLog('error')) {
      console.error(
        JSON.stringify(
          this.formatLog('error', message, {
            ...(meta || {}),
            error: error ? {
              name: error.name,
              message: error.message,
              stack: error.stack,
            } : undefined,
          }),
        ),
      );
    }
  }
}

// Export singleton logger instance
export const logger = new Logger();

export default logger;