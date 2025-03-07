import { FileCategoriesEntity } from "@/entities/file-categories";
import prisma from "@/lib/db";
import { verifyToken } from "@/lib/token";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { categories } = await req.json()

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
    
    await prisma.$transaction(
      categories.map((item: FileCategoriesEntity, index: number) => prisma.file_categories.update({
        where: { id: item.id },
        data: { order: index + 1}
      }))
    )

    return NextResponse.json({
      success: true,
      message: "Cập nhật thành công",
    });
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