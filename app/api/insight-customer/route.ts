import prisma from "@/lib/db";
import { verifyToken } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { keyword, content } = await req.json()

    if (!keyword || !content) {
      return NextResponse.json(
        { success: false, message: "Thiếu dữ liệu bắt buộc." },
        { status: 400 }
      );
    }

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

    await prisma.insight_mother.create({
      data: {
        keyword,
        content,
        authorId: Number(user.user_id)
      }
    })

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
    keyword: {
      contains: search.toLowerCase(),
    },
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

    const data = await prisma.insight_mother.findMany({
      where: {
        ...whereCondition
      },
      include: {
        author: {
          select: {
            id: true,
            fullName: true
          }
        },
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      }
    })

    const total = await prisma.insight_mother.count({
      where: {
        ...whereCondition
      }
    })
    return NextResponse.json({
      success: true,
      data,
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