import express, { Request, Response } from 'express';
import config from '../../config/default';
import { MCPRequest, MCPResponse, CapabilityResponse } from './types';

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Get MCP capabilities endpoint
app.get('/api/v1/mcp/capabilities', (req: Request, res: Response) => {
  const capabilityResponse: CapabilityResponse = {
    capabilities: config.mcp.capabilities,
  };
  res.status(200).json(capabilityResponse);
});

// MCP request endpoint
app.post('/api/v1/mcp/request', (req: Request, res: Response) => {
  try {
    const mcpRequest: MCPRequest = req.body;
    
    // Basic validation
    if (!mcpRequest.type) {
      return res.status(400).json({
        type: 'error',
        data: { message: 'Request type is required' },
      });
    }

    // TODO: Implement actual MCP request handling logic
    
    // For now, just echo back the request with a mock response
    const mcpResponse: MCPResponse = {
      type: `${mcpRequest.type}.response`,
      data: { message: 'MCP request received successfully', request: mcpRequest },
      context: mcpRequest.context,
    };

    res.status(200).json(mcpResponse);
  } catch (error) {
    console.error('Error processing MCP request:', error);
    res.status(500).json({
      type: 'error',
      data: { message: 'Internal server error' },
    });
  }
});

/**
 * Start the MCP server on the specified port
 * @param port Port to listen on
 * @returns Promise that resolves when the server is started
 */
export async function startServer(port: number): Promise<void> {
  return new Promise((resolve) => {
    app.listen(port, () => {
      resolve();
    });
  });
}

// Export Express app for testing
export { app };