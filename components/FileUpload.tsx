'use client';

import { useState, useCallback } from 'react';
import { UploadedFile } from '@/types/file';
import { formatFileSize } from '@/lib/utils';

interface FileUploadProps {
  onFileUploaded: (file: UploadedFile) => void;
  onError: (error: string) => void;
}

export default function FileUpload({ onFileUploaded, onError }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        await uploadFile(files[0]);
      }
    },
    []
  );

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
    <div className="w-full">
      {!uploadedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:border-gray-400'}
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input
            type="file"
            id="file-upload"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center space-y-2">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div>
                <p className="text-lg font-medium text-gray-700">
                  {isUploading ? 'Uploading...' : 'Drop your CSV file here'}
                </p>
                <p className="text-sm text-gray-500">or click to browse</p>
              </div>
              <p className="text-xs text-gray-400">Maximum file size: 10MB</p>
            </div>
          </label>
        </div>
      ) : (
        <div className="border border-green-200 bg-green-50 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <svg
                className="w-6 h-6 text-green-600 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="font-medium text-green-900">{uploadedFile.originalName}</p>
                <p className="text-sm text-green-700">
                  {formatFileSize(uploadedFile.size)} • Uploaded successfully
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setUploadedFile(null);
              }}
              className="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
