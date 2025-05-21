import "@typespec/rest";
import "../models/company.tsp";
import "../models/common.tsp";

using TypeSpec.Rest;
using TypeSpec.Http;

namespace LinkedInMcp.API {
  @route("/companies")
  namespace Companies {
    @get
    @summary("Search for companies")
    op searchCompanies(...Models.PaginationParams, ...Models.CompanySearchFilters): Models.PaginatedResponse<Models.CompanySummary> | Models.Error;

    @get("/{id}")
    @summary("Get company details")
    op getCompanyById(@path id: string): Models.Company | Models.Error;

    @get("/{id}/updates")
    @summary("Get company updates")
    op getCompanyUpdates(@path id: string, ...Models.PaginationParams): Models.PaginatedResponse<Models.CompanyUpdate> | Models.Error;

    @get("/following")
    @summary("Get companies the current user is following")
    op getFollowingCompanies(...Models.PaginationParams): Models.PaginatedResponse<Models.CompanySummary> | Models.Error;

    @post("/{id}/follow")
    @summary("Follow a company")
    op followCompany(@path id: string): boolean | Models.Error;

    @delete("/{id}/follow")
    @summary("Unfollow a company")
    op unfollowCompany(@path id: string): boolean | Models.Error;
  }
}