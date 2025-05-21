import { Capability } from '../src/mcp/types';

export interface ServerConfig {
  port: number | string;
  host: string;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
}

export interface LinkedInConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export interface MCPConfig {
  capabilities: Capability[];
  debugMode?: boolean;
}

export interface Config {
  server: ServerConfig;
  linkedIn: LinkedInConfig;
  mcp: MCPConfig;
}