"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const default_1 = __importDefault(require("../../config/default"));
const app = (0, express_1.default)();
exports.app = app;
// Middleware for parsing JSON bodies
app.use(express_1.default.json());
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
// Get MCP capabilities endpoint
app.get('/api/v1/mcp/capabilities', (req, res) => {
    const capabilityResponse = {
        capabilities: default_1.default.mcp.capabilities,
    };
    res.status(200).json(capabilityResponse);
});
// MCP request endpoint
app.post('/api/v1/mcp/request', (req, res) => {
    try {
        const mcpRequest = req.body;
        // Basic validation
        if (!mcpRequest.type) {
            return res.status(400).json({
                type: 'error',
                data: { message: 'Request type is required' },
            });
        }
        // TODO: Implement actual MCP request handling logic
        // For now, just echo back the request with a mock response
        const mcpResponse = {
            type: `${mcpRequest.type}.response`,
            data: { message: 'MCP request received successfully', request: mcpRequest },
            context: mcpRequest.context,
        };
        res.status(200).json(mcpResponse);
    }
    catch (error) {
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
async function startServer(port) {
    return new Promise((resolve) => {
        app.listen(port, () => {
            resolve();
        });
    });
}
