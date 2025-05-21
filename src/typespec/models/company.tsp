namespace LinkedInMcp.Models {
  model CompanySummary {
    id: string;
    name: string;
    logoUrl?: string;
    industry?: string;
  }

  model CompanySearchFilters {
    @query keywords?: string;
    @query industry?: string;
    @query companySize?: string;
    @query location?: string;
    @query sortBy?: string;
  }

  model Company {
    ...CompanySummary;
    description?: string;
    website?: string;
    employeeCount?: int32;
    specialties?: string[];
    locations?: {
      country: string;
      city: string;
      address?: string;
      postalCode?: string;
      headquarters?: boolean;
    }[];
    founded?: string;
    companyType?: string;
    tagline?: string;
    followers?: int32;
    stockSymbol?: string;
    publicProfileUrl?: string;
  }

  model CompanyUpdate {
    id: string;
    author?: ProfileSummary;
    content: string;
    media?: {
      type: string;
      url: string;
    }[];
    publishedDate: string;
    likes?: int32;
    comments?: int32;
  }
}