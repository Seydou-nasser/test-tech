export interface Analysis {
  id: string;
  text: string;
  score: number;
  createdAt: string;
}

export interface AnalyzeRequest {
  text: string;
}

export interface AnalyzeResponse {
  score: number;
  status: string;
}

export interface HistoryResponse {
  data: Analysis[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface ErrorResponse {
  status: string;
  message: string;
  errors?: Array<{
    path: string;
    message: string;
  }>;
}
