import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from '../../config';
import { MCPRequest, MCPResponse, CapabilityResponse } from './types';
import { errorHandler, requestLogger, HttpError } from './middleware';
import logger from '../utils/logger';
import { capabilitiesProvider } from './capabilities';

// Initialize Express application
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', version: '1.0.0' });
});

// Get MCP capabilities endpoint
app.get('/api/v1/mcp/capabilities', (req: Request, res: Response) => {
  logger.debug('Received request for MCP capabilities');
  
  const capabilities = capabilitiesProvider.getCapabilities();
  const capabilityResponse: CapabilityResponse = {
    capabilities,
  };
  
  logger.info('Returning MCP capabilities', { count: capabilityResponse.capabilities.length });
  res.status(200).json(capabilityResponse);
});

// MCP request endpoint
app.post('/api/v1/mcp/request', (req: Request, res: Response) => {
  try {
    const mcpRequest: MCPRequest = req.body;
    
    // Basic validation
    if (!mcpRequest.type) {
      logger.warn('Invalid MCP request: missing type');
      throw new HttpError('Request type is required', 400);
    }

    logger.debug('Processing MCP request', { 
      type: mcpRequest.type,
      hasContext: !!mcpRequest.context,
    });
    
    // TODO: Implement actual MCP request handling logic based on request type
    
    // For now, just echo back the request with a mock response
    const mcpResponse: MCPResponse = {
      type: `${mcpRequest.type}.response`,
      data: { 
        message: 'MCP request received successfully',
        timestamp: new Date().toISOString(),
      },
      context: mcpRequest.context,
    };

    logger.info('MCP request processed successfully', { type: mcpRequest.type });
    res.status(200).json(mcpResponse);
  } catch (error) {
    // Let the error middleware handle it
    if (error instanceof HttpError) {
      throw error;
    } else if (error instanceof Error) {
      throw new HttpError(error.message);
    } else {
      throw new HttpError('Unknown error processing MCP request');
    }
  }
});

// Error handling middleware (must be last)
app.use(errorHandler);

/**
 * Start the MCP server on the specified port
 * @param port Port to listen on
 * @returns Promise that resolves when the server is started
 */
export async function startServer(port: number): Promise<void> {
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      logger.info(`LinkedIn MCP server started`, { port });
      resolve();
    });
    
    // Handle server errors
    server.on('error', (error: Error) => {
      logger.error('Server error', error);
    });
  });
}

// Export Express app for testing
export { app };