// Message types for chat interface
export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  fileId?: string;
  conversationHistory?: Message[];
}

export interface ChatResponse {
  message: string;
  error?: string;
}
