# LinkedIn MCP TypeSpec Definitions

This directory contains TypeSpec definitions for the LinkedIn MCP (Model Context Protocol) API.

## Directory Structure

- `main.tsp` - Main entry point for TypeSpec compilation
- `models/` - Directory containing TypeSpec models for LinkedIn entities
  - `common.tsp` - Common models used across the API
  - `profile.tsp` - Models related to LinkedIn profiles
  - `job.tsp` - Models related to jobs and job applications
  - `company.tsp` - Models related to companies and organizations
  - `resume.tsp` - Models related to resume management
- `operations/` - Directory containing TypeSpec operation definitions
  - `profile.tsp` - Profile-related API operations
  - `job.tsp` - Job and job application operations
  - `company.tsp` - Company-related operations
  - `resume.tsp` - Resume management operations
- `mcp/` - Directory containing core MCP protocol definitions
  - `mcp.tsp` - Core Model Context Protocol definitions

## Working with TypeSpec

### Compiling TypeSpec to OpenAPI

To compile TypeSpec to OpenAPI specifications, run:

```bash
npm run build:typespec
```

This will generate OpenAPI specifications in the `openapi/` directory.

### Extending the API

To extend the API, add new models or operations:

1. Create or modify model files in the `models/` directory
2. Create or modify operation files in the `operations/` directory
3. Update imports in `main.tsp` if you added new files
4. Compile TypeSpec to generate updated specifications

## TypeSpec Resources

- [TypeSpec Documentation](https://microsoft.github.io/typespec/)
- [Model Context Protocol](https://modelcontextprotocol.io/introduction)
- [TypeSpec REST Library](https://microsoft.github.io/typespec/standard-libraries/rest/reference)