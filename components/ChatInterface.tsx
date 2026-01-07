'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/message';
import { UploadedFile } from '@/types/file';
import MessageList from './MessageList';
import QuestionInput from './QuestionInput';
import FileUpload from './FileUpload';
import { v4 as uuidv4 } from 'uuid';

interface ChatInterfaceProps {
  uploadedFile: UploadedFile | null;
  onFileUploaded: (file: UploadedFile) => void;
  onError: (error: string) => void;
}

export default function ChatInterface({ uploadedFile, onFileUploaded, onError }: ChatInterfaceProps) {
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
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded mb-3 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto mb-3 p-4 bg-gray-50 rounded border border-gray-200 min-h-[400px] max-h-[500px]">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-start gap-2">
        <div className="flex-shrink-0">
          <FileUpload onFileUploaded={onFileUploaded} onError={onError} />
        </div>
        <div className="flex-1">
          <QuestionInput
            onSubmit={handleSendMessage}
            disabled={!uploadedFile}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
