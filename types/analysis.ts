// Data analysis result types
export interface AnalysisResult {
  success: boolean;
  result?: string;
  error?: string;
  code?: string;
  executionTime?: number;
}

export interface CodeExecutionRequest {
  code: string;
  filePath: string;
}

export interface CodeExecutionResponse {
  stdout: string;
  stderr: string;
  exitCode: number;
}
