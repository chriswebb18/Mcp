import "@typespec/rest";
import "../models/job.tsp";
import "../models/common.tsp";

using TypeSpec.Rest;
using TypeSpec.Http;

namespace LinkedInMcp.API {
  @route("/jobs")
  namespace Jobs {
    @get
    @summary("Search for jobs")
    op searchJobs(...Models.PaginationParams, ...Models.JobSearchFilters): Models.PaginatedResponse<Models.JobSummary> | Models.Error;

    @get("/{id}")
    @summary("Get job details")
    op getJobById(@path id: string): Models.Job | Models.Error;

    @get("/recommendations")
    @summary("Get personalized job recommendations")
    op getJobRecommendations(...Models.PaginationParams): Models.PaginatedResponse<Models.JobSummary> | Models.Error;

    @post("/{id}/apply")
    @summary("Apply to a job")
    op applyToJob(@path id: string, @body application: Models.JobApplicationRequest): Models.JobApplicationResponse | Models.Error;

    @get("/applications")
    @summary("Get job applications")
    op getJobApplications(...Models.PaginationParams): Models.PaginatedResponse<Models.JobApplicationResponse> | Models.Error;

    @get("/saved")
    @summary("Get saved jobs")
    op getSavedJobs(...Models.PaginationParams): Models.PaginatedResponse<Models.JobSummary> | Models.Error;

    @post("/{id}/save")
    @summary("Save a job")
    op saveJob(@path id: string): boolean | Models.Error;

    @delete("/{id}/save")
    @summary("Unsave a job")
    op unsaveJob(@path id: string): boolean | Models.Error;
  }
}