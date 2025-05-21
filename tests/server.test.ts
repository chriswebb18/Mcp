/**
 * Server tests
 */

// Import Jest types
import { describe, expect, it } from '@jest/globals';
import { app } from '../src/mcp/server';
import request from 'supertest';
import { capabilitiesProvider } from '../src/mcp/capabilities';

// Mock the capabilities provider
jest.mock('../src/mcp/capabilities', () => ({
  capabilitiesProvider: {
    getCapabilities: jest.fn().mockReturnValue([
      {
        name: 'profile',
        version: '1.0.0',
        description: 'Profile operations for LinkedIn MCP',
      },
      {
        name: 'job',
        version: '1.0.0',
        description: 'Job operations for LinkedIn MCP',
      },
    ]),
  },
}));

describe('MCP Server', () => {
  it('should return a 200 OK response for health check', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok', version: '1.0.0' });
  });

  it('should return capabilities', async () => {
    const response = await request(app).get('/api/v1/mcp/capabilities');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('capabilities');
    expect(Array.isArray(response.body.capabilities)).toBe(true);
    expect(capabilitiesProvider.getCapabilities).toHaveBeenCalled();
  });

  it('should handle MCP requests', async () => {
    const testRequest = {
      type: 'test.request',
      context: {
        sessionId: 'test-session',
      },
      parameters: {
        test: true,
      },
    };

    const response = await request(app)
      .post('/api/v1/mcp/request')
      .send(testRequest)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('type', 'test.request.response');
    expect(response.body).toHaveProperty('context.sessionId', 'test-session');
    expect(response.body.data).toHaveProperty('message', 'MCP request received successfully');
    expect(response.body.data).toHaveProperty('timestamp');
  });

  it('should return a 400 error for invalid MCP requests', async () => {
    const invalidRequest = {
      // Missing type field
      context: {
        sessionId: 'test-session',
      },
    };

    const response = await request(app)
      .post('/api/v1/mcp/request')
      .send(invalidRequest)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('type', 'error');
    expect(response.body.data).toHaveProperty('message', 'Request type is required');
  });
});