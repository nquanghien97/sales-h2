import prisma from "@/lib/db";
import { verifyToken } from "@/lib/token";
import { generateSlug } from "@/utils/generateSlug";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: number }> }) {
  try {
    const { id } = await params;
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

    const data = await prisma.file_categories.findUnique({
      where: {
        id: +id
      }
    })
    return NextResponse.json({
      success: true,
      data,
      message: "Lấy danh mục thành công",
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

export async function PUT(req: Request, { params }: { params: Promise<{ id: number }> }) {
  try {
    const { id } = await params;

    const { title, category } = await req.json();
    const newSlug = generateSlug(title)

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

    const currentFileCategory = await prisma.file_categories.findUnique({
      where: {
        id: +id
      }
    })

    if(!currentFileCategory) {
      return NextResponse.json({
        success: false,
        message: "Danh mục không tồn tại"
      });
    }

    await prisma.file_categories.update({
      where: {
        id: +id
      },
      data: {
        title,
        category,
        slug: newSlug,
      }
    })

    await prisma.files.updateMany({
      where: {
        fileCategorySlug: currentFileCategory.slug
      },
      data: {
        fileCategorySlug: newSlug,
      }
    })

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

export async function DELETE(req: Request, { params }: { params: Promise<{ id: number }> }) {
  try {
    const { id } = await params;
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

    await prisma.file_categories.delete({
      where: {
        id: +id
      }
    })
    return NextResponse.json({
      success: true,
      message: "Xóa thành công",
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