// File types for upload and storage
export interface UploadedFile {
  id: string;
  originalName: string;
  storedName: string;
  size: number;
  mimeType: string;
  uploadedAt: Date;
  path: string;
}

export interface FileUploadResponse {
  success: boolean;
  file?: UploadedFile;
  error?: string;
}

export interface FileValidationError {
  field: string;
  message: string;
}
