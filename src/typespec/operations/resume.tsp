import "@typespec/rest";
import "../models/resume.tsp";
import "../models/common.tsp";

using TypeSpec.Rest;
using TypeSpec.Http;

namespace LinkedInMcp.API {
  @route("/resumes")
  namespace Resumes {
    @get
    @summary("Get all resumes")
    op getResumes(...Models.PaginationParams): Models.PaginatedResponse<Models.ResumeSummary> | Models.Error;

    @get("/{id}")
    @summary("Get resume details")
    op getResumeById(@path id: string): Models.Resume | Models.Error;

    @post
    @summary("Upload a new resume")
    op uploadResume(@body request: Models.ResumeUploadRequest): Models.ResumeUploadResponse | Models.Error;

    @patch("/{id}")
    @summary("Update resume details")
    op updateResume(@path id: string, @body request: Models.ResumeUpdateRequest): Models.Resume | Models.Error;

    @delete("/{id}")
    @summary("Delete a resume")
    op deleteResume(@path id: string): void | Models.Error;

    @get("/{id}/download")
    @summary("Download resume file")
    op downloadResume(@path id: string): bytes | Models.Error;
  }
}