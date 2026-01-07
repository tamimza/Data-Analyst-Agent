'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/message';
import { UploadedFile } from '@/types/file';
import MessageList from './MessageList';
import QuestionInput from './QuestionInput';
import { v4 as uuidv4 } from 'uuid';

interface ChatInterfaceProps {
  uploadedFile: UploadedFile | null;
}

export default function ChatInterface({ uploadedFile }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (question: string) => {
    if (!uploadedFile) {
      setError('Please upload a file first');
      return;
    }

    setError(null);
    setIsLoading(true);

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: question,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: question,
          fileId: uploadedFile.id,
          conversationHistory: messages,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setIsLoading(false);
        return;
      }

      // Add assistant message
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-sm underline mt-1"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg min-h-[400px]">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </div>

      <div>
        <QuestionInput
          onSubmit={handleSendMessage}
          disabled={!uploadedFile}
          isLoading={isLoading}
        />
        {uploadedFile && messages.length === 0 && (
          <div className="mt-3 text-sm text-gray-600">
            <p className="font-medium mb-2">Try asking questions like:</p>
            <ul className="space-y-1 text-gray-500">
              <li>• What are the column names in this dataset?</li>
              <li>• How many rows are there?</li>
              <li>• What is the average value of [column name]?</li>
              <li>• Show me the top 5 rows</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
