# Local Deployment Guide

This guide covers how to deploy the LinkedIn MCP server locally for development and testing.

## Prerequisites

Before deploying the LinkedIn MCP server locally, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started) (version 20.10.0 or later)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0.0 or later)
- [Node.js](https://nodejs.org/) (version 16 or later)
- [Git](https://git-scm.com/)

## Setup Steps

### 1. Clone the Repository

```bash
git clone https://github.com/chriswebb18/Mcp.git
cd Mcp
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit the `.env` file with your LinkedIn API credentials:

```
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
PORT=3000
NODE_ENV=development
```

### 3. Build and Run with Docker

Build and start the containers:

```bash
docker-compose up -d
```

This will:
- Build the Docker image for the MCP server
- Start the container
- Expose the API on port 3000 (or your configured PORT)

### 4. Verify Deployment

Once the container is running, you can verify the deployment:

```bash
# Check container status
docker ps

# View logs
docker logs mcp-server

# Test the API
curl http://localhost:3000/health
```

The API should return a status code 200 with a health check response.

### 5. Development Mode

For active development, you may want to run the server with live reloading:

```bash
# Stop the Docker container if running
docker-compose down

# Install dependencies
npm install

# Run in development mode
npm run dev
```

## Stopping the Deployment

To stop the local deployment:

```bash
docker-compose down
```

## Troubleshooting

### Common Issues

**Port Conflicts**:
If port 3000 is already in use, update the PORT variable in your .env file and the corresponding port mapping in docker-compose.yml.

**Connection Issues**:
If the LinkedIn API connection fails, verify your LinkedIn API credentials are correct in the .env file.

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [LinkedIn API Documentation](https://learn.microsoft.com/en-us/linkedin/)