import "@typespec/rest";
import "../models/profile.tsp";
import "../models/common.tsp";

using TypeSpec.Rest;
using TypeSpec.Http;

namespace LinkedInMcp.API {
  @route("/profiles")
  namespace Profiles {
    @get
    @summary("Get the current user's profile")
    op getCurrentProfile(): Models.Profile | Models.Error;

    @get("/{id}")
    @summary("Get a profile by ID")
    op getProfileById(@path id: string): Models.Profile | Models.Error;

    @patch
    @summary("Update the current user's profile")
    op updateCurrentProfile(@body request: Models.ProfileUpdateRequest): Models.Profile | Models.Error;

    @get("/connections")
    @summary("Get the current user's connections")
    op getConnections(...Models.PaginationParams): Models.PaginatedResponse<Models.ProfileSummary> | Models.Error;

    @get("/{id}/positions")
    @summary("Get positions for a profile")
    op getProfilePositions(@path id: string): Models.Position[] | Models.Error;

    @get("/{id}/education")
    @summary("Get education entries for a profile")
    op getProfileEducation(@path id: string): Models.Education[] | Models.Error;

    @get("/{id}/skills")
    @summary("Get skills for a profile")
    op getProfileSkills(@path id: string): Models.Skill[] | Models.Error;
  }
}