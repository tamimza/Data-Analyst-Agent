import Anthropic from '@anthropic-ai/sdk';
import { Message } from '@/types/message';
import { CodeExecutionResponse } from '@/types/analysis';
import { executeCodeInDocker } from './dataAnalysisService';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// System prompt for data analysis
const SYSTEM_PROMPT = `You are a data analysis assistant. You help users analyze CSV data files using Python and pandas.

When a user asks a question about their data:
1. Write Python code using pandas to answer the question
2. The CSV file path will be provided to you as /app/uploads/[filename]
3. Always use proper error handling in your code
4. Return clear, concise answers based on the code execution results
5. If you need to perform calculations, write Python code to do so
6. Always read the CSV file first to understand its structure

Important guidelines:
- Use pandas.read_csv() to load the data
- Handle potential errors (missing columns, data type issues, etc.)
- Keep code concise and focused on answering the specific question
- Print results clearly so they can be parsed
- Do not use visualizations or save files (only print results)

You have access to: pandas, numpy, matplotlib (for calculations only, no plotting)`;

/**
 * Sends a message to Claude and processes the response
 */
export async function sendMessageToClaude(
  userMessage: string,
  filePath: string,
  conversationHistory: Message[] = []
): Promise<string> {
  try {
    // Build messages array from conversation history
    const messages: Anthropic.MessageParam[] = conversationHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Add current user message
    messages.push({
      role: 'user',
      content: `The CSV file is located at: /app/uploads/${filePath}\n\nQuestion: ${userMessage}`,
    });

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages,
    });

    // Extract text content from response
    let responseText = '';
    let codeToExecute = '';

    for (const block of response.content) {
      if (block.type === 'text') {
        responseText += block.text;

        // Check if response contains Python code blocks
        const codeMatch = block.text.match(/```python\n([\s\S]*?)\n```/);
        if (codeMatch) {
          codeToExecute = codeMatch[1];
        }
      }
    }

    // If Claude wrote code, execute it
    if (codeToExecute) {
      try {
        const executionResult = await executeCodeInDocker(codeToExecute, filePath);

        // Send the execution result back to Claude for interpretation
        const followUpMessages = [...messages];
        followUpMessages.push({
          role: 'assistant',
          content: responseText,
        });
        followUpMessages.push({
          role: 'user',
          content: `The code was executed. Here are the results:\n\nStdout:\n${executionResult.stdout}\n\nStderr:\n${executionResult.stderr}\n\nPlease provide a clear answer to my question based on these results.`,
        });

        const finalResponse = await anthropic.messages.create({
          model: 'claude-sonnet-4-5-20250929',
          max_tokens: 2048,
          system: SYSTEM_PROMPT,
          messages: followUpMessages,
        });

        // Extract final answer
        let finalAnswer = '';
        for (const block of finalResponse.content) {
          if (block.type === 'text') {
            finalAnswer += block.text;
          }
        }

        return finalAnswer;
      } catch (execError) {
        console.error('Code execution error:', execError);
        return `I wrote some code to analyze your data, but encountered an error during execution: ${execError}. Please try rephrasing your question or check if the CSV file is properly formatted.`;
      }
    }

    return responseText;
  } catch (error) {
    console.error('Claude API error:', error);
    throw new Error('Failed to get response from Claude');
  }
}

/**
 * Generates a summary of the CSV file
 */
export async function generateDataSummary(filePath: string): Promise<string> {
  const summaryCode = `
import pandas as pd

try:
    df = pd.read_csv('/app/uploads/${filePath}')

    print("Dataset Overview:")
    print(f"- Rows: {len(df)}")
    print(f"- Columns: {len(df.columns)}")
    print(f"\\nColumn Names: {', '.join(df.columns.tolist())}")
    print(f"\\nData Types:")
    for col in df.columns:
        print(f"  - {col}: {df[col].dtype}")
    print(f"\\nFirst 3 rows:")
    print(df.head(3).to_string())
except Exception as e:
    print(f"Error: {str(e)}")
`;

  try {
    const result = await executeCodeInDocker(summaryCode, filePath);
    return result.stdout || 'Failed to generate summary';
  } catch (error) {
    console.error('Summary generation error:', error);
    return 'Failed to generate data summary';
  }
}
