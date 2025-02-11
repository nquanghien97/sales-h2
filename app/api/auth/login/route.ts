import prisma from "@/lib/db";
import { createToken } from "@/lib/token";
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({
      success: false,
      message: "Vui lòng nhập đầy đủ số điện thoại hoặc mật khẩu"
    }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Thông tin đăng nhập không chính xác"
      }, { status: 400 });
    }

    const passwordValidated = await bcrypt.compare(password, user.password);
    if (!passwordValidated) {
      return NextResponse.json({
        success: false,
        message: "Tài khoản hoặc mật khẩu không chính xác"
      }, { status: 400 });
    }

    const accessToken = await createToken(user.id, user.role);

    const cookieStore = cookies();
    (await cookieStore).set('token', accessToken, {
      path: '/',
      expires: new Date(Date.now() + 3600 * 1000 * 7), // 7 days
    });

    return NextResponse.json({
      success: true,
      message: "Đăng nhập thành công",
      accessToken
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
