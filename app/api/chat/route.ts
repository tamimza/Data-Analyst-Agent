import { NextRequest, NextResponse } from 'next/server';
import { sendMessageToClaude } from '@/services/claudeService';
import { ensureDockerContainerRunning } from '@/services/dataAnalysisService';
import { handleApiError } from '@/lib/utils';
import { ChatRequest, ChatResponse } from '@/types/message';

/**
 * POST /api/chat
 * Handles chat messages and returns AI responses
 */
export async function POST(request: NextRequest): Promise<NextResponse<ChatResponse>> {
  try {
    // Validate API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        {
          message: '',
          error: 'Anthropic API key is not configured',
        },
        { status: 500 }
      );
    }

    // Parse request body
    const body: ChatRequest = await request.json();
    const { message, fileId, conversationHistory = [] } = body;

    // Validate message
    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        {
          message: '',
          error: 'Message is required',
        },
        { status: 400 }
      );
    }

    // Validate file ID
    if (!fileId) {
      return NextResponse.json(
        {
          message: '',
          error: 'File ID is required. Please upload a CSV file first.',
        },
        { status: 400 }
      );
    }

    // Ensure Docker container is running
    try {
      await ensureDockerContainerRunning();
    } catch (dockerError) {
      return NextResponse.json(
        {
          message: '',
          error: 'Docker container is not available. Please ensure Docker is running and the container is started.',
        },
        { status: 503 }
      );
    }

    // Get response from Claude
    const filePath = `${fileId}.csv`;
    const response = await sendMessageToClaude(
      message,
      filePath,
      conversationHistory
    );

    // Return success response
    return NextResponse.json(
      {
        message: response,
      },
      { status: 200 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);

    return NextResponse.json(
      {
        message: '',
        error: message,
      },
      { status }
    );
  }
}

/**
 * GET /api/chat
 * Health check endpoint
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: 'ok',
    message: 'Chat API is running',
  });
}
