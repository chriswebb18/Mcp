import dotenv from 'dotenv';
import { startServer } from './mcp/server';

// Load environment variables from .env file
dotenv.config();

// Define the port to listen on
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Start the MCP server
startServer(port)
  .then(() => {
    console.log(`LinkedIn MCP server running on port ${port}`);
  })
  .catch((error) => {
    console.error('Failed to start LinkedIn MCP server:', error);
    process.exit(1);
  });