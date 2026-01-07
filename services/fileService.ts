import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile, FileValidationError } from '@/types/file';

// File size limit (10MB)
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || '10485760');

// Allowed MIME types for CSV files
const ALLOWED_MIME_TYPES = (process.env.ALLOWED_FILE_TYPES || 'text/csv,application/vnd.ms-excel').split(',');

// Uploads directory path
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

/**
 * Validates file type and size
 */
export function validateFile(file: File): FileValidationError[] {
  const errors: FileValidationError[] = [];

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    errors.push({
      field: 'size',
      message: `File size exceeds maximum limit of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    });
  }

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    errors.push({
      field: 'type',
      message: 'Only CSV files are allowed',
    });
  }

  // Check file extension
  const extension = path.extname(file.name).toLowerCase();
  if (extension !== '.csv') {
    errors.push({
      field: 'extension',
      message: 'File must have .csv extension',
    });
  }

  return errors;
}

/**
 * Sanitizes filename to prevent path traversal attacks
 */
export function sanitizeFilename(filename: string): string {
  // Remove any path components
  const basename = path.basename(filename);

  // Remove any non-alphanumeric characters except dots, hyphens, and underscores
  return basename.replace(/[^a-zA-Z0-9._-]/g, '_');
}

/**
 * Ensures the uploads directory exists
 */
export async function ensureUploadsDir(): Promise<void> {
  try {
    await fs.access(UPLOADS_DIR);
  } catch {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
  }
}

/**
 * Saves an uploaded file to the uploads directory
 */
export async function saveFile(file: File): Promise<UploadedFile> {
  // Ensure uploads directory exists
  await ensureUploadsDir();

  // Generate unique filename
  const fileId = uuidv4();
  const sanitized = sanitizeFilename(file.name);
  const extension = path.extname(sanitized);
  const storedName = `${fileId}${extension}`;
  const filePath = path.join(UPLOADS_DIR, storedName);

  // Convert file to buffer and save
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  // Return file metadata
  return {
    id: fileId,
    originalName: file.name,
    storedName,
    size: file.size,
    mimeType: file.type,
    uploadedAt: new Date(),
    path: filePath,
  };
}

/**
 * Deletes a file by its stored name
 */
export async function deleteFile(storedName: string): Promise<void> {
  const filePath = path.join(UPLOADS_DIR, storedName);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error(`Failed to delete file ${storedName}:`, error);
    throw new Error('Failed to delete file');
  }
}

/**
 * Deletes a file by its UUID (finds the file with that UUID prefix)
 */
export async function deleteFileById(fileId: string): Promise<void> {
  await ensureUploadsDir();

  try {
    const files = await fs.readdir(UPLOADS_DIR);
    const fileToDelete = files.find(file => file.startsWith(fileId));

    if (fileToDelete) {
      const filePath = path.join(UPLOADS_DIR, fileToDelete);
      await fs.unlink(filePath);
    }
  } catch (error) {
    console.error(`Failed to delete file with ID ${fileId}:`, error);
    // Don't throw error - file might already be deleted
  }
}

/**
 * Cleans up old files (older than specified hours)
 */
export async function cleanupOldFiles(hoursOld: number = 24): Promise<number> {
  await ensureUploadsDir();

  const files = await fs.readdir(UPLOADS_DIR);
  const now = Date.now();
  const cutoffTime = now - (hoursOld * 60 * 60 * 1000);
  let deletedCount = 0;

  for (const file of files) {
    const filePath = path.join(UPLOADS_DIR, file);
    const stats = await fs.stat(filePath);

    if (stats.mtimeMs < cutoffTime) {
      try {
        await fs.unlink(filePath);
        deletedCount++;
      } catch (error) {
        console.error(`Failed to delete old file ${file}:`, error);
      }
    }
  }

  return deletedCount;
}

/**
 * Gets file path by ID
 */
export function getFilePath(fileId: string, extension: string = '.csv'): string {
  return path.join(UPLOADS_DIR, `${fileId}${extension}`);
}
