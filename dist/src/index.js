"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("./mcp/server");
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("./utils/logger"));
// Load environment variables from .env file
dotenv_1.default.config();
// Set up unhandled error and promise rejection handlers
process.on('uncaughtException', (error) => {
    logger_1.default.error('Uncaught exception', error);
    process.exit(1);
});
process.on('unhandledRejection', (reason) => {
    logger_1.default.error('Unhandled rejection', reason instanceof Error ? reason : new Error(String(reason)));
    // Don't exit for unhandled rejections
});
// Start the MCP server
async function start() {
    try {
        // Define the port to listen on
        const port = typeof config_1.default.server.port === 'string'
            ? parseInt(config_1.default.server.port, 10)
            : config_1.default.server.port;
        await (0, server_1.startServer)(port);
        logger_1.default.info(`LinkedIn MCP server running on port ${port}`);
    }
    catch (error) {
        logger_1.default.error('Failed to start LinkedIn MCP server', error instanceof Error ? error : new Error(String(error)));
        process.exit(1);
    }
}
// Start the server
start();
