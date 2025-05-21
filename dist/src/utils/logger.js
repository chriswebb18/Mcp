"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const config_1 = __importDefault(require("../../config"));
const LOG_LEVELS = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
};
class Logger {
    constructor() {
        this.currentLevel = config_1.default.server.logLevel || 'info';
    }
    /**
     * Check if the given log level should be logged
     * @param level Log level to check
     * @returns Whether the log level should be logged
     */
    shouldLog(level) {
        return LOG_LEVELS[level] >= LOG_LEVELS[this.currentLevel];
    }
    /**
     * Format log message with timestamp and level
     * @param level Log level
     * @param message Log message
     * @param meta Additional metadata
     * @returns Formatted log object
     */
    formatLog(level, message, meta) {
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
    debug(message, meta) {
        if (this.shouldLog('debug')) {
            console.debug(JSON.stringify(this.formatLog('debug', message, meta)));
        }
    }
    /**
     * Log an info message
     * @param message Log message
     * @param meta Additional metadata
     */
    info(message, meta) {
        if (this.shouldLog('info')) {
            console.info(JSON.stringify(this.formatLog('info', message, meta)));
        }
    }
    /**
     * Log a warning message
     * @param message Log message
     * @param meta Additional metadata
     */
    warn(message, meta) {
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
    error(message, error, meta) {
        if (this.shouldLog('error')) {
            console.error(JSON.stringify(this.formatLog('error', message, {
                ...(meta || {}),
                error: error ? {
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                } : undefined,
            })));
        }
    }
}
// Export singleton logger instance
exports.logger = new Logger();
exports.default = exports.logger;
