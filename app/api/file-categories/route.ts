import prisma from "@/lib/db";
import { verifyToken } from "@/lib/token";
import { generateSlug } from "@/utils/generateSlug";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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

    const fileCategories = await prisma.file_categories.findMany()
    return NextResponse.json({
      success: true,
      message: "Lấy danh mục tập tin thành công.",
      fileCategories,
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

export async function POST(req: NextRequest) {
  try {

    const { title, category } = await req.json();

    const slug = generateSlug(title)

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
        message: "Bạn không có quyền tạo danh mục"
      }, { status: 403 });
    }

    const exisFileCategory = await prisma.file_categories.findUnique({
      where: {
        slug
      }
    })
    if (exisFileCategory) {
      return NextResponse.json({
        success: false,
        message: "Danh mục đã tồn tại"
      }, { status: 400 });
    }

    await prisma.file_categories.create({
      data: {
        title,
        category,
        slug
      }
    })
    return NextResponse.json({
      success: true,
      message: "Tạo danh mục tập tin thành công.",
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