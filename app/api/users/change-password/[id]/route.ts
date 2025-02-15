import prisma from "@/lib/db";
import { verifyToken } from "@/lib/token";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: number }> }) {
  try {
    const { id } = await params;
    const { password } = await req.json();
    if (!id) return NextResponse.json({
      success: false,
      message: "Missing id"
    }, { status: 403 });

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

    await prisma.user.update({
      where: {
        id: +id
      },
      data: {
        password
      }
    })
    return NextResponse.json({
      success: true,
      message: "Cập nhật thông tin thành công"
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