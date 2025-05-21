import "@typespec/rest";
using TypeSpec.Rest;
using TypeSpec.Http;

namespace LinkedInMcp.MCP {
  @doc("Base response to a capability request")
  model CapabilityResponse {
    @doc("List of supported capabilities")
    capabilities: Capability[];
  }

  @doc("Capability definition")
  model Capability {
    @doc("Name of the capability")
    name: string;

    @doc("Version of the capability")
    version: string;

    @doc("Description of what the capability does")
    description: string;
  }

  @doc("MCP request context")
  model Context {
    @doc("Session ID for the current user")
    sessionId?: string;

    @doc("User-specific context")
    user?: {
      @doc("User ID")
      id?: string;

      @doc("User preferences")
      preferences?: Record<string, unknown>;
    };

    @doc("Context for the current task")
    task?: {
      @doc("Task description")
      description?: string;
      
      @doc("Task status")
      status?: string;
    };

    @doc("Additional context information")
    additional?: Record<string, unknown>;
  }

  @doc("MCP request")
  model MCPRequest {
    @doc("Request type")
    type: string;

    @doc("Request context")
    context?: Context;

    @doc("Request parameters")
    parameters?: Record<string, unknown>;
  }

  @doc("MCP response")
  model MCPResponse {
    @doc("Response type")
    type: string;

    @doc("Response data")
    data?: unknown;

    @doc("Response context")
    context?: Context;
  }

  @route("/mcp")
  namespace MCP {
    @get("/capabilities")
    @summary("Get supported capabilities")
    op getCapabilities(): CapabilityResponse;

    @post("/request")
    @summary("Make an MCP request")
    op makeRequest(@body request: MCPRequest): MCPResponse;
  }
}