"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("./mcp/server");
// Load environment variables from .env file
dotenv_1.default.config();
// Define the port to listen on
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
// Start the MCP server
(0, server_1.startServer)(port)
    .then(() => {
    console.log(`LinkedIn MCP server running on port ${port}`);
})
    .catch((error) => {
    console.error('Failed to start LinkedIn MCP server:', error);
    process.exit(1);
});
