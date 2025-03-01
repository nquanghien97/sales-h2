import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> } // path là optional
) {
  const resolvedParams = await params;
  const pathSegments = resolvedParams.path || []; // Nếu không có path, trả về mảng rỗng

  // Tạo đường dẫn file từ các đoạn path
  const filePath = path.join(process.cwd(), 'files', ...pathSegments);

  if (fs.existsSync(filePath)) {
    const fileBuffer = await fs.promises.readFile(filePath);
    const fileExtension = path.extname(filePath).toLowerCase();

    const response = new NextResponse(fileBuffer);

    // Thiết lập Content-Type dựa trên phần mở rộng file
    switch (fileExtension) {
      case '.jpg':
      case '.jpeg':
        response.headers.set('Content-Type', 'image/jpeg');
        break;
      case '.png':
        response.headers.set('Content-Type', 'image/png');
        break;
      case '.mp4':
        response.headers.set('Content-Type', 'video/mp4');
        break;
      case '.webm':
        response.headers.set('Content-Type', 'video/webm');
        break;
      case '.mov':
        response.headers.set('Content-Type', 'video/quicktime');
        break;
      default:
        response.headers.set('Content-Type', 'application/octet-stream');
    }

    return response;
  } else {
    return new NextResponse('File not found', { status: 404 });
  }
}