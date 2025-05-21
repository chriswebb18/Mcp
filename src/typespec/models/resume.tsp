namespace LinkedInMcp.Models {
  model ResumeSummary {
    id: string;
    name: string;
    createdDate: string;
    lastUpdatedDate: string;
    fileType: string;
  }

  model Resume {
    ...ResumeSummary;
    downloadUrl: string;
    previewUrl?: string;
    isDefault?: boolean;
    isShared?: boolean;
  }

  model ResumeUploadRequest {
    name: string;
    fileContent: bytes;
    fileType: string;
    isDefault?: boolean;
  }

  model ResumeUploadResponse {
    id: string;
    name: string;
    uploadedDate: string;
    fileType: string;
    isDefault: boolean;
  }

  model ResumeUpdateRequest {
    name?: string;
    isDefault?: boolean;
    isShared?: boolean;
  }
}