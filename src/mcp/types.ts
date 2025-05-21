/**
 * TypeScript types for the MCP server
 * These types match the TypeSpec definitions in src/typespec/mcp/mcp.tsp
 */

export interface Capability {
  name: string;
  version: string;
  description: string;
}

export interface CapabilityResponse {
  capabilities: Capability[];
}

export interface Context {
  sessionId?: string;
  user?: {
    id?: string;
    preferences?: Record<string, unknown>;
  };
  task?: {
    description?: string;
    status?: string;
  };
  additional?: Record<string, unknown>;
}

export interface MCPRequest {
  type: string;
  context?: Context;
  parameters?: Record<string, unknown>;
}

export interface MCPResponse {
  type: string;
  data?: unknown;
  context?: Context;
}