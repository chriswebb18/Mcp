export default {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
  },
  linkedIn: {
    clientId: process.env.LINKEDIN_CLIENT_ID || '',
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
    redirectUri: process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:3000/auth/callback',
  },
  mcp: {
    capabilities: [
      {
        name: 'profile',
        version: '1.0.0',
        description: 'Provides access to LinkedIn profile data',
      },
      {
        name: 'job',
        version: '1.0.0',
        description: 'Provides access to LinkedIn job data and application features',
      },
      {
        name: 'company',
        version: '1.0.0',
        description: 'Provides access to LinkedIn company data',
      },
      {
        name: 'resume',
        version: '1.0.0',
        description: 'Provides access to LinkedIn resume management features',
      },
    ],
  },
};