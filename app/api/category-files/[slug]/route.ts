import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/token';
import { uploadFile } from '@/utils/fileUpload';
import prisma from '@/lib/db';
import { FILE_TYPE } from '@prisma/client';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params as unknown as { slug: string };
    const formData = await req.formData();
    const data = formData.getAll('files') as File[];
    const url = formData.get('url') as string;
    const fileName = formData.get('fileName') as string;

    const authorization = req.headers.get('authorization');
    const token = authorization?.split(' ')[1];
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Phiên làm việc đã hết hạn, vui lòng đăng nhập lại."
      }, { status: 401 });
    }
    const user = await verifyToken(token)
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Phiên làm việc đã hết hạn, vui lòng đăng nhập lại."
      }, { status: 401 });
    }
    if (user.user_role !== 'ADMIN') {
      return NextResponse.json({
        success: false,
        message: "Bạn không có quyền"
      }, { status: 403 });
    }

    const fileNames = await uploadFile(data);

    const dataFiles = () => {
      return fileNames.map(filename => ({
        url: filename.filename,
        type: filename.type as FILE_TYPE,
        fileCategorySlug: slug,
        fileName: filename.fileName,
        authorId: Number(user.user_id)
      }))
    }

    if (dataFiles().length > 0) {
      await prisma.files.createMany({ data: dataFiles() })
    }
    if(url && dataFiles().length === 0) {
      await prisma.files.create({
        data: {
          url,
          fileName,
          type: 'other',
          fileCategorySlug: slug,
          authorId: Number(user.user_id)
        }
      })
    }
    return NextResponse.json({
      success: true,
      message: "Tạo data thành công",
    }, { status: 200 });

  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({
        success: false,
        message: "Server error, please try again.",
        error: err.message,
      }, { status: 500 });
    }
  }
}
