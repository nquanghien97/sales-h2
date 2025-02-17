import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/token';
import { ImageCategory } from '@prisma/client';
import { uploadFile } from '@/utils/fileUpload';
import prisma from '@/lib/db';

const folderName: Record<ImageCategory, string> = {
  salesPolicy: 'sales-policy',
  products: 'products',
  productDocuments: 'product-documents',
  feedbacks: 'feedbacks',
}
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params as unknown as { category: ImageCategory };
    const formData = await req.formData();
    const data = formData.getAll(category) as File[];

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

    const fileNames = await uploadFile(data, folderName[category]);

    const dataFiles = () => {
      return fileNames.map(filename => ({
        url: filename.filename,
        type: filename.type,
        category,
        authorId: Number(user.user_id)
      }))
    }

    if (dataFiles().length > 0) {
      await prisma.files.createMany({ data: dataFiles() })
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
