import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { verifyToken } from "@/lib/token";

export async function POST(req: NextRequest) {
  const { username, fullName, password } = await req.json();
  if (!username || !fullName || !password) {
    return NextResponse.json({
      success: false,
      message: "Vui lòng nhập đầy đủ thông tin"
    }, { status: 400 });
  }

  try {
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
        message: "Bạn không có quyền tạo tài khoản"
      }, { status: 403 });
    }

    const user_exist = await prisma.user.findUnique({
      where: { username }
    });

    if (user_exist) {
      return NextResponse.json({
        success: false,
        message: "Tài khoản đã tồn tại"
      }, { status: 400 });
    }

    const hashPassword = await bcrypt.hash(password, 12)
    await prisma.user.create({
      data: {
        password: hashPassword,
        username,
        fullName,
      }
    })

    return NextResponse.json({
      success: true,
      message: "Tạo tài khoản thành công",
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

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pageParam = url.searchParams.get('page');
  const pageSizeParam = url.searchParams.get('pageSize')
  const search = url.searchParams.get('search') || '';

  const page = pageParam ? parseInt(pageParam, 10) : null;
  const pageSize = pageSizeParam ? parseInt(pageSizeParam, 10) : null;

  let skip: number | undefined;
  let take: number | undefined;

  if (page !== null && pageSize !== null) {
    skip = (page - 1) * pageSize;
    take = pageSize;
  }
  const whereCondition = {
    ...(search && {
      OR: [
        { username: { contains: search } },
        { fullName: { contains: search } },
      ],
    }),
  };

  try {
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

    const list_user = await prisma.user.findMany({
      where: {
        ...whereCondition,
        NOT: {
          role: 'ADMIN'
        }
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        createdAt: true,
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    })
    const total = await prisma.user.count({
      where: {
        ...whereCondition,
        NOT: {
          role: 'ADMIN'
        }
      }
    })
    return NextResponse.json({
      success: true,
      users: list_user,
      total
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
