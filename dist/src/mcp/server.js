"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const middleware_1 = require("./middleware");
const logger_1 = __importDefault(require("../utils/logger"));
const capabilities_1 = require("./capabilities");
// Initialize Express application
const app = (0, express_1.default)();
exports.app = app;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(middleware_1.requestLogger);
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', version: '1.0.0' });
});
// Get MCP capabilities endpoint
app.get('/api/v1/mcp/capabilities', (req, res) => {
    logger_1.default.debug('Received request for MCP capabilities');
    const capabilities = capabilities_1.capabilitiesProvider.getCapabilities();
    const capabilityResponse = {
        capabilities,
    };
    logger_1.default.info('Returning MCP capabilities', { count: capabilityResponse.capabilities.length });
    res.status(200).json(capabilityResponse);
});
// MCP request endpoint
app.post('/api/v1/mcp/request', (req, res) => {
    try {
        const mcpRequest = req.body;
        // Basic validation
        if (!mcpRequest.type) {
            logger_1.default.warn('Invalid MCP request: missing type');
            throw new middleware_1.HttpError('Request type is required', 400);
        }
        logger_1.default.debug('Processing MCP request', {
            type: mcpRequest.type,
            hasContext: !!mcpRequest.context,
        });
        // TODO: Implement actual MCP request handling logic based on request type
        // For now, just echo back the request with a mock response
        const mcpResponse = {
            type: `${mcpRequest.type}.response`,
            data: {
                message: 'MCP request received successfully',
                timestamp: new Date().toISOString(),
            },
            context: mcpRequest.context,
        };
        logger_1.default.info('MCP request processed successfully', { type: mcpRequest.type });
        res.status(200).json(mcpResponse);
    }
    catch (error) {
        // Let the error middleware handle it
        if (error instanceof middleware_1.HttpError) {
            throw error;
        }
        else if (error instanceof Error) {
            throw new middleware_1.HttpError(error.message);
        }
        else {
            throw new middleware_1.HttpError('Unknown error processing MCP request');
        }
    }
});
// Error handling middleware (must be last)
app.use(middleware_1.errorHandler);
/**
 * Start the MCP server on the specified port
 * @param port Port to listen on
 * @returns Promise that resolves when the server is started
 */
async function startServer(port) {
    return new Promise((resolve) => {
        const server = app.listen(port, () => {
            logger_1.default.info(`LinkedIn MCP server started`, { port });
            resolve();
        });
        // Handle server errors
        server.on('error', (error) => {
            logger_1.default.error('Server error', error);
        });
    });
}
