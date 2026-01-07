'use client';

import { useState, FormEvent } from 'react';

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function QuestionInput({ onSubmit, disabled = false, isLoading = false }: QuestionInputProps) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (question.trim() && !disabled && !isLoading) {
      onSubmit(question.trim());
      setQuestion('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex space-x-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={disabled ? 'Please upload a CSV file first' : 'Ask a question about your data...'}
          disabled={disabled || isLoading}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={disabled || isLoading || !question.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <svg
                className="animate-spin h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Thinking...</span>
            </div>
          ) : (
            'Send'
          )}
        </button>
      </div>
    </form>
  );
}
