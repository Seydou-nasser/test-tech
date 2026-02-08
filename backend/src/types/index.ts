export interface Analysis {
  id: string;
  text: string;
  score: number;
  createdAt: Date;
}

export interface AnalyzeRequest {
  text: string;
}

export interface AnalyzeResponse {
  score: number;
  status: string;
}

export interface AnalysisResult {
  score: number;
  details: {
    baseScore: number;
    lengthBonus: number;
    forbiddenWordsPenalty: number;
    forbiddenWordsFound: string[];
  };
}
