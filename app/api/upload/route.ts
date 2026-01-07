import { NextRequest, NextResponse } from 'next/server';
import { validateFile, saveFile, deleteFileById } from '@/services/fileService';
import { handleApiError } from '@/lib/utils';
import { FileUploadResponse } from '@/types/file';

/**
 * POST /api/upload
 * Handles CSV file uploads with validation
 */
export async function POST(request: NextRequest): Promise<NextResponse<FileUploadResponse>> {
  try {
    // Get form data from request
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const previousFileId = formData.get('previousFileId') as string | null;

    // Validate file exists
    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: 'No file provided',
        },
        { status: 400 }
      );
    }

    // Validate file type and size
    const validationErrors = validateFile(file);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: validationErrors.map(e => e.message).join(', '),
        },
        { status: 400 }
      );
    }

    // Delete previous file if it exists (cleanup)
    if (previousFileId) {
      await deleteFileById(previousFileId);
    }

    // Save new file
    const uploadedFile = await saveFile(file);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        file: uploadedFile,
      },
      { status: 201 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status }
    );
  }
}

/**
 * GET /api/upload
 * Returns upload configuration (max size, allowed types)
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    maxFileSize: process.env.MAX_FILE_SIZE || 10485760,
    allowedTypes: (process.env.ALLOWED_FILE_TYPES || 'text/csv,application/vnd.ms-excel').split(','),
  });
}

/**
 * DELETE /api/upload
 * Deletes a file by its ID
 */
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('fileId');

    if (!fileId) {
      return NextResponse.json(
        {
          success: false,
          error: 'File ID is required',
        },
        { status: 400 }
      );
    }

    await deleteFileById(fileId);

    return NextResponse.json(
      {
        success: true,
        message: 'File deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status }
    );
  }
}
