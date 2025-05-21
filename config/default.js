/**
 * Default configuration for LinkedIn MCP server
 */

module.exports = {
  server: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development',
  },
  
  linkedin: {
    apiBaseUrl: 'https://api.linkedin.com/v2',
    authCallbackUrl: process.env.LINKEDIN_AUTH_CALLBACK_URL || 'http://localhost:3000/auth/linkedin/callback',
  },
  
  mcp: {
    // MCP protocol configuration options
    defaultContext: 'linkedin',
    supportedCapabilities: [
      'profile',
      'jobs',
      'companies',
      'resumes',
      'applications'
    ]
  },
  
  // Security settings
  security: {
    jwtSecret: process.env.JWT_SECRET || 'development-secret-key-change-in-production',
    jwtExpiration: '1d', // Token expiration
  }
};