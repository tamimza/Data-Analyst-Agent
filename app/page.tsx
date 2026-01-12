"use client";

import { useState } from "react";
import Link from "next/link";
import ChatInterface from "@/components/ChatInterface";
import { UploadedFile } from "@/types/file";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUploaded = (file: UploadedFile) => {
    setUploadedFile(file);
    setError(null);
  };

  const handleFileRemoved = async () => {
    // Delete file from server if it exists
    if (uploadedFile) {
      try {
        await fetch(`/api/upload?fileId=${uploadedFile.id}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error('Failed to delete file:', error);
        // Don't show error to user - just log it
      }
    }

    setUploadedFile(null);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Compact Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-4 mb-1">
            <h1 className="text-3xl font-bold text-gray-900">
              AI Data Analysis
            </h1>
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Docs
            </Link>
          </div>
          <p className="text-sm text-gray-600">Upload CSV and ask questions</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">
            <div className="flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Main Chat Area */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
          <ChatInterface
            uploadedFile={uploadedFile}
            onFileUploaded={handleFileUploaded}
            onFileRemoved={handleFileRemoved}
            onError={handleError}
          />
        </div>

        {/* Footer */}
        <footer className="text-center mt-4 text-xs text-gray-500">
          Next - Python - Sonnet 4.5
        </footer>
      </div>
    </main>
  );
}
