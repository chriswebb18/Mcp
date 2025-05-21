# LinkedIn MCP (Model Context Protocol)

## Project Overview

LinkedIn MCP is a Model Context Protocol server that enables AI agents, particularly GitHub Copilot in VS Code, to interact with LinkedIn's professional networking services. This server implements the [Model Context Protocol](https://modelcontextprotocol.io/introduction) specification to provide a standardized way for AI agents to access and manipulate LinkedIn data.

With LinkedIn MCP, you can:
- Manage your LinkedIn profile
- Access and analyze job postings
- Retrieve company information
- View professional profiles
- Access stored resumes
- Submit applications through LinkedIn's Easy Apply feature

This project bridges the gap between AI assistants and LinkedIn's rich professional data ecosystem, enabling more productive workflows for job seeking, networking, and professional development.

## LinkedIn API Integration

This MCP server integrates with the [LinkedIn API](https://learn.microsoft.com/en-us/linkedin/) to provide comprehensive access to LinkedIn's platform features. Key API integrations include:

- **Profile Management**: View and update your LinkedIn profile
- **Job Search & Analysis**: Search for jobs and analyze job details
- **Company Data**: Access company information and insights
- **Profile Data**: View and analyze professional profiles
- **Resume Management**: Retrieve resumes stored on LinkedIn
- **Job Applications**: Submit applications via LinkedIn's Easy Apply feature

## Getting Started for Developers

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [LinkedIn Developer Account](https://developer.linkedin.com/)
- LinkedIn API credentials (Client ID and Client Secret)

### Installation

1. Clone this repository:
   ```
   git clone https://github.com/chriswebb18/Mcp.git
   cd Mcp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure your LinkedIn API credentials:
   ```
   cp .env.example .env
   ```
   Edit the `.env` file and add your LinkedIn API credentials.

4. Start the development server:
   ```
   npm run dev
   ```

### Project Structure

```
/
├── src/               # Source code
│   ├── api/           # LinkedIn API integration
│   ├── mcp/           # MCP protocol implementation
│   └── server.js      # Main server file
├── config/            # Configuration files
└── tests/             # Test files
```

## Getting Started for Users

### VS Code Integration

To use LinkedIn MCP with VS Code:

1. Install the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension

2. Configure LinkedIn MCP in VS Code settings:
   - Open VS Code settings (File > Preferences > Settings)
   - Search for "Copilot"
   - Add the following configuration:

   ```json
   "github.copilot.advanced": {
     "mcp": {
       "linkedin": {
         "endpoint": "http://localhost:3000",
         "authToken": "YOUR_AUTH_TOKEN"
       }
     }
   }
   ```

3. Authenticate with LinkedIn when prompted

### Using LinkedIn MCP with GitHub Copilot

Once configured, you can interact with LinkedIn through GitHub Copilot's chat interface:

- Get job recommendations: `@linkedin find jobs for software engineer in Seattle`
- Update your profile: `@linkedin update my headline to "Full Stack Developer"`
- View company information: `@linkedin tell me about Microsoft`
- Submit job applications: `@linkedin apply to job posting #12345`

## MCP Configuration Reference

### VS Code Configuration

```json
"github.copilot.advanced": {
  "mcp": {
    "linkedin": {
      "endpoint": "http://localhost:3000",  // MCP server endpoint
      "authToken": "YOUR_AUTH_TOKEN",       // Authentication token
      "features": {                         // Optional feature flags
        "jobSearch": true,
        "profileManagement": true,
        "companyData": true,
        "easyApply": true
      }
    }
  }
}
```

### Authentication Options

LinkedIn MCP supports multiple authentication methods:

1. **OAuth Token**: Use LinkedIn OAuth flow (recommended for production)
2. **API Key**: Use direct API key for development

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Deployment

LinkedIn MCP can be deployed both locally for development and testing, or to Azure for production use.

### Local Deployment

For local development and testing deployment:

1. Ensure you have Docker installed on your machine
2. Build and start the Docker container:
   ```bash
   docker-compose up -d
   ```

Detailed instructions can be found in our [Local Deployment Guide](deployment/LOCAL_DEPLOYMENT.md).

### Azure Deployment

For production deployment to Azure:

1. Configure your Azure resources using our template
2. Deploy using Azure Pipeline or GitHub Actions workflow

Detailed instructions can be found in our [Azure Deployment Guide](deployment/AZURE_DEPLOYMENT.md).

### CI/CD Pipeline

Set up continuous integration and deployment:

1. Configure GitHub Actions workflows
2. Set up deployment environments
3. Configure approval gates

Detailed instructions can be found in our [CI/CD Setup Guide](deployment/CI_CD_SETUP.md).

## License

[MIT License](LICENSE)