namespace LinkedInMcp.Models {
  model JobSummary {
    id: string;
    title: string;
    companyName: string;
    location?: string;
    postedDate: string;
    applicationsCount?: int32;
    isEasyApply: boolean;
  }

  model JobSearchFilters {
    @query keywords?: string;
    @query location?: string;
    @query distance?: int32;
    @query jobType?: string;
    @query datePosted?: string;
    @query remoteFilter?: string;
    @query salary?: string;
    @query sortBy?: string;
  }

  model Job {
    ...JobSummary;
    description: string;
    jobFunction?: string[];
    industries?: string[];
    experienceLevel?: string;
    employmentType?: string;
    requiredSkills?: string[];
    preferredSkills?: string[];
    salary?: {
      range?: {
        min?: number;
        max?: number;
      };
      currency?: string;
      period?: string;
    };
    companyDetails?: {
      id: string;
      name: string;
      logoUrl?: string;
      companySize?: string;
      industry?: string;
      description?: string;
    };
    applicationUrl?: string;
  }

  model JobApplicationRequest {
    jobId: string;
    resumeId?: string;
    coverLetterId?: string;
    answers?: Record<string, string>;
  }

  model JobApplicationResponse {
    applicationId: string;
    jobId: string;
    status: string;
    appliedDate: string;
  }
}