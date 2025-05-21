import "@typespec/rest";
using TypeSpec.Rest;

namespace LinkedInMcp.Models {
  model Error {
    @statusCode statusCode: number;
    code: string;
    message: string;
    details?: string;
  }

  model PaginationParams {
    @query start?: int32 = 0;
    @query limit?: int32 = 20;
  }

  model PaginatedResponse<T> {
    items: T[];
    total: int32;
    next?: string;
  }

  model ResourceReference {
    id: string;
    resourceUrl: string;
  }
}