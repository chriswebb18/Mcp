import "@typespec/rest";
import "./models/common.tsp";
import "./models/profile.tsp";
import "./models/job.tsp";
import "./models/company.tsp";
import "./models/resume.tsp";
import "./operations/profile.tsp";
import "./operations/job.tsp";
import "./operations/company.tsp";
import "./operations/resume.tsp";
import "./mcp/mcp.tsp";

using TypeSpec.Rest;

@service({
  title: "LinkedIn MCP API",
  version: "1.0.0",
  description: "LinkedIn Model Context Protocol API for interacting with LinkedIn's professional networking services"
})
namespace LinkedInMcp {
  @server("https://localhost:3000", "LinkedIn MCP Server")
  @route("/api/v1")
  namespace API {}
}