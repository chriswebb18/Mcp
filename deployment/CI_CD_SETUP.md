# CI/CD Pipeline Setup Guide

This guide covers how to set up a Continuous Integration and Continuous Deployment (CI/CD) pipeline for the LinkedIn MCP server using GitHub Actions.

## Prerequisites

- [GitHub Account](https://github.com/)
- [Azure Account](https://azure.microsoft.com/en-us/free/)
- Repository with the LinkedIn MCP code
- Azure resources as described in the [Azure Deployment Guide](AZURE_DEPLOYMENT.md)

## Setting Up GitHub Actions

### 1. Create GitHub Secrets

In your GitHub repository, add the following secrets:

1. Navigate to your repository on GitHub
2. Go to Settings > Secrets and variables > Actions
3. Add the following secrets:

- `AZURE_CREDENTIALS`: Service principal credentials JSON
- `LINKEDIN_CLIENT_ID`: Your LinkedIn API client ID
- `LINKEDIN_CLIENT_SECRET`: Your LinkedIn API client secret

To create the Azure service principal and get credentials:

```bash
az ad sp create-for-rbac \
  --name "github-actions-linkedin-mcp" \
  --role contributor \
  --scopes /subscriptions/<subscription-id>/resourceGroups/<resource-group-name> \
  --sdk-auth

# The output JSON should be added as AZURE_CREDENTIALS secret
```

### 2. Create Workflow Files

Create a `.github/workflows` directory in your repository:

```bash
mkdir -p .github/workflows
```

### 3. Create CI Workflow File

Create a file `.github/workflows/ci.yml` for continuous integration:

```yaml
name: LinkedInMCP-CI

on:
  push:
    branches: [ main, dev ]
  pull_request:
    branches: [ main, dev ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Lint
      run: npm run lint
      
    - name: Build
      run: npm run build
      
    - name: Test
      run: npm test
```

### 4. Create CD Workflow File

Create a file `.github/workflows/cd.yml` for continuous deployment:

```yaml
name: LinkedInMCP-CD

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy-dev:
    runs-on: ubuntu-latest
    environment: development
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Test
      run: npm test
      
    - name: Login to Azure
      uses: azure/login@v1
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}
        
    - name: Deploy to Azure Web App - DEV
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'linkedin-mcp-dev'
        package: .

  deploy-staging:
    needs: deploy-dev
    runs-on: ubuntu-latest
    environment: staging
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Login to Azure
      uses: azure/login@v1
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}
        
    - name: Deploy to Azure Web App - STAGING
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'linkedin-mcp-staging'
        package: .

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://linkedin-mcp.azurewebsites.net
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Login to Azure
      uses: azure/login@v1
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}
        
    - name: Deploy to Azure Web App - PRODUCTION
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'linkedin-mcp'
        package: .
```

## Setting Up GitHub Environments

To use approval gates and environment-specific secrets:

1. In your GitHub repository, go to Settings > Environments
2. Create three environments:
   - development
   - staging
   - production
3. For staging and production, add Required reviewers
4. Add environment-specific secrets if needed

## Setting Up Branch Protection Rules

1. Go to Settings > Branches
2. Add a branch protection rule for `main`:
   - Require pull request reviews before merging
   - Require status checks to pass before merging
   - Select the CI workflow as a required status check
   - Require branches to be up to date before merging

## Pipeline Workflow

Once set up, the pipeline follows this workflow:

1. **Continuous Integration**: On every push or pull request, code is linted, built, and tested.
2. **Development Deployment**: When changes are merged to main, code is automatically deployed to the development environment.
3. **Staging Deployment**: After successful development deployment, code is deployed to staging (requires approval).
4. **Production Deployment**: After successful staging deployment, code is deployed to production (requires approval).

## Monitoring the Pipeline

1. Go to the "Actions" tab in your repository to monitor workflow runs
2. Check deployment status in the Azure Portal
3. Set up notifications for workflow failures:
   - Go to your GitHub profile > Settings > Notifications
   - Configure notification preferences for workflow runs

## Troubleshooting

### Common Issues

**Deployment Failures**:
- Check GitHub Actions logs for detailed error information
- Verify Azure credentials are correct
- Check if the Azure resources exist and are accessible

**Environment Issues**:
- Verify environment-specific configurations
- Check if the required approvers have approved the deployment

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Azure DevOps Documentation](https://docs.microsoft.com/en-us/azure/devops/)
- [GitHub Environments and Secrets](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)