namespace LinkedInMcp.Models {
  model ProfileSummary {
    id: string;
    firstName: string;
    lastName: string;
    headline?: string;
    profilePictureUrl?: string;
  }

  model Position {
    title: string;
    companyName: string;
    startDate: string;
    endDate?: string;
    description?: string;
    location?: string;
  }

  model Education {
    schoolName: string;
    degree?: string;
    fieldOfStudy?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }

  model Skill {
    name: string;
    endorsementCount?: int32;
  }

  model Profile {
    ...ProfileSummary;
    summary?: string;
    positions?: Position[];
    education?: Education[];
    skills?: Skill[];
    connectionCount?: int32;
    backgroundImageUrl?: string;
    publicProfileUrl?: string;
  }

  model ProfileUpdateRequest {
    headline?: string;
    summary?: string;
  }
}