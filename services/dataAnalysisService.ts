import { exec } from 'child_process';
import { promisify } from 'util';
import { CodeExecutionResponse } from '@/types/analysis';

const execAsync = promisify(exec);

// Docker container name from environment or default
const CONTAINER_NAME = process.env.DOCKER_CONTAINER_NAME || 'python-analysis-container';

/**
 * Sanitizes Python code to prevent malicious operations
 */
export function sanitizeCode(code: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check for dangerous imports/operations
  const dangerousPatterns = [
    /import\s+os/i,
    /from\s+os\s+import/i,
    /import\s+subprocess/i,
    /from\s+subprocess\s+import/i,
    /import\s+sys/i,
    /eval\s*\(/i,
    /exec\s*\(/i,
    /__import__/i,
    /open\s*\(/i,
    /\.write\s*\(/i,
    /\.remove\s*\(/i,
    /\.unlink\s*\(/i,
    /shutil/i,
    /pickle/i,
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(code)) {
      errors.push(`Potentially dangerous operation detected: ${pattern.source}`);
    }
  }

  // Check if code is trying to access files outside uploads
  if (/(?<!\/app\/uploads)\/[a-zA-Z]/i.test(code) && !/\/app\/uploads/.test(code)) {
    errors.push('Code should only access files in /app/uploads directory');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Executes Python code in the Docker container
 */
export async function executeCodeInDocker(
  code: string,
  filePath: string
): Promise<CodeExecutionResponse> {
  // Sanitize code first
  const sanitizationResult = sanitizeCode(code);
  if (!sanitizationResult.isValid) {
    return {
      stdout: '',
      stderr: `Code validation failed:\n${sanitizationResult.errors.join('\n')}`,
      exitCode: 1,
    };
  }

  // Escape code for shell execution
  const escapedCode = code.replace(/'/g, "'\\''");

  // Build docker exec command
  const dockerCommand = `docker exec ${CONTAINER_NAME} python3 -c '${escapedCode}'`;

  try {
    const { stdout, stderr } = await execAsync(dockerCommand, {
      timeout: 30000, // 30 second timeout
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
    });

    return {
      stdout: stdout.trim(),
      stderr: stderr.trim(),
      exitCode: 0,
    };
  } catch (error: any) {
    console.error('Docker execution error:', error);

    return {
      stdout: error.stdout?.trim() || '',
      stderr: error.stderr?.trim() || error.message,
      exitCode: error.code || 1,
    };
  }
}

/**
 * Checks if the Docker container is running
 */
export async function isDockerContainerRunning(): Promise<boolean> {
  try {
    const { stdout } = await execAsync(`docker ps --filter name=${CONTAINER_NAME} --format "{{.Names}}"`);
    return stdout.trim() === CONTAINER_NAME;
  } catch (error) {
    console.error('Error checking Docker container status:', error);
    return false;
  }
}

/**
 * Starts the Docker container if it's not running
 */
export async function ensureDockerContainerRunning(): Promise<void> {
  const isRunning = await isDockerContainerRunning();

  if (!isRunning) {
    console.log('Starting Docker container...');
    try {
      await execAsync('docker-compose up -d');
      // Wait a bit for container to fully start
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Failed to start Docker container:', error);
      throw new Error('Docker container is not running and could not be started');
    }
  }
}
