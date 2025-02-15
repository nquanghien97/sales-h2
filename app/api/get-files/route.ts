import prisma from "@/lib/db";
import { verifyToken } from "@/lib/token";
import { ImageCategory } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pageParam = url.searchParams.get('page');
  const pageSizeParam = url.searchParams.get('pageSize')
  const category = url.searchParams.get('category') as ImageCategory;

  const page = pageParam ? parseInt(pageParam, 10) : null;
  const pageSize = pageSizeParam ? parseInt(pageSizeParam, 10) : null;

  let skip: number | undefined;
  let take: number | undefined;

  if (page !== null && pageSize !== null) {
    skip = (page - 1) * pageSize;
    take = pageSize;
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

    const files = await prisma.files.findMany({
      where: {
        category
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
      },
    })
    const total = await prisma.files.count({
      where: {
        category
      }
    })
    return NextResponse.json({
      success: true,
      files,
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