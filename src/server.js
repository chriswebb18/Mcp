/**
 * LinkedIn MCP Server
 * Main server file for the LinkedIn Model Context Protocol implementation
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'LinkedIn MCP server is running' });
});

// MCP Protocol route (placeholder)
app.post('/mcp', (req, res) => {
  res.status(501).json({ 
    error: 'Not implemented yet',
    message: 'MCP protocol implementation is under development'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`LinkedIn MCP server running on port ${PORT}`);
});

module.exports = app; // For testing purposes