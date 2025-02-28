import prisma from "@/lib/db";
import { verifyToken } from "@/lib/token";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { currentPassword, newPassword } = await req.json();

    const authorization = req.headers.get('authorization');
    const token = authorization?.split(' ')[1];
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Phiên làm việc đã hết hạn, vui lòng đăng nhập lại."
      }, { status: 401 });
    }
    const userParse = await verifyToken(token)
    if (!userParse) {
      return NextResponse.json({
        success: false,
        message: "Phiên làm việc đã hết hạn, vui lòng đăng nhập lại."
      }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userParse.user_id)
      }
    })

    if(!user) {
      return NextResponse.json({
        success: false,
        message: "Tài khoản không tồn tại"
      }, { status: 400 });
    }

    const isCorrectPassword = await bcrypt.compare(currentPassword, user.password)
    if (!isCorrectPassword) {
      return NextResponse.json({
        success: false,
        message: "Mật khẩu hiện tại không chính xác"
      }, { status: 400 });
    }

    const hashNewPassword = await bcrypt.hash(newPassword, 12)

    await prisma.user.update({
      where: {
        id: Number(userParse.user_id)
      },
      data: {
        password: hashNewPassword
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