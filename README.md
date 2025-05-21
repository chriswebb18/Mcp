# LinkedIn Mcp (Machine Control Proxy)

## Project Overview

The LinkedIn Mcp is a comprehensive API wrapper and control proxy for interacting with LinkedIn's platform. It provides developers with a unified interface to access and manipulate LinkedIn data, manage profiles, interact with jobs and companies, and automate common workflows.

### Key Features

- **Profile Management**: Update and manage your LinkedIn profile programmatically
- **Data Access**: Extract data from jobs, companies, profiles, and other LinkedIn entities
- **Resume Management**: Access and manage resumes stored in LinkedIn
- **Job Applications**: Automate submission to "Easy Apply" jobs
- **VSCode and GHCP Integration**: Seamlessly integrate with development environments

## Getting Started - Development

### Prerequisites

- .NET 6.0 SDK or later
- Visual Studio 2022 or Visual Studio Code
- GitHub account with appropriate access permissions
- LinkedIn Developer Account (for API access)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/chriswebb18/Mcp.git
   cd Mcp
   ```

2. Install dependencies:
   ```
   dotnet restore
   ```

3. Build the project:
   ```
   dotnet build
   ```

### Development Workflow

1. Create a feature branch from main:
   ```
   git checkout -b feature/your-feature-name
   ```

2. Implement and test your changes
3. Submit a pull request to the main branch

## Getting Started - Usage

### Configuration

To use the LinkedIn Mcp in your project, you'll need to configure it with appropriate credentials and settings.

#### Basic Configuration

```json
{
  "LinkedInMcp": {
    "ClientId": "your-linkedin-client-id",
    "ClientSecret": "your-linkedin-client-secret",
    "RedirectUri": "your-application-redirect-uri",
    "Scopes": ["r_liteprofile", "r_emailaddress", "w_member_social"]
  }
}
```

### VSCode Integration

To integrate the LinkedIn Mcp with Visual Studio Code, add the following configuration to your `.vscode/settings.json` file:

```json
{
  "mcp.linkedin": {
    "enabled": true,
    "configPath": "./linkedin-mcp-config.json",
    "autoLogin": false,
    "cacheDirectory": "${workspaceFolder}/.linkedin-cache"
  }
}
```

### Example Usage

```csharp
// Initialize the LinkedIn Mcp client
var linkedInMcp = new LinkedInMcpClient(configuration);

// Get profile information
var profile = await linkedInMcp.GetProfileAsync();

// Search for jobs
var jobs = await linkedInMcp.SearchJobsAsync(new JobSearchCriteria
{
    Keywords = "software engineer",
    Location = "Seattle, WA",
    Distance = 25
});

// Apply to a job
await linkedInMcp.ApplyToJobAsync(jobId, resumeId, coverLetterId);
```

## API Features

### Profile Management

- Get profile information
- Update profile details
- Manage profile visibility settings
- Add/update skills, experience, and education

### Data Reading

- Search and retrieve job listings
- Get company information
- Search for and retrieve user profiles
- Access network connections

### Resume Management

- List saved resumes
- Upload new resumes
- Update existing resumes
- Delete resumes

### Job Applications

- Search for jobs
- Apply to "Easy Apply" jobs
- Track application status
- Receive notifications for application updates

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.