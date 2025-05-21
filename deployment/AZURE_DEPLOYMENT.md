# Azure Deployment Guide

This guide covers how to deploy the LinkedIn MCP server to Microsoft Azure for production use.

## Prerequisites

Before deploying to Azure, ensure you have the following:

- [Azure Account](https://azure.microsoft.com/en-us/free/)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- [Node.js](https://nodejs.org/) (version 16 or later)
- [Git](https://git-scm.com/)

## Infrastructure Setup

### 1. Resource Group Creation

Create a resource group for the LinkedIn MCP application:

```bash
az login
az group create --name linkedin-mcp-rg --location eastus
```

### 2. App Service Plan Creation

Create an App Service Plan for the MCP server:

```bash
az appservice plan create \
  --name linkedin-mcp-plan \
  --resource-group linkedin-mcp-rg \
  --sku B1 \
  --is-linux
```

### 3. Azure App Service Creation

Create an App Service for the MCP server:

```bash
az webapp create \
  --name linkedin-mcp \
  --resource-group linkedin-mcp-rg \
  --plan linkedin-mcp-plan \
  --runtime "NODE|16-lts"
```

### 4. Configure Application Settings

Set environment variables for your Azure App Service:

```bash
az webapp config appsettings set \
  --resource-group linkedin-mcp-rg \
  --name linkedin-mcp \
  --settings \
    LINKEDIN_CLIENT_ID=your_client_id \
    LINKEDIN_CLIENT_SECRET=your_client_secret \
    NODE_ENV=production \
    PORT=8080
```

## Deployment Methods

### Method 1: Deploy from GitHub Actions

See the [CI/CD Setup Guide](CI_CD_SETUP.md) for deploying using GitHub Actions.

### Method 2: Deploy Using Azure CLI

1. Build the application locally:

```bash
npm install
npm run build
```

2. Deploy to Azure:

```bash
az webapp deployment source config-local-git \
  --name linkedin-mcp \
  --resource-group linkedin-mcp-rg

# Get the deployment URL
deployment_url=$(az webapp deployment list-publishing-credentials \
  --name linkedin-mcp \
  --resource-group linkedin-mcp-rg \
  --query scmUri \
  --output tsv)

# Add the remote repository
git remote add azure $deployment_url

# Push to deploy
git push azure main
```

### Method 3: Deploy Using the Azure Portal

1. Build and package your application:

```bash
npm install
npm run build
zip -r mcp-app.zip .
```

2. In the Azure Portal:
   - Navigate to your App Service
   - Select "Deployment Center"
   - Choose "Manual Deployment"
   - Upload your zip file

## Monitoring and Management

### Application Insights Setup

Set up Application Insights for monitoring:

```bash
az monitor app-insights component create \
  --app linkedin-mcp-insights \
  --location eastus \
  --resource-group linkedin-mcp-rg

# Get the instrumentation key
instrumentation_key=$(az monitor app-insights component show \
  --app linkedin-mcp-insights \
  --resource-group linkedin-mcp-rg \
  --query instrumentationKey \
  --output tsv)

# Update App Service configuration
az webapp config appsettings set \
  --resource-group linkedin-mcp-rg \
  --name linkedin-mcp \
  --settings APPINSIGHTS_INSTRUMENTATIONKEY=$instrumentation_key
```

### Custom Domain Configuration (Optional)

1. Purchase a domain through Azure or use an external domain
2. Add DNS records as required
3. Configure SSL certificate:

```bash
az webapp config hostname add \
  --webapp-name linkedin-mcp \
  --resource-group linkedin-mcp-rg \
  --hostname your-domain.com

# Add SSL certificate
az webapp config ssl bind \
  --certificate-thumbprint <thumbprint> \
  --ssl-type SNI \
  --name linkedin-mcp \
  --resource-group linkedin-mcp-rg
```

## Scaling and Performance

Scale your App Service plan as needed:

```bash
# Scale up (increase tier)
az appservice plan update \
  --name linkedin-mcp-plan \
  --resource-group linkedin-mcp-rg \
  --sku S1

# Scale out (increase instance count)
az appservice plan update \
  --name linkedin-mcp-plan \
  --resource-group linkedin-mcp-rg \
  --number-of-workers 3
```

## Troubleshooting

### Common Issues

**Deployment Failures**:
Check the deployment logs in the Azure Portal under "App Service > Deployment Center > Logs".

**Application Errors**:
Review logs via "App Service > Log stream" or download logs via "App Service > Advanced Tools (Kudu)".

## Additional Resources

- [Azure App Service Documentation](https://docs.microsoft.com/en-us/azure/app-service/)
- [Node.js on Azure Documentation](https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs)
- [Azure Monitor Documentation](https://docs.microsoft.com/en-us/azure/azure-monitor/)