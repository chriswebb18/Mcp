import dotenv from 'dotenv';
import { startServer } from './mcp/server';
import config from '../config';
import logger from './utils/logger';

// Load environment variables from .env file
dotenv.config();

// Set up unhandled error and promise rejection handlers
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason: Error | any) => {
  logger.error('Unhandled rejection', reason instanceof Error ? reason : new Error(String(reason)));
  // Don't exit for unhandled rejections
});

// Start the MCP server
async function start(): Promise<void> {
  try {
    // Define the port to listen on
    const port = typeof config.server.port === 'string' 
      ? parseInt(config.server.port, 10) 
      : config.server.port;

    await startServer(port);
    logger.info(`LinkedIn MCP server running on port ${port}`);
  } catch (error) {
    logger.error('Failed to start LinkedIn MCP server', error instanceof Error ? error : new Error(String(error)));
    process.exit(1);
  }
}

// Start the server
start();