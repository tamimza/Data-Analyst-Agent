'use client';

import { useState, useCallback } from 'react';
import { UploadedFile } from '@/types/file';
import { formatFileSize } from '@/lib/utils';

interface FileUploadProps {
  onFileUploaded: (file: UploadedFile) => void;
  onError: (error: string) => void;
}

export default function FileUpload({ onFileUploaded, onError }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await uploadFile(files[0]);
    }
  }, []);

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setUploadedFile(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.file) {
        setUploadedFile(data.file);
        onFileUploaded(data.file);
      } else {
        onError(data.error || 'Failed to upload file');
      }
    } catch (error) {
      onError('An error occurred while uploading the file');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      {!uploadedFile ? (
        <div>
          <input
            type="file"
            id="file-upload"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
          <label
            htmlFor="file-upload"
            className={`
              flex items-center justify-center w-12 h-12 rounded-lg cursor-pointer
              transition-all border-2
              ${isUploading
                ? 'bg-gray-100 border-gray-300 cursor-not-allowed'
                : 'bg-blue-50 border-blue-300 hover:bg-blue-100 hover:border-blue-400'
              }
            `}
          >
            {isUploading ? (
              <svg className="w-5 h-5 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
            ) : (
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            )}
          </label>
        </div>
      ) : (
        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-300 rounded-lg">
          <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-green-900 truncate">{uploadedFile.originalName}</p>
            <p className="text-xs text-green-600">{formatFileSize(uploadedFile.size)}</p>
          </div>
          <button
            onClick={() => setUploadedFile(null)}
            className="flex-shrink-0 text-red-600 hover:text-red-800"
            title="Remove file"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
