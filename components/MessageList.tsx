'use client';

import { Message } from '@/types/message';
import { formatDate } from '@/lib/utils';

interface MessageListProps {
  messages: Message[];
}

type ContentPart =
  | { type: 'text'; content: string }
  | { type: 'code'; content: string; language: string };

// Helper to format code blocks and regular text
function formatContent(content: string): ContentPart[] {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const parts: ContentPart[] = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: content.slice(lastIndex, match.index) });
    }
    // Add code block
    parts.push({ type: 'code', content: match[2], language: match[1] || 'text' });
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({ type: 'text', content: content.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ type: 'text', content }];
}

export default function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-8 text-gray-400">
        <svg className="w-12 h-12 mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p className="text-sm font-medium">No messages yet</p>
        <p className="text-xs text-gray-400 mt-1">Upload CSV and ask a question</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`flex items-start gap-2 max-w-[85%]`}>
            {message.role === 'assistant' && (
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <div
              className={`rounded-lg p-3 text-sm ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}
            >
              <div className="flex-1">
                {formatContent(message.content).map((part, idx) => (
                  <div key={idx}>
                    {part.type === 'text' ? (
                      <p className="whitespace-pre-wrap break-words leading-relaxed">{part.content}</p>
                    ) : (
                      <div className="my-2 rounded overflow-hidden border border-gray-300">
                        <div className="bg-gray-800 px-3 py-1.5 flex items-center justify-between">
                          <span className="text-xs font-mono text-gray-300">{part.language}</span>
                          <button
                            onClick={() => navigator.clipboard.writeText(part.content)}
                            className="text-xs text-gray-400 hover:text-white"
                          >
                            Copy
                          </button>
                        </div>
                        <pre className="bg-gray-900 p-3 overflow-x-auto">
                          <code className="text-xs font-mono text-gray-100">{part.content}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
                <p
                  className={`text-xs mt-1.5 flex items-center gap-1 ${
                    message.role === 'user' ? 'text-blue-200' : 'text-gray-400'
                  }`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{formatDate(message.timestamp)}</span>
                </p>
              </div>
            </div>
            {message.role === 'user' && (
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
