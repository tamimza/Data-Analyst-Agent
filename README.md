# AI Data Analysis Agent

An intelligent web application that allows users to upload CSV files and ask questions about their data in natural language. Powered by Claude 3.5 Sonnet, the AI agent writes and executes Python code to analyze your data and provide insights.

## Features

- **File Upload**: Drag-and-drop interface for uploading CSV files
- **Natural Language Queries**: Ask questions in plain English
- **AI-Powered Analysis**: Claude 3.5 Sonnet generates and executes pandas code
- **Real-time Results**: Get instant answers to your data questions
- **Conversation History**: Follow-up questions maintain context
- **Secure Execution**: Python code runs in an isolated Docker container
- **Input Validation**: File type, size, and security checks

## Tech Stack

- **Frontend & Backend**: Next.js 15 (App Router) with TypeScript
- **AI**: Claude 3.5 Sonnet via Anthropic API
- **Data Processing**: Python 3.11 with pandas, numpy
- **Containerization**: Docker & Docker Compose
- **Styling**: Tailwind CSS

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ and npm
- **Docker** and Docker Compose
- **Anthropic API Key** (get one at [console.anthropic.com](https://console.anthropic.com))

## Installation

### 1. Clone and Install Dependencies

```bash
cd AI-Data-Analysis-Agent
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Anthropic API key:

```env
ANTHROPIC_API_KEY=your_actual_api_key_here
```

### 3. Build and Start Docker Container

Build the Python analysis container:

```bash
docker-compose up -d
```

Verify the container is running:

```bash
docker ps
```

You should see `python-analysis-container` in the list.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Step 1: Upload a CSV File

1. Click or drag-and-drop a CSV file (max 10MB)
2. Wait for the upload confirmation

### Step 2: Ask Questions

Type natural language questions about your data:

- "What are the column names?"
- "How many rows are in this dataset?"
- "What's the average value of the 'sales' column?"
- "Show me the top 5 products by revenue"
- "What's the correlation between age and income?"

The AI will:

1. Generate appropriate pandas code
2. Execute it safely in the Docker container
3. Return the results in natural language

## Project Structure

```
ai-data-agent/
├── app/
│   ├── api/
│   │   ├── upload/route.ts      # File upload endpoint
│   │   └── chat/route.ts        # Chat endpoint
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main page
│   └── globals.css              # Global styles
├── components/
│   ├── FileUpload.tsx           # File upload component
│   ├── ChatInterface.tsx        # Main chat container
│   ├── MessageList.tsx          # Message display
│   └── QuestionInput.tsx        # Input field
├── services/
│   ├── claudeService.ts         # Claude API integration
│   ├── fileService.ts           # File operations
│   └── dataAnalysisService.ts   # Docker execution
├── types/
│   ├── message.ts               # Message types
│   ├── file.ts                  # File types
│   └── analysis.ts              # Analysis types
├── lib/
│   └── utils.ts                 # Utility functions
├── docker/
│   ├── Dockerfile               # Python container
│   └── requirements.txt         # Python dependencies
├── uploads/                      # Uploaded files (auto-created)
└── docker-compose.yml           # Docker configuration
```

## API Endpoints

### POST /api/upload

Uploads a CSV file.

**Request:**

- Content-Type: `multipart/form-data`
- Body: File with key `file`

**Response:**

```json
{
  "success": true,
  "file": {
    "id": "uuid",
    "originalName": "data.csv",
    "storedName": "uuid.csv",
    "size": 1024,
    "mimeType": "text/csv",
    "uploadedAt": "2025-01-06T...",
    "path": "/path/to/file"
  }
}
```

### POST /api/chat

Sends a question to the AI agent.

**Request:**

```json
{
  "message": "What's the average price?",
  "fileId": "uuid",
  "conversationHistory": []
}
```

**Response:**

```json
{
  "message": "The average price is $45.32"
}
```

## Environment Variables

| Variable                | Description                  | Default                           |
| ----------------------- | ---------------------------- | --------------------------------- |
| `ANTHROPIC_API_KEY`     | Your Anthropic API key       | Required                          |
| `MAX_FILE_SIZE`         | Maximum upload size in bytes | 10485760 (10MB)                   |
| `ALLOWED_FILE_TYPES`    | Comma-separated MIME types   | text/csv,application/vnd.ms-excel |
| `DOCKER_CONTAINER_NAME` | Name of Python container     | python-analysis-container         |
| `DOCKER_NETWORK`        | Docker network name          | ai-data-agent-network             |

## Security Features

- **File Validation**: Only CSV files up to 10MB
- **Filename Sanitization**: Prevents path traversal attacks
- **Code Sanitization**: Blocks dangerous Python operations
- **Docker Isolation**: Python code runs in isolated container
- **API Key Protection**: Never exposed to frontend
- **Volume Mounting**: Only uploads directory accessible

## Troubleshooting

### Docker container not running

```bash
# Check container status
docker ps

# View logs
docker-compose logs

# Restart container
docker-compose restart
```

### Port already in use

Change the Next.js port:

```bash
npm run dev -- -p 3001
```

### File upload fails

- Check file size (max 10MB)
- Verify file extension is `.csv`
- Ensure uploads directory has write permissions

### Claude API errors

- Verify API key in `.env.local`
- Check API key permissions at console.anthropic.com
- Review API rate limits

## Development

### Build for Production

```bash
npm run build
npm start
```

### Type Checking

```bash
npx tsc --noEmit
```

### Linting

```bash
npm run lint
```

## Limitations

- CSV files only (max 10MB)
- No data visualization (only text results)
- Single file per session
- Files cleaned up after 24 hours

## Future Enhancements

- [ ] Support for Excel and JSON files
- [ ] Data visualization charts
- [ ] Multiple file uploads
- [ ] Export results to PDF
- [ ] Chat history persistence
- [ ] Streaming responses
- [ ] Rate limiting
- [ ] User authentication

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

For issues and questions:

- Create an issue on GitHub
- Check the troubleshooting guide above
